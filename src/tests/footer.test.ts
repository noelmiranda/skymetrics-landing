import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { parse } from 'node-html-parser';
import { describe, it, expect, beforeAll } from 'vitest';
import Footer from '../components/sections/Footer.astro';

let html: string;

beforeAll(async () => {
  const container = await AstroContainer.create();
  html = await container.renderToString(Footer);
});

describe('Footer', () => {
  it('renders a <footer> element', () => {
    const root = parse(html);
    expect(root.querySelector('footer')).not.toBeNull();
  });

  it('shows the SkyMetrics brand name', () => {
    expect(html).toContain('SkyMetrics');
  });

  it('has 3 social links with aria-labels', () => {
    const root = parse(html);
    const social = ['LinkedIn', 'Twitter', 'GitHub'];
    for (const label of social) {
      const link = root.querySelector(`a[aria-label="${label}"]`);
      expect(link, `missing social link: ${label}`).not.toBeNull();
    }
  });

  it('has a mailto link with the contact email', () => {
    const root = parse(html);
    const emailLink = root.querySelector('a[href="mailto:skymetric.cloud@gmail.com"]');
    expect(emailLink).not.toBeNull();
  });

  it('Platform section lists 6 feature links', () => {
    const platformItems = ['AI fault detection', 'GPS anomaly map', 'PDF reports', 'Batch upload', 'Webhook alerts', 'REST API'];
    for (const item of platformItems) {
      expect(html).toContain(item);
    }
  });

  it('Company section lists 5 links', () => {
    const companyItems = ['About us', 'API documentation', 'Blog', 'Careers', 'Press'];
    for (const item of companyItems) {
      expect(html).toContain(item);
    }
  });

  it('has 3 legal footer links', () => {
    const legalItems = ['Privacy policy', 'Terms of service', 'Cookies'];
    for (const item of legalItems) {
      expect(html).toContain(item);
    }
  });

  it('copyright line contains "SkyMetrics" and "All rights reserved"', () => {
    expect(html).toContain('SkyMetrics');
    expect(html).toContain('All rights reserved');
  });

  it('has a "Request Demo" CTA linking to #contact', () => {
    const root = parse(html);
    const cta = root.querySelector('a[href="#contact"]');
    expect(cta).not.toBeNull();
    expect(cta?.text.trim()).toContain('Request Demo');
  });

  it('location mentions Warsaw', () => {
    expect(html).toContain('Warsaw');
  });
});
