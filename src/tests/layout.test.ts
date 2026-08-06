import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { parse } from 'node-html-parser';
import { describe, it, expect, beforeAll } from 'vitest';
import BaseLayout from '../layouts/BaseLayout.astro';

let htmlDefault: string;
let htmlCustom: string;

beforeAll(async () => {
  const container = await AstroContainer.create();

  htmlDefault = await container.renderToString(BaseLayout, {
    request: new Request('http://localhost:3000/'),
  });

  htmlCustom = await container.renderToString(BaseLayout, {
    request: new Request('http://localhost:3000/'),
    props: {
      title: 'Custom Page Title',
      description: 'Custom page description for testing.',
    },
  });
});

describe('BaseLayout', () => {
  it('renders an HTML document with lang="en"', () => {
    const root = parse(htmlDefault);
    const htmlEl = root.querySelector('html');
    expect(htmlEl?.getAttribute('lang')).toBe('en');
  });

  it('renders default <title> containing SkyMetrics', () => {
    const root = parse(htmlDefault);
    const title = root.querySelector('title');
    expect(title?.text).toContain('SkyMetrics');
  });

  it('renders custom <title> when prop is provided', () => {
    const root = parse(htmlCustom);
    expect(root.querySelector('title')?.text).toBe('Custom Page Title');
  });

  it('renders default <meta name="description">', () => {
    const root = parse(htmlDefault);
    const desc = root.querySelector('meta[name="description"]');
    expect(desc?.getAttribute('content')).toBeTruthy();
  });

  it('renders custom description meta when prop is provided', () => {
    const root = parse(htmlCustom);
    const desc = root.querySelector('meta[name="description"]');
    expect(desc?.getAttribute('content')).toBe('Custom page description for testing.');
  });

  it('has Open Graph meta tags', () => {
    const root = parse(htmlDefault);
    const ogType = root.querySelector('meta[property="og:type"]');
    const ogTitle = root.querySelector('meta[property="og:title"]');
    const ogDesc = root.querySelector('meta[property="og:description"]');
    const ogImage = root.querySelector('meta[property="og:image"]');
    expect(ogType?.getAttribute('content')).toBe('website');
    expect(ogTitle).not.toBeNull();
    expect(ogDesc).not.toBeNull();
    expect(ogImage).not.toBeNull();
  });

  it('has Twitter Card meta tags', () => {
    const root = parse(htmlDefault);
    const card = root.querySelector('meta[name="twitter:card"]');
    const title = root.querySelector('meta[name="twitter:title"]');
    const desc = root.querySelector('meta[name="twitter:description"]');
    const image = root.querySelector('meta[name="twitter:image"]');
    expect(card?.getAttribute('content')).toBe('summary_large_image');
    expect(title).not.toBeNull();
    expect(desc).not.toBeNull();
    expect(image).not.toBeNull();
  });

  it('has a <link rel="canonical"> tag', () => {
    const root = parse(htmlDefault);
    const canonical = root.querySelector('link[rel="canonical"]');
    expect(canonical).not.toBeNull();
    expect(canonical?.getAttribute('href')).toBeTruthy();
  });

  it('has a favicon link', () => {
    const root = parse(htmlDefault);
    const favicon = root.querySelector('link[rel="icon"]');
    expect(favicon?.getAttribute('href')).toBe('/favicon.svg');
  });

  it('sets charset to utf-8', () => {
    const root = parse(htmlDefault);
    const charset = root.querySelector('meta[charset]');
    expect(charset?.getAttribute('charset')?.toLowerCase()).toBe('utf-8');
  });

  it('has viewport meta tag', () => {
    const root = parse(htmlDefault);
    const viewport = root.querySelector('meta[name="viewport"]');
    expect(viewport?.getAttribute('content')).toContain('width=device-width');
  });
});
