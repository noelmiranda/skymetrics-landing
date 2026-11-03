import { apiFetch } from './client.js';
import type {
  Inspection,
  InspectionResult,
  InspectionStatusResult,
} from './types.js';

export interface ListInspectionsParams {
  limit?: number;
  offset?: number;
}

export function listInspections(params: ListInspectionsParams = {}): Promise<Inspection[]> {
  const qs = new URLSearchParams();
  if (params.limit !== undefined) qs.set('limit', String(params.limit));
  if (params.offset !== undefined) qs.set('offset', String(params.offset));
  const query = qs.toString() ? `?${qs}` : '';
  return apiFetch<Inspection[]>(`/v1/inspections${query}`);
}

export function getInspection(id: string): Promise<InspectionResult> {
  return apiFetch<InspectionResult>(`/v1/inspections/${id}`);
}

export function getInspectionStatus(id: string): Promise<InspectionStatusResult> {
  return apiFetch<InspectionStatusResult>(`/v1/inspections/${id}/status`);
}

export function createInspection(data: {
  projectName: string;
  operatorId: string;
}): Promise<Inspection> {
  return apiFetch<Inspection>('/v1/inspections', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
