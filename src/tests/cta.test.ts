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

describe('CallToAction form validation structure', () => {
  it('required fields have aria-required="true"', () => {
    const root = parse(html);
    expect(root.querySelector('#first-name')?.getAttribute('aria-required')).toBe('true');
    expect(root.querySelector('#email')?.getAttribute('aria-required')).toBe('true');
    expect(root.querySelector('#capacity')?.getAttribute('aria-required')).toBe('true');
  });

  it('optional fields do not have aria-required', () => {
    const root = parse(html);
    expect(root.querySelector('#company')?.getAttribute('aria-required')).toBeUndefined();
    expect(root.querySelector('#message')?.getAttribute('aria-required')).toBeUndefined();
  });

  it('all fields start with aria-invalid="false"', () => {
    const root = parse(html);
    const ids = ['first-name', 'email', 'capacity', 'company', 'message'];
    for (const id of ids) {
      expect(root.querySelector(`#${id}`)?.getAttribute('aria-invalid'), `#${id} should start as valid`).toBe('false');
    }
  });

  it('each field has aria-describedby pointing to its error element', () => {
    const root = parse(html);
    const pairs = [
      ['first-name', 'error-name'],
      ['email',      'error-email'],
      ['capacity',   'error-capacity'],
      ['company',    'error-company'],
      ['message',    'error-message'],
    ] as const;
    for (const [inputId, errorId] of pairs) {
      expect(root.querySelector(`#${inputId}`)?.getAttribute('aria-describedby'), `#${inputId} missing aria-describedby`).toBe(errorId);
      expect(root.querySelector(`#${errorId}`), `#${errorId} element missing`).not.toBeNull();
    }
  });

  it('all error elements are hidden initially', () => {
    const root = parse(html);
    const errorIds = ['error-name', 'error-email', 'error-capacity', 'error-company', 'error-message'];
    for (const id of errorIds) {
      const el = root.querySelector(`#${id}`);
      expect(el?.getAttribute('class'), `#${id} should be hidden`).toContain('hidden');
    }
  });

  it('error elements have role="alert"', () => {
    const root = parse(html);
    const errorIds = ['error-name', 'error-email', 'error-capacity', 'error-company', 'error-message'];
    for (const id of errorIds) {
      expect(root.querySelector(`#${id}`)?.getAttribute('role'), `#${id} missing role=alert`).toBe('alert');
    }
  });

  it('required fields are visually marked with *', () => {
    const root = parse(html);
    const requiredLabels = [
      root.querySelector('label[for="first-name"]'),
      root.querySelector('label[for="email"]'),
      root.querySelector('label[for="capacity"]'),
    ];
    for (const label of requiredLabels) {
      expect(label?.text, 'required label should contain *').toContain('*');
    }
  });

  it('optional fields are not marked with *', () => {
    const root = parse(html);
    const companyLabel = root.querySelector('label[for="company"]');
    const messageLabel = root.querySelector('label[for="message"]');
    expect(companyLabel?.text).not.toContain('*');
    expect(messageLabel?.text).not.toContain('*');
  });
});
