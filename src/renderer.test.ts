import { makeCaption } from './renderer';

describe('renderer returns expected content', () => {
    test('formats captions', () => {
        expect(makeCaption("caption", false, "credit")).toBe("caption");
        expect(makeCaption("caption", true, "credit")).toBe("caption credit");
    });
});