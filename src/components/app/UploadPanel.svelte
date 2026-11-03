<script lang="ts">
  import { uploadAndAnalyze } from '../../lib/api/storage.js';

  interface Props {
    inspectionId: string;
    panelId: string;
    onComplete?: () => void;
  }

  let { inspectionId, panelId, onComplete }: Props = $props();

  let file = $state<File | null>(null);
  let status = $state<'idle' | 'uploading' | 'analyzing' | 'done' | 'error'>('idle');
  let errorMessage = $state<string | null>(null);
  let inputEl = $state<HTMLInputElement | null>(null);

  function onFileChange(e: Event) {
    const input = e.currentTarget as HTMLInputElement;
    file = input.files?.[0] ?? null;
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (!file) return;

    status = 'uploading';
    errorMessage = null;

    try {
      status = 'analyzing';
      await uploadAndAnalyze(inspectionId, panelId, file);
      status = 'done';
      onComplete?.();
    } catch (err) {
      status = 'error';
      errorMessage = err instanceof Error ? err.message : 'Upload failed. Please try again.';
    }
  }

  function reset() {
    file = null;
    status = 'idle';
    errorMessage = null;
    if (inputEl) inputEl.value = '';
  }

  const ACCEPTED = 'image/jpeg,image/png,image/webp';
</script>

<div class="bg-surface rounded-xl border border-slate/10 p-5">
  <h3 class="font-heading font-semibold text-slate text-sm mb-4">Upload thermal image</h3>

  {#if status === 'done'}
    <div class="text-center py-6">
      <div class="w-10 h-10 rounded-full bg-mint/20 flex items-center justify-center mx-auto mb-3">
        <svg class="w-5 h-5 text-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
      </div>
      <p class="text-sm font-medium text-slate">Analysis complete</p>
      <button onclick={reset} class="mt-3 text-xs text-slate/50 hover:text-slate underline">Upload another</button>
    </div>

  {:else}
    <form onsubmit={handleSubmit} class="space-y-4">
      {#if errorMessage}
        <div role="alert" class="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {errorMessage}
        </div>
      {/if}

      <!-- Drop zone -->
      <label
        class="block border-2 border-dashed border-slate/20 rounded-xl p-6 text-center cursor-pointer hover:border-mint/50 transition-colors"
        aria-label="Select thermal image file"
      >
        <input
          bind:this={inputEl}
          type="file"
          accept={ACCEPTED}
          onchange={onFileChange}
          class="sr-only"
        />
        {#if file}
          <p class="text-sm font-medium text-slate">{file.name}</p>
          <p class="text-xs text-slate/50 mt-1">{(file.size / 1024).toFixed(1)} KB</p>
        {:else}
          <svg class="w-8 h-8 text-slate/30 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
          </svg>
          <p class="text-sm text-slate/50">Click to select a JPEG, PNG, or WebP thermal image</p>
        {/if}
      </label>

      <button
        type="submit"
        disabled={!file || status !== 'idle'}
        class="w-full bg-solar text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-solar/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {#if status === 'uploading'}
          <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
          </svg>
          Uploading to GCS…
        {:else if status === 'analyzing'}
          <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
          </svg>
          Analyzing with AI…
        {:else}
          Analyze image
        {/if}
      </button>
    </form>
  {/if}
</div>
