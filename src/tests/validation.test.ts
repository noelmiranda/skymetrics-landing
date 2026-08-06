import { describe, it, expect } from 'vitest';
import {
  validateName,
  validateEmail,
  validateCapacity,
  validateCompany,
  validateMessage,
} from '../utils/validate';

// ─── validateName ────────────────────────────────────────────────────────────

describe('validateName', () => {
  it('rejects empty string', () => {
    const r = validateName('');
    expect(r.valid).toBe(false);
    expect(r.message).toBe('First name is required.');
  });

  it('rejects whitespace-only input', () => {
    expect(validateName('   ').valid).toBe(false);
  });

  it('rejects single character', () => {
    const r = validateName('A');
    expect(r.valid).toBe(false);
    expect(r.message).toContain('2 characters');
  });

  it('accepts 2-character name', () => {
    expect(validateName('Jo').valid).toBe(true);
  });

  it('accepts normal full name', () => {
    expect(validateName('John Doe').valid).toBe(true);
  });

  it('accepts name at 50-character limit', () => {
    expect(validateName('A'.repeat(50)).valid).toBe(true);
  });

  it('rejects name over 50 characters', () => {
    const r = validateName('A'.repeat(51));
    expect(r.valid).toBe(false);
    expect(r.message).toContain('50 characters');
  });

  it('trims surrounding whitespace before validating', () => {
    expect(validateName('  Jo  ').valid).toBe(true);
  });
});

// ─── validateEmail ───────────────────────────────────────────────────────────

describe('validateEmail', () => {
  it('rejects empty string', () => {
    const r = validateEmail('');
    expect(r.valid).toBe(false);
    expect(r.message).toBe('Work email is required.');
  });

  it('rejects string with no @', () => {
    expect(validateEmail('notanemail').valid).toBe(false);
  });

  it('rejects @ with no domain', () => {
    expect(validateEmail('test@').valid).toBe(false);
  });

  it('rejects domain with no TLD', () => {
    expect(validateEmail('test@domain').valid).toBe(false);
  });

  it('rejects TLD shorter than 2 characters', () => {
    expect(validateEmail('test@domain.c').valid).toBe(false);
  });

  it('accepts standard email', () => {
    expect(validateEmail('test@domain.com').valid).toBe(true);
  });

  it('accepts email with subdomain', () => {
    expect(validateEmail('user@mail.domain.com').valid).toBe(true);
  });

  it('accepts email with + tag', () => {
    expect(validateEmail('user+tag@domain.co.uk').valid).toBe(true);
  });

  it('trims surrounding whitespace before validating', () => {
    expect(validateEmail('  test@domain.com  ').valid).toBe(true);
  });

  it('returns descriptive message for invalid format', () => {
    const r = validateEmail('bad-email');
    expect(r.message).toContain('valid email');
  });
});

// ─── validateCapacity ────────────────────────────────────────────────────────

describe('validateCapacity', () => {
  it('rejects empty string (placeholder not selected)', () => {
    const r = validateCapacity('');
    expect(r.valid).toBe(false);
    expect(r.message).toContain('select');
  });

  it('accepts "1 – 10 MW"', () => {
    expect(validateCapacity('1 – 10 MW').valid).toBe(true);
  });

  it('accepts "10 – 50 MW"', () => {
    expect(validateCapacity('10 – 50 MW').valid).toBe(true);
  });

  it('accepts "50 – 200 MW"', () => {
    expect(validateCapacity('50 – 200 MW').valid).toBe(true);
  });

  it('accepts "200 MW+"', () => {
    expect(validateCapacity('200 MW+').valid).toBe(true);
  });
});

// ─── validateCompany ─────────────────────────────────────────────────────────

describe('validateCompany', () => {
  it('accepts empty string (field is optional)', () => {
    expect(validateCompany('').valid).toBe(true);
  });

  it('accepts a normal company name', () => {
    expect(validateCompany('Acme Solar S.A.').valid).toBe(true);
  });

  it('accepts company name at 100-character limit', () => {
    expect(validateCompany('A'.repeat(100)).valid).toBe(true);
  });

  it('rejects company name over 100 characters', () => {
    const r = validateCompany('A'.repeat(101));
    expect(r.valid).toBe(false);
    expect(r.message).toContain('100 characters');
  });
});

// ─── validateMessage ─────────────────────────────────────────────────────────

describe('validateMessage', () => {
  it('accepts empty string (field is optional)', () => {
    expect(validateMessage('').valid).toBe(true);
  });

  it('accepts a normal message', () => {
    expect(validateMessage('We have a 50 MW farm in southern Spain.').valid).toBe(true);
  });

  it('accepts message at 500-character limit', () => {
    expect(validateMessage('A'.repeat(500)).valid).toBe(true);
  });

  it('rejects message over 500 characters', () => {
    const r = validateMessage('A'.repeat(501));
    expect(r.valid).toBe(false);
    expect(r.message).toContain('500 characters');
  });
});
