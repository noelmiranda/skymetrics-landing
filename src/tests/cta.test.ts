import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { parse } from 'node-html-parser';
import { describe, it, expect, beforeAll } from 'vitest';
import CallToAction from '../components/sections/CallToAction.astro';

let html: string;

beforeAll(async () => {
  const container = await AstroContainer.create();
  html = await container.renderToString(CallToAction);
});

describe('CallToAction section', () => {
  it('renders with id="contact"', () => {
    const root = parse(html);
    expect(root.querySelector('#contact')).not.toBeNull();
  });

  it('contact form exists', () => {
    const root = parse(html);
    expect(root.querySelector('form')).not.toBeNull();
  });

  it('form has first-name input with label', () => {
    const root = parse(html);
    const input = root.querySelector('#first-name');
    expect(input).not.toBeNull();
    expect(input?.getAttribute('type')).toBe('text');
    const label = root.querySelector('label[for="first-name"]');
    expect(label?.text).toContain('First name');
  });

  it('form has company input with label', () => {
    const root = parse(html);
    const input = root.querySelector('#company');
    expect(input).not.toBeNull();
    const label = root.querySelector('label[for="company"]');
    expect(label?.text).toContain('Company');
  });

  it('form has email input of type email with label', () => {
    const root = parse(html);
    const input = root.querySelector('#email');
    expect(input).not.toBeNull();
    expect(input?.getAttribute('type')).toBe('email');
    const label = root.querySelector('label[for="email"]');
    expect(label?.text).toContain('Work email');
  });

  it('form has capacity select with MW options', () => {
    const root = parse(html);
    const select = root.querySelector('#capacity');
    expect(select).not.toBeNull();
    const options = select?.querySelectorAll('option') ?? [];
    const optionTexts = options.map(o => o.text);
    expect(optionTexts.some(t => t.includes('MW'))).toBe(true);
  });

  it('capacity select has 4 range options plus placeholder', () => {
    const root = parse(html);
    const options = root.querySelectorAll('#capacity option');
    expect(options).toHaveLength(5);
  });

  it('form has message textarea with label', () => {
    const root = parse(html);
    const textarea = root.querySelector('#message');
    expect(textarea).not.toBeNull();
    const label = root.querySelector('label[for="message"]');
    expect(label?.text).toContain('Message');
  });

  it('submit button contains "Request"', () => {
    const root = parse(html);
    const btn = root.querySelector('button[type="submit"]');
    expect(btn?.text.trim()).toContain('Request');
  });

  it('renders benefit items', () => {
    expect(html).toContain('Diagnosis in 48h');
    expect(html).toContain('Tailored analysis');
    expect(html).toContain('Maintenance plan');
    expect(html).toContain('Ongoing follow-up');
  });
});
