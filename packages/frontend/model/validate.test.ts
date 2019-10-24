import { validateAsCAPIType } from './validate';
import { CAPI } from '@root/fixtures/CAPI';

describe('validate', () => {
    it('does not throw an error on invalid data', () => {
        const data = { foo: 'bar' };
        expect(() => validateAsCAPIType(data)).not.toThrowError(TypeError);
    });

    it('confirm valid data', () => {
        expect(validateAsCAPIType(CAPI)).toBe(CAPI);
    });
});
