import { CAPI } from '@root/fixtures/CAPI';
import { validateAsCAPIType } from './validate';

describe('validate', () => {
    it('throws on invalid data', () => {
        const data = { foo: 'bar' };
        expect(() => validateAsCAPIType(data)).toThrowError(TypeError);
    });

    it('confirm valid data', () => {
        expect(validateAsCAPIType(CAPI)).toBe(CAPI);
    });
});
