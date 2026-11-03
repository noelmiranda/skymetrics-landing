<script lang="ts">
  import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
  import { firebaseApp } from '../../lib/auth/firebase.js';

  let email = $state('');
  let password = $state('');
  let loading = $state(false);
  let error = $state<string | null>(null);

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    loading = true;
    error = null;

    try {
      const auth = getAuth(firebaseApp);
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = '/app';
    } catch (err) {
      error = err instanceof Error ? err.message : 'Sign-in failed. Please try again.';
    } finally {
      loading = false;
    }
  }
</script>

<div class="min-h-screen bg-background flex items-center justify-center p-4">
  <div class="w-full max-w-sm">
    <div class="text-center mb-8">
      <svg class="mx-auto mb-4" width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#8CBDB9"/>
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#E09E50" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <h1 class="font-heading font-bold text-2xl text-slate">Sign in to SkyMetrics</h1>
      <p class="text-slate/60 text-sm mt-1">Thermal analytics platform</p>
    </div>

    <form onsubmit={handleSubmit} class="bg-surface rounded-2xl p-6 shadow-sm border border-slate/10 space-y-4">
      {#if error}
        <div role="alert" class="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      {/if}

      <div>
        <label for="email" class="block text-sm font-medium text-slate mb-1">Work email</label>
        <input
          id="email"
          type="email"
          bind:value={email}
          required
          autocomplete="email"
          class="w-full px-3 py-2 border border-slate/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-mint focus:border-transparent"
          placeholder="you@company.com"
        />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-slate mb-1">Password</label>
        <input
          id="password"
          type="password"
          bind:value={password}
          required
          autocomplete="current-password"
          class="w-full px-3 py-2 border border-slate/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-mint focus:border-transparent"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        class="w-full bg-solar text-white font-semibold py-2.5 rounded-lg text-sm hover:bg-solar/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  </div>
</div>
