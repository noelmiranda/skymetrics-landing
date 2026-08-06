import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { parse } from 'node-html-parser';
import { describe, it, expect, beforeAll } from 'vitest';
import HowItWorks from '../components/sections/HowItWorks.astro';

let html: string;

beforeAll(async () => {
  const container = await AstroContainer.create();
  html = await container.renderToString(HowItWorks);
});

describe('HowItWorks section', () => {
  it('renders with id="how-it-works"', () => {
    const root = parse(html);
    expect(root.querySelector('#how-it-works')).not.toBeNull();
  });

  it('renders exactly 3 step cards', () => {
    const root = parse(html);
    const stepCards = root.querySelectorAll('#how-it-works h3');
    expect(stepCards).toHaveLength(3);
  });

  it('includes all 3 step titles', () => {
    expect(html).toContain('Upload Thermal Images');
    expect(html).toContain('Claude AI Classifies Faults');
    expect(html).toContain('Map, Report &amp; Alerts');
  });

  it('includes step subtitles', () => {
    expect(html).toContain('Batch upload');
    expect(html).toContain('Async processing via Google Cloud Tasks');
    expect(html).toContain('GPS map + PDF report + webhook alerts');
  });

  it('step numbers 1, 2, 3 are visible', () => {
    const root = parse(html);
    const nums = root.querySelectorAll('#how-it-works .font-heading.font-bold.text-xs');
    const texts = nums.map(n => n.text.trim());
    expect(texts).toContain('1');
    expect(texts).toContain('2');
    expect(texts).toContain('3');
  });

  it('renders the tech stack callout', () => {
    expect(html).toContain('Built on proven infrastructure');
    expect(html).toContain('Node.js');
    expect(html).toContain('TypeScript');
    expect(html).toContain('Anthropic Claude Vision');
  });

  it('tech stack callout links to #contact', () => {
    const root = parse(html);
    const links = root.querySelectorAll('a[href="#contact"]');
    expect(links.length).toBeGreaterThanOrEqual(1);
  });
});
