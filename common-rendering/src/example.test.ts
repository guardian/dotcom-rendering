// ----- Imports ----- //

import { fullName } from "./example";

// ----- Tests ----- //

describe("example", () => {
    it("returns a person's full name", () => {
        const person = { firstName: 'CP', lastName: 'Scott' };

        expect(fullName(person)).toBe("CP Scott");
    });
});
