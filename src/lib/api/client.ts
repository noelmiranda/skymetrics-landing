import { getAuth, getIdToken } from 'firebase/auth';
import { firebaseApp } from '../auth/firebase.js';

const BASE_URL = import.meta.env.PUBLIC_API_URL as string;

async function authHeader(): Promise<Record<string, string>> {
  const auth = getAuth(firebaseApp);
  const user = auth.currentUser;
  if (!user) return {};
  const token = await getIdToken(user);
  return { Authorization: `Bearer ${token}` };
}

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers({
    'Content-Type': 'application/json',
    ...(await authHeader()),
    ...(init.headers as Record<string, string> | undefined),
  });

  const res = await fetch(`${BASE_URL}${path}`, { ...init, headers });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }));
    const err = new Error(body.error ?? res.statusText) as Error & {
      status: number;
      detail?: string;
    };
    err.status = res.status;
    err.detail = body.detail;
    throw err;
  }

  return res.json() as Promise<T>;
}

// Uploads a file directly to GCS using a signed PUT URL — no auth header needed.
export async function uploadToGcs(uploadUrl: string, file: File): Promise<void> {
  const res = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  });
  if (!res.ok) throw new Error(`GCS upload failed: ${res.status} ${res.statusText}`);
}
