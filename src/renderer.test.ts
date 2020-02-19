import { ImageElement } from './renderer';
import { JSDOM } from 'jsdom';
import { Pillar } from 'pillar';

describe('renderer returns expected content', () => {
    test('ImageElement returns null for no url', () => {
        const imageProps = {
            url: '',
            alt: "alt",
            salt: "salt",
            sizes: "sizes",
            width: 500,
            height: 500,
            captionString: "caption",
            caption: JSDOM.fragment('this caption contains <em>html</em>'),
            credit: "credit",
            pillar: Pillar.news

        }
        expect(ImageElement(imageProps)).toBe(null);
    });
});