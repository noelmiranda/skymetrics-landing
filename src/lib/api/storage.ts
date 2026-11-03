import { apiFetch, uploadToGcs } from './client.js';
import type { UploadCredential, BatchCredentialItem } from './types.js';

// --- Single-panel flow ---------------------------------------------------

export function getUploadCredential(
  inspectionId: string,
  panelId: string,
  mimeType: string,
): Promise<UploadCredential> {
  return apiFetch<UploadCredential>(
    `/v1/inspections/${inspectionId}/panels/${panelId}/upload-url?mimeType=${encodeURIComponent(mimeType)}`,
  );
}

export async function uploadAndAnalyze(
  inspectionId: string,
  panelId: string,
  file: File,
): Promise<{ status: string; inspectionId: string; panelId: string }> {
  const credential = await getUploadCredential(inspectionId, panelId, file.type);
  await uploadToGcs(credential.uploadUrl, file);
  return apiFetch(`/v1/inspections/${inspectionId}/panels/${panelId}/analyze-stored`, {
    method: 'POST',
    body: JSON.stringify({ storageKey: credential.storageKey }),
  });
}

// --- Batch flow ----------------------------------------------------------

export interface BatchUploadItem {
  panelId: string;
  file: File;
}

export interface BatchUploadResult {
  processed: number;
  failed: number;
  results: unknown[];
}

export async function batchUploadAndAnalyze(
  inspectionId: string,
  items: BatchUploadItem[],
  onProgress?: (done: number, total: number) => void,
): Promise<BatchUploadResult> {
  // 1. Request signed URLs for all panels at once.
  const credentials = await apiFetch<BatchCredentialItem[]>(
    `/v1/inspections/${inspectionId}/batch-upload-credentials`,
    {
      method: 'POST',
      body: JSON.stringify({
        items: items.map((i) => ({ panelId: i.panelId, mimeType: i.file.type })),
      }),
    },
  );

  // 2. Upload each file directly to GCS.
  for (let i = 0; i < credentials.length; i++) {
    const cred = credentials[i];
    const match = items.find((item) => item.panelId === cred.panelId);
    if (match) await uploadToGcs(cred.uploadUrl, match.file);
    onProgress?.(i + 1, credentials.length);
  }

  // 3. Trigger async analysis via Cloud Tasks.
  return apiFetch<BatchUploadResult>(`/v1/inspections/${inspectionId}/batch-analyze`, {
    method: 'POST',
    body: JSON.stringify({
      items: credentials.map((c) => ({
        filename: `${c.panelId}.jpg`,
        storageKey: c.storageKey,
      })),
    }),
  });
}
