export interface FieldResult {
  valid: boolean;
  message: string;
}

export function validateName(value: string): FieldResult {
  const v = value.trim();
  if (!v) return { valid: false, message: 'First name is required.' };
  if (v.length < 2) return { valid: false, message: 'Must be at least 2 characters.' };
  if (v.length > 50) return { valid: false, message: 'Must be 50 characters or fewer.' };
  return { valid: true, message: '' };
}

export function validateEmail(value: string): FieldResult {
  const v = value.trim();
  if (!v) return { valid: false, message: 'Work email is required.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return { valid: false, message: 'Enter a valid email address.' };
  return { valid: true, message: '' };
}

export function validateCapacity(value: string): FieldResult {
  if (!value) return { valid: false, message: 'Please select a capacity range.' };
  return { valid: true, message: '' };
}

export function validateCompany(value: string): FieldResult {
  if (value.length > 100) return { valid: false, message: 'Must be 100 characters or fewer.' };
  return { valid: true, message: '' };
}

export function validateMessage(value: string): FieldResult {
  if (value.length > 500) return { valid: false, message: 'Must be 500 characters or fewer.' };
  return { valid: true, message: '' };
}
