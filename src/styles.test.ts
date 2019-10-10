import { basePx } from './styles';

test('Calculates base pixels', () => {
    expect(basePx(1)).toBe('8px');
});