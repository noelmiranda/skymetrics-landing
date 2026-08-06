import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { parse } from 'node-html-parser';
import { describe, it, expect, beforeAll } from 'vitest';
import Header from '../components/sections/Header.astro';

let html: string;

beforeAll(async () => {
  const container = await AstroContainer.create();
  html = await container.renderToString(Header);
});

describe('Header', () => {
  it('renders the SkyMetrics logo text', () => {
    expect(html).toContain('SkyMetrics');
  });

  it('has exactly 3 desktop navigation links', () => {
    const root = parse(html);
    const nav = root.querySelector('nav[aria-label="Main navigation"]');
    expect(nav).not.toBeNull();
    const links = nav!.querySelectorAll('a');
    expect(links).toHaveLength(3);
  });

  it('navigation links point to correct section anchors', () => {
    const root = parse(html);
    const nav = root.querySelector('nav[aria-label="Main navigation"]');
    const hrefs = nav!.querySelectorAll('a').map(a => a.getAttribute('href'));
    expect(hrefs).toContain('#features');
    expect(hrefs).toContain('#how-it-works');
    expect(hrefs).toContain('#benefits');
  });

  it('desktop CTA button links to #contact', () => {
    const root = parse(html);
    const ctaLinks = root.querySelectorAll('a[href="#contact"]');
    expect(ctaLinks.length).toBeGreaterThanOrEqual(1);
  });

  it('desktop CTA reads "Request a Demo"', () => {
    const root = parse(html);
    const cta = root.querySelector('a[href="#contact"]');
    expect(cta?.text.trim()).toContain('Request a Demo');
  });

  it('mobile menu button has aria-label', () => {
    const root = parse(html);
    const btn = root.querySelector('#mobile-menu-btn');
    expect(btn?.getAttribute('aria-label')).toBe('Open menu');
  });

  it('mobile menu has role navigation', () => {
    const root = parse(html);
    const mobileMenu = root.querySelector('#mobile-menu');
    expect(mobileMenu?.getAttribute('role')).toBe('navigation');
  });

  it('mobile menu button starts with aria-expanded="false"', () => {
    const root = parse(html);
    const btn = root.querySelector('#mobile-menu-btn');
    expect(btn?.getAttribute('aria-expanded')).toBe('false');
  });
});
