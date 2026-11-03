<script lang="ts">
  import { getAuth, onAuthStateChanged } from 'firebase/auth';
  import { firebaseApp } from '../../lib/auth/firebase.js';
  import { createInspection } from '../../lib/api/inspections.js';

  let projectName = $state('');
  let operatorId = $state('');
  let loading = $state(false);
  let error = $state<string | null>(null);
  let authReady = $state(false);

  $effect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) { window.location.href = '/app/login'; return; }
      operatorId = user.email ?? user.uid;
      authReady = true;
    });
    return unsubscribe;
  });

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    loading = true;
    error = null;

    try {
      const inspection = await createInspection({ projectName, operatorId });
      window.location.href = `/app/inspections/${inspection.id}`;
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to create inspection.';
      loading = false;
    }
  }
</script>

{#if !authReady}
  <div class="text-slate/40 text-sm py-8 text-center">Loading…</div>
{:else}
  <form onsubmit={handleSubmit} class="bg-surface rounded-2xl border border-slate/10 p-6 space-y-4">
    {#if error}
      <div role="alert" class="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
        {error}
      </div>
    {/if}

    <div>
      <label for="projectName" class="block text-sm font-medium text-slate mb-1">
        Project name <span class="text-red-500" aria-hidden="true">*</span>
      </label>
      <input
        id="projectName"
        type="text"
        bind:value={projectName}
        required
        minlength={2}
        maxlength={120}
        placeholder="e.g. Solar Farm Alpha — Block 3"
        class="w-full px-3 py-2 border border-slate/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-mint"
      />
    </div>

    <div>
      <label for="operatorId" class="block text-sm font-medium text-slate mb-1">Operator</label>
      <input
        id="operatorId"
        type="text"
        bind:value={operatorId}
        required
        class="w-full px-3 py-2 border border-slate/20 rounded-lg text-sm bg-slate/5 focus:outline-none focus:ring-2 focus:ring-mint"
      />
    </div>

    <div class="pt-2 flex gap-3">
      <button
        type="submit"
        disabled={loading || !projectName}
        class="flex-1 bg-solar text-white font-semibold py-2.5 rounded-lg text-sm hover:bg-solar/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Creating…' : 'Create inspection'}
      </button>
      <a
        href="/app/inspections"
        class="px-4 py-2.5 text-sm text-slate/60 hover:text-slate border border-slate/20 rounded-lg transition-colors"
      >
        Cancel
      </a>
    </div>
  </form>
{/if}
