// ----- Imports ----- //

import { fullName } from './example';

// ----- Tests ----- //

describe('example', () => {
    test('returns a full name', () => {
        expect(fullName({ firstName: 'CP', lastName: 'Scott' })).toBe('CP Scott');
    });
});
