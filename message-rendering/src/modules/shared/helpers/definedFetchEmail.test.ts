import { defineFetchEmail } from './definedFetchEmail';

describe('defineFetchEmail', () => {
    it('returns fetchEmail if defined', () => {
        const fetchEmail = () => Promise.resolve('test@guardian.co.uk');
        expect(defineFetchEmail('something-else@guardian.co.uk', fetchEmail)).toBe(fetchEmail);
    });

    it('returns a promise returning email if fetchEmail is not defined', async () => {
        const result = await defineFetchEmail('something-else@guardian.co.uk', undefined)();
        expect(result).toBe('something-else@guardian.co.uk');
    });

    it('returns a promise returning null if fetchEmail and email are not defined', async () => {
        const result = await defineFetchEmail(undefined, undefined)();
        expect(result).toBe(null);
    });
});
