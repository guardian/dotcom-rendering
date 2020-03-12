import { ImageElement } from './renderer';
import { JSDOM } from 'jsdom';
import { Pillar } from 'pillar';
import { ReactNode, createElement as h } from 'react';
import { renderAll } from 'renderer';
import { compose } from 'lib';
import { ElementKind, BodyElement } from 'item';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { None } from 'types/option';

configure({ adapter: new Adapter() });

beforeEach(() => {
    console.error = jest.fn()
})

const textElement = (nodes: string[]): BodyElement =>
    ({
        kind: ElementKind.Text,
        doc: JSDOM.fragment(nodes.join('')),
    });

const imageElement = (): BodyElement =>
    ({
        kind: ElementKind.Image,
        file: "https://gu.com/img.png",
        alt: "alt tag",
        caption: JSDOM.fragment('this caption contains <em>html</em>'),
        captionString: "caption",
        credit: "credit",
        width: 500,
        height: 500,
        role: ""
    });

const pullquoteElement = (): BodyElement =>
    ({
        kind: ElementKind.Pullquote,
        quote: "quote",
        attribution: new None()
    })

const richLinkElement = (): BodyElement =>
    ({
        kind: ElementKind.RichLink,
        url: "https://gu.com/article",
        linkText: "this links to a related article"
    })

const interactiveElement = (): BodyElement =>
    ({
        kind: ElementKind.Interactive,
        url: "https://gu.com/interactive",
    })

const tweetElement = (): BodyElement =>
    ({
        kind: ElementKind.Tweet,
        content: JSDOM.fragment('<span>Tweet contents<span>').querySelectorAll('span'),
    })

const render = (element: BodyElement): ReactNode[] =>
    renderAll('dummySalt')(Pillar.news, [element]);

const renderTextElement = compose(render, textElement);

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
            pillar: Pillar.news,
        };
        expect(ImageElement(imageProps)).toBe(null);
    });

    test('ImageElement returns image', () => {
        const imageProps = {
            url: 'https://media.guim.co.uk/image.jpg',
            alt: "alt",
            salt: "salt",
            sizes: "sizes",
            width: 500,
            height: 500,
            captionString: "caption",
            caption: JSDOM.fragment('this caption contains <em>html</em>'),
            credit: "credit",
            pillar: Pillar.news,
        };
        const image = shallow(h(ImageElement, imageProps));

        expect(image.html()).toContain('img');
        expect(image.prop('alt')).toBe('alt');
    });

    test('Renders supported node types for text elements', () => {
        const text = renderTextElement([
            '<h2></h2>',
            '<blockquote></blockquote>',
            '<strong></strong>',
            '<em></em>',
            '<br>',
            '<ul><li></li></ul>',
            '<mark></mark>'
        ]);

        expect(text.flat().length).toBe(7);
    });
});

describe('Transforms text nodes', () => {
    test('Transforms bullet points', () => {
        const nodes = renderTextElement([
            '• This is a bullet point we receive from capi'
        ]);
        const bullet = shallow(nodes.flat()[0]);
        expect(bullet.html()).not.toContain('• This is a bullet point we receive from capi')
    });

    test('Transforms horizontal rules', () => {
        const nodes = renderTextElement([
            '* * *'
        ]);
        const horizontalRule = shallow(nodes.flat()[0]);
        expect(horizontalRule.html()).not.toContain('* * *')
    });
});

describe('Renders different types of elements', () => {
    test('ElementKind.Image', () => {
        const nodes = render(imageElement())
        const bodyImage = shallow(nodes.flat()[0]);
        expect(bodyImage.html()).toContain('img');
        expect(bodyImage.html()).toContain('figcaption');
        expect(bodyImage.html()).toContain('caption="caption"');
        expect(bodyImage.html()).toContain('credit="credit"');
    })

    test('ElementKind.Pullquote', () => {
        const nodes = render(pullquoteElement())
        const pullquote = shallow(nodes.flat()[0]);
        expect(pullquote.html()).toContain('<blockquote><p>quote</p></blockquote>');
    })

    test('ElementKind.RichLink', () => {
        const nodes = render(richLinkElement())
        const richLink = shallow(nodes.flat()[0]);
        expect(richLink.html()).toContain('<h1>this links to a related article</h1>');
        expect(richLink.html()).toContain('href="https://gu.com/article"');
    })

    test('ElementKind.Interactive', () => {
        const nodes = render(interactiveElement())
        const interactive = shallow(nodes.flat()[0]);
        expect(interactive.html()).toContain('<iframe src="https://gu.com/interactive" height="500"></iframe>');
    })

    test('ElementKind.Tweet', () => {
        const nodes = render(tweetElement())
        const tweet = shallow(nodes.flat()[0]);
        expect(tweet.html()).toContain('twitter-tweet');
    })
});
