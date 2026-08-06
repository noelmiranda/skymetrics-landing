import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { parse } from 'node-html-parser';
import { describe, it, expect, beforeAll } from 'vitest';
import Header from '../components/sections/Header.astro';
import Features from '../components/sections/Features.astro';
import HowItWorks from '../components/sections/HowItWorks.astro';
import Metrics from '../components/sections/Metrics.astro';
import CallToAction from '../components/sections/CallToAction.astro';
import Footer from '../components/sections/Footer.astro';

const SPANISH_WORDS = [
  'hola', 'gracias', 'inicio', 'nosotros', 'características',
  'sección', 'descripción', 'solución', 'análisis', 'térmico',
  'detección', 'paneles', 'inspección', 'informe', 'mapa',
  'empresa', 'contacto', 'enviar', 'nombre', 'correo',
];

function extractText(html: string): string {
  return parse(html).text.toLowerCase();
}

let allHtml: string;

beforeAll(async () => {
  const container = await AstroContainer.create();
  const parts = await Promise.all([
    container.renderToString(Header),
    container.renderToString(Features),
    container.renderToString(HowItWorks),
    container.renderToString(Metrics),
    container.renderToString(CallToAction),
    container.renderToString(Footer),
  ]);
  allHtml = parts.join('\n');
});

describe('English-only content (CLAUDE.md requirement)', () => {
  it('no Spanish words appear in visible text', () => {
    const text = extractText(allHtml);
    const found = SPANISH_WORDS.filter(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'i');
      return regex.test(text);
    });
    expect(found, `Spanish words found: ${found.join(', ')}`).toHaveLength(0);
  });

  it('no accented Spanish characters in text content', () => {
    const text = extractText(allHtml);
    const spanishAccents = /[áéíóúñ¿¡]/;
    // ΔT uses Greek letters — allow them; only flag Spanish-specific accented vowels
    const stripped = text.replace(/δt|δ/gi, '');
    expect(spanishAccents.test(stripped)).toBe(false);
  });

  it('all section headings are in English', () => {
    const root = parse(allHtml);
    const headings = root.querySelectorAll('h1, h2, h3, h4').map(h => h.text.trim());
    const suspiciousHeadings = headings.filter(h =>
      SPANISH_WORDS.some(w => h.toLowerCase().includes(w))
    );
    expect(suspiciousHeadings).toHaveLength(0);
  });
});
