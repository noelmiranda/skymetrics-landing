// DTOs that mirror the SkyMetrics Core backend responses exactly.

export type InspectionStatus = 'pending' | 'processing' | 'completed' | 'failed';
export type FaultType =
  | 'hotspot'
  | 'bypass_diode'
  | 'open_circuit'
  | 'soiling'
  | 'broken_diode'
  | 'dirt'
  | 'no_fault';
export type AnomalySeverity = 'low' | 'medium' | 'critical';
export type HealthStatus = 'optimal' | 'anomalous';
export type TemperatureSource = 'ai_estimated' | 'radiometric_sensor';

export interface GPSLocation {
  latitude: number;
  longitude: number;
}

export interface Inspection {
  id: string;
  organizationId: string;
  projectName: string;
  operatorId: string;
  status: InspectionStatus;
  createdAt: string;
}

export interface SolarPanel {
  id: string;
  inspectionId: string;
  identifierCode: string;
  location: GPSLocation;
  healthStatus: HealthStatus;
}

export interface ThermalAnomaly {
  id: string;
  panelId: string;
  faultType: FaultType;
  severity: AnomalySeverity;
  cellTemperature: number;
  ambientTemperature: number;
  temperatureDelta: number;
  aiDescription: string | null;
  temperatureSource: TemperatureSource;
  detectedAt: string;
  requiresImmediateAction: boolean;
}

export interface InspectionSummary {
  totalPanels: number;
  totalAnomalies: number;
  anomalousPanels: number;
  criticalAnomalies: number;
}

export interface InspectionResult {
  inspection: Inspection;
  panels: SolarPanel[];
  anomalies: ThermalAnomaly[];
  summary: InspectionSummary;
}

export interface InspectionStatusResult {
  id: string;
  status: InspectionStatus;
}

export interface UploadCredential {
  uploadUrl: string;
  method: 'PUT';
  storageKey: string;
  expiresAt: string;
}

export interface BatchCredentialItem {
  panelId: string;
  storageKey: string;
  uploadUrl: string;
  expiresAt: string;
}

export interface ApiError extends Error {
  status: number;
  detail?: string;
}
