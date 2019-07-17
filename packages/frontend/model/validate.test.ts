import { validateAsCAPIType } from './validate';
import { CAPI } from '@root/fixtures/CAPI';

describe('validate', () => {
    it('throws on invalid data', () => {
        const data = { foo: 'bar' };
        expect(() => validateAsCAPIType(data)).toThrowError(TypeError);
    });

    it('confirm valid data', () => {
        expect(validateAsCAPIType(CAPI)).toBe(CAPI);
    });
});
