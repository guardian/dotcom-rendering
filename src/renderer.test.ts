import { ImageElement } from './renderer';

describe('renderer returns expected content', () => {
    test('ImageElement returns null for no url', () => {
        const imageProps = {
            url: '',
            alt: "alt",
            salt: "salt",
            sizes: "sizes",
            width: 500,
            height: 500,
            caption: "caption",
            credit: "credit"
        }
        expect(ImageElement(imageProps)).toBe(null);
    });
});