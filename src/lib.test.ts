// ----- Imports ----- //

import { identity } from "./lib";

// ----- Tests ----- //

describe("identity", () => {
    it("returns the same value that it was given", () => {
        expect(identity(2)).toBe(2);
        expect(identity("hello world")).toBe("hello world");
        expect(identity({ foo: "bar" })).toEqual({ foo: "bar" });
    });
});
