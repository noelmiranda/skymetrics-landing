<script lang="ts">
  import { getAuth, onAuthStateChanged } from 'firebase/auth';
  import { firebaseApp } from '../../lib/auth/firebase.js';
  import { listInspections } from '../../lib/api/inspections.js';
  import type { Inspection } from '../../lib/api/types.js';

  let inspections = $state<Inspection[]>([]);
  let loading = $state(true);
  let error = $state<string | null>(null);

  const STATUS_COLORS: Record<Inspection['status'], string> = {
    pending:    'bg-slate/10 text-slate',
    processing: 'bg-solar/15 text-solar',
    completed:  'bg-mint/20 text-mint',
    failed:     'bg-red-100 text-red-600',
  };

  $effect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) { window.location.href = '/app/login'; return; }
      try {
        inspections = await listInspections({ limit: 50 });
      } catch (err) {
        error = err instanceof Error ? err.message : 'Failed to load inspections.';
      } finally {
        loading = false;
      }
    });
    return unsubscribe;
  });
</script>

{#if loading}
  <div class="flex items-center justify-center py-24 text-slate/40">
    <svg class="animate-spin w-6 h-6" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
    </svg>
    <span class="ml-3 text-sm">Loading inspections…</span>
  </div>

{:else if error}
  <div role="alert" class="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">{error}</div>

{:else if inspections.length === 0}
  <div class="text-center py-24">
    <p class="text-slate/50 text-sm">No inspections yet.</p>
    <a href="/app/inspections/new" class="mt-4 inline-block bg-solar text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-solar/90 transition-colors">
      Create your first inspection
    </a>
  </div>

{:else}
  <div class="space-y-3">
    {#each inspections as inspection (inspection.id)}
      <a
        href={`/app/inspections/${inspection.id}`}
        class="block bg-surface rounded-xl border border-slate/10 px-5 py-4 hover:border-mint/50 hover:shadow-sm transition-all group"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="font-heading font-semibold text-slate group-hover:text-mint transition-colors">
              {inspection.projectName}
            </p>
            <p class="text-xs text-slate/50 mt-0.5">
              {new Date(inspection.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              &nbsp;·&nbsp;
              {inspection.operatorId}
            </p>
          </div>
          <span class={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_COLORS[inspection.status]}`}>
            {inspection.status}
          </span>
        </div>
      </a>
    {/each}
  </div>
{/if}
