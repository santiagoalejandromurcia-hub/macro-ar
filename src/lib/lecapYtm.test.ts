import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { lecapTeaFromPrice, valorTecnico, type LecapSchedule } from './lecapYtm';

const synth: LecapSchedule = {
  ticker: 'TEST',
  fechaEmision: '2026-01-30',
  fechaVencimiento: '2027-01-29',
  temPct: 2.0,
  source: 'synthetic',
  verified: true,
};

describe('lecapYtm', () => {
  it('precio = VT → TEA ≈ TEA de emisión', () => {
    const settle = '2026-07-30';
    const vt = valorTecnico(synth, settle);
    const tea = lecapTeaFromPrice(synth, vt, settle);
    const teaIssue = (Math.pow(1 + 0.02, 12) - 1) * 100;
    assert.notEqual(tea, null);
    assert.ok(Math.abs((tea as number) - teaIssue) < 0.05);
  });

  it('precio inválido → null', () => {
    assert.equal(lecapTeaFromPrice(synth, 0, '2026-07-30'), null);
  });
});
