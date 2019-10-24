import { validateAsCAPIType } from './validate';
import { CAPI } from '@root/fixtures/CAPI';

describe('validate', () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
        jest.resetModules(); // Clear cache
        process.env = { ...OLD_ENV };
        delete process.env.NODE_ENV;
    });

    afterEach(() => {
        process.env = OLD_ENV;
    });

    it('does not throw an error in production on invalid data', () => {
        process.env.NODE_ENV = 'production';
        const data = { foo: 'bar' };
        expect(() => validateAsCAPIType(data)).not.toThrowError(TypeError);
    });

    it('does throw an error in development on invalid data', () => {
        process.env.NODE_ENV = 'development';
        const data = { foo: 'bar' };
        expect(() => validateAsCAPIType(data)).toThrowError(TypeError);
    });

    it('confirm valid data', () => {
        expect(validateAsCAPIType(CAPI)).toBe(CAPI);
    });
});
