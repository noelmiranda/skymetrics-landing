<script lang="ts">
  import { getAuth, onAuthStateChanged } from 'firebase/auth';
  import { firebaseApp } from '../../lib/auth/firebase.js';
  import { getInspection } from '../../lib/api/inspections.js';
  import type { InspectionResult } from '../../lib/api/types.js';
  import AnomalyMap from './AnomalyMap.svelte';
  import UploadPanel from './UploadPanel.svelte';

  interface Props { inspectionId: string; }
  let { inspectionId }: Props = $props();

  let result = $state<InspectionResult | null>(null);
  let loading = $state(true);
  let error = $state<string | null>(null);
  let activeTab = $state<'map' | 'anomalies' | 'upload'>('map');

  async function load() {
    loading = true;
    error = null;
    try {
      result = await getInspection(inspectionId);
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to load inspection.';
    } finally {
      loading = false;
    }
  }

  $effect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) { window.location.href = '/app/login'; return; }
      load();
    });
    return unsubscribe;
  });

  const STATUS_COLORS: Record<string, string> = {
    pending:    'bg-slate/10 text-slate',
    processing: 'bg-solar/15 text-solar',
    completed:  'bg-mint/20 text-mint',
    failed:     'bg-red-100 text-red-600',
  };

  const SEVERITY_COLORS: Record<string, string> = {
    low:      'bg-mint/20 text-mint',
    medium:   'bg-solar/15 text-solar',
    critical: 'bg-red-100 text-red-700',
  };
</script>

{#if loading}
  <div class="flex items-center justify-center py-32 text-slate/40">
    <svg class="animate-spin w-6 h-6" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
    </svg>
    <span class="ml-3 text-sm">Loading inspection…</span>
  </div>

{:else if error}
  <div role="alert" class="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">{error}</div>

{:else if result}
  <!-- Header -->
  <div class="flex items-start justify-between mb-6">
    <div>
      <h2 class="font-heading font-bold text-2xl text-slate">{result.inspection.projectName}</h2>
      <p class="text-slate/50 text-sm mt-1">
        {new Date(result.inspection.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        &nbsp;·&nbsp; Operator: {result.inspection.operatorId}
      </p>
    </div>
    <span class={`text-xs font-medium px-3 py-1.5 rounded-full ${STATUS_COLORS[result.inspection.status] ?? ''}`}>
      {result.inspection.status}
    </span>
  </div>

  <!-- KPI row -->
  <div class="grid grid-cols-4 gap-4 mb-6">
    {#each [
      { label: 'Panels', value: result.summary.totalPanels },
      { label: 'Anomalies', value: result.summary.totalAnomalies },
      { label: 'Anomalous', value: result.summary.anomalousPanels },
      { label: 'Critical', value: result.summary.criticalAnomalies },
    ] as kpi}
      <div class="bg-surface rounded-xl border border-slate/10 px-4 py-3 text-center">
        <p class="font-heading font-bold text-2xl text-slate">{kpi.value}</p>
        <p class="text-xs text-slate/50 mt-0.5">{kpi.label}</p>
      </div>
    {/each}
  </div>

  <!-- Tab bar -->
  <div class="flex gap-1 mb-4 bg-slate/5 p-1 rounded-xl w-fit">
    {#each (['map', 'anomalies', 'upload'] as const) as tab}
      <button
        onclick={() => activeTab = tab}
        class={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${
          activeTab === tab ? 'bg-surface text-slate shadow-sm' : 'text-slate/50 hover:text-slate'
        }`}
      >
        {tab}
      </button>
    {/each}
  </div>

  <!-- Tab content -->
  {#if activeTab === 'map'}
    <div class="h-96 bg-surface rounded-xl border border-slate/10 overflow-hidden">
      {#if result.panels.length > 0}
        <AnomalyMap panels={result.panels} anomalies={result.anomalies} />
      {:else}
        <div class="flex items-center justify-center h-full text-slate/40 text-sm">
          No panel GPS data available for this inspection.
        </div>
      {/if}
    </div>

  {:else if activeTab === 'anomalies'}
    {#if result.anomalies.length === 0}
      <p class="text-slate/50 text-sm py-8 text-center">No anomalies detected yet.</p>
    {:else}
      <div class="space-y-2">
        {#each result.anomalies as anomaly (anomaly.id)}
          <div class="bg-surface rounded-xl border border-slate/10 px-5 py-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-slate">{anomaly.faultType.replace(/_/g, ' ')}</p>
                <p class="text-xs text-slate/50 mt-0.5">
                  ΔT {anomaly.temperatureDelta.toFixed(1)} °C &nbsp;·&nbsp;
                  Cell {anomaly.cellTemperature.toFixed(1)} °C &nbsp;·&nbsp;
                  {new Date(anomaly.detectedAt).toLocaleDateString('en-GB')}
                </p>
                {#if anomaly.aiDescription}
                  <p class="text-xs text-slate/60 mt-1 italic">"{anomaly.aiDescription}"</p>
                {/if}
              </div>
              <span class={`text-xs font-medium px-2.5 py-1 rounded-full ${SEVERITY_COLORS[anomaly.severity] ?? ''}`}>
                {anomaly.severity}
              </span>
            </div>
          </div>
        {/each}
      </div>
    {/if}

  {:else if activeTab === 'upload'}
    {#if result.panels.length > 0}
      <div class="grid grid-cols-2 gap-4">
        {#each result.panels as panel (panel.id)}
          <UploadPanel
            inspectionId={inspectionId}
            panelId={panel.id}
            onComplete={load}
          />
        {/each}
      </div>
    {:else}
      <p class="text-slate/50 text-sm py-8 text-center">
        No panels registered yet. Import a digital twin first.
      </p>
    {/if}
  {/if}
{/if}
