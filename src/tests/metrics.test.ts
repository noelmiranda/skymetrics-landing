import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { parse } from 'node-html-parser';
import { describe, it, expect, beforeAll } from 'vitest';
import Metrics from '../components/sections/Metrics.astro';

let html: string;

beforeAll(async () => {
  const container = await AstroContainer.create();
  html = await container.renderToString(Metrics);
});

describe('Metrics section', () => {
  it('renders with id="benefits"', () => {
    const root = parse(html);
    expect(root.querySelector('#benefits')).not.toBeNull();
  });

  it('renders 4 KPI cards', () => {
    const root = parse(html);
    const kpiLabels = root.querySelectorAll('#benefits .font-heading.font-semibold.text-slate.text-sm.mb-2');
    expect(kpiLabels).toHaveLength(4);
  });

  it('KPI values are all present', () => {
    expect(html).toContain('423');
    expect(html).toContain('100');
    expect(html).toContain('ΔT 15°C');
  });

  it('KPI labels describe the metrics', () => {
    expect(html).toContain('Automated tests');
    expect(html).toContain('Fault types detected');
    expect(html).toContain('Images per batch');
    expect(html).toContain('Critical alert threshold');
  });

  it('renders the Technology Stack section', () => {
    const root = parse(html);
    const heading = root.querySelector('h3');
    expect(heading?.text).toContain('Technology Stack');
  });

  it('tech stack contains 6 items', () => {
    const techItems = ['Claude Vision', 'PostGIS', 'Google Cloud Tasks', 'Svelte 5', 'Leaflet.js', 'PDFKit'];
    for (const item of techItems) {
      expect(html).toContain(item);
    }
  });

  it('renders the section headline', () => {
    expect(html).toContain('Production-ready.');
  });
});
