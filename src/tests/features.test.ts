import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { parse } from 'node-html-parser';
import { describe, it, expect, beforeAll } from 'vitest';
import Features from '../components/sections/Features.astro';

let html: string;

beforeAll(async () => {
  const container = await AstroContainer.create();
  html = await container.renderToString(Features);
});

describe('Features section', () => {
  it('renders with id="features"', () => {
    const root = parse(html);
    expect(root.querySelector('#features')).not.toBeNull();
  });

  it('renders exactly 6 feature cards', () => {
    const root = parse(html);
    const cards = root.querySelectorAll('#features h3');
    expect(cards).toHaveLength(6);
  });

  it('includes all expected feature titles', () => {
    const titles = ['Automated Fault Detection', 'GPS-Georeferenced Anomaly Map', 'Instant Inspection Reports', 'Upload 100 Images or a ZIP', 'Critical Fault Notifications', 'Fully Documented API'];
    for (const title of titles) {
      expect(html).toContain(title);
    }
  });

  it('includes all expected feature tags', () => {
    const tags = ['Claude Vision AI', 'PostGIS + Leaflet', 'PDF Reports', 'Batch Upload', 'Real-Time Alerts', 'REST API'];
    for (const tag of tags) {
      expect(html).toContain(tag);
    }
  });

  it('renders section heading', () => {
    expect(html).toContain('Everything built.');
  });

  it('mentions the test count', () => {
    expect(html).toContain('423');
  });
});
