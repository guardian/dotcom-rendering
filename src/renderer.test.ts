import { renderAll, renderAllWithoutStyles, renderStandfirstText, renderText } from 'renderer';
import { JSDOM } from 'jsdom';
import { Pillar } from '@guardian/types/Format';
import { isValidElement, ReactNode } from 'react';
import { compose } from 'lib';
import { BodyElement, ElementKind } from 'bodyElement';
import { Role } from 'image';
import { configure, shallow } from 'enzyme';
import { none, some } from '@guardian/types/option';
import Adapter from 'enzyme-adapter-react-16';
import { Design, Display, Format } from '@guardian/types/Format';

configure({ adapter: new Adapter() });
const mockFormat: Format = {
    pillar: Pillar.News,
    design: Design.Article,
    display: Display.Standard,
};

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
        src: 'https://gu.com/img.png',
        srcset: '',
        dpr2Srcset: '',
        alt: some("alt tag"),
        caption: some(JSDOM.fragment('this caption contains <em>html</em>')),
        nativeCaption: some('caption'),
        credit: some('credit'),
        width: 500,
        height: 500,
        role: none,
    });

const imageElementWithRole = () =>
    ({
        ...imageElement(),
        role: some(Role.Thumbnail)
    })

const pullquoteElement = (): BodyElement =>
    ({
        kind: ElementKind.Pullquote,
        quote: "quote",
        attribution: none,
    })


const pullquoteWithAttributionElement = (): BodyElement =>
    ({
        kind: ElementKind.Pullquote,
        quote: "quote",
        attribution: some('attribution')
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

const instagramElement = (): BodyElement =>
    ({
        kind: ElementKind.Instagram,
        html: '<blockquote>Instagram</blockquote>',
    })

const embedElement = (): BodyElement =>
    ({
        kind: ElementKind.Embed,
        html: '<section>Embed</section>',
        alt: none,
    })

const videoElement = (): BodyElement =>
    ({
        kind: ElementKind.Video,
        src: "https://www.youtube.com/",
        height: "300",
        width: "500"
    })

const audioElement = (): BodyElement =>
    ({
        kind: ElementKind.Audio,
        src: "https://www.spotify.com/",
        height: "300",
        width: "500"
    })

const atomElement = (): BodyElement =>
    ({
        kind: ElementKind.InteractiveAtom,
        css: "main { background: yellow; }",
        html: "<main>Some content</main>",
        js: some("console.log('init')"),
    })

const liveEventElement = (): BodyElement =>
    ({
        kind: ElementKind.LiveEvent,
        linkText: "this links to a live event",
        url: "https://gu.com/liveevent"
    })

const explainerElement = (): BodyElement =>
    ({
        kind: ElementKind.ExplainerAtom,
        html: "<main>Some content</main>",
        title: "this is an explainer atom",
        id: ""
    })


const render = (element: BodyElement): ReactNode[] =>
    renderAll(mockFormat, [element]);

const renderWithoutStyles = (element: BodyElement): ReactNode[] =>
    renderAllWithoutStyles(mockFormat, [element]);

const renderCaption = (element: BodyElement): ReactNode[] =>
    renderAll(mockFormat, [element]);

const renderTextElement = compose(render, textElement);

const renderTextElementWithoutStyles = compose(renderWithoutStyles, textElement);

const renderCaptionElement = compose(renderCaption, imageElement)

const getHtml = (node: ReactNode): string =>
    isValidElement(node) ? shallow(node).html() : '';

describe('renderer returns expected content', () => {
    test('Renders supported node types for text elements', () => {
        const elements = [
            '<h2></h2>',
            '<blockquote></blockquote>',
            '<strong></strong>',
            '<em></em>',
            '<br>',
            '<ul><li></li></ul>',
            '<mark></mark>'
        ];

        expect(renderTextElement(elements).flat().length).toBe(7);
        expect(renderTextElementWithoutStyles(elements).flat().length).toBe(7);
    });

    test ('Renders caption node types', () => {
        const text = renderCaptionElement(JSDOM.fragment('this caption contains'));
        expect(getHtml(text.flat()[0])).toContain('<p');
    });

    test ('Removes unsupported caption node types', () => {
        const text = renderCaptionElement(JSDOM.fragment('this caption contains <blockquote>html</blockquote>'));
        text.flatMap(element => expect(element).not.toContain("blockquote"))
    });
});

describe('Transforms text nodes', () => {
    test('Transforms bullet points', () => {
        const nodes = renderTextElement([
            '• This is a bullet point we receive from capi'
        ]);
        const bullet = nodes.flat()[0];
        expect(getHtml(bullet)).not.toContain('• This is a bullet point we receive from capi')
    });

    test('Transforms horizontal rules', () => {
        const nodes = renderTextElement([
            '* * *'
        ]);
        const horizontalRule = nodes.flat()[0];
        expect(getHtml(horizontalRule)).not.toContain('* * *')
    });
});

describe('Renders different types of elements', () => {
    test('ElementKind.Image', () => {
        const nodes = render(imageElement())
        const bodyImage = nodes.flat()[0];
        expect(getHtml(bodyImage)).toContain('img');
        expect(getHtml(bodyImage)).toContain('figcaption');
        expect(getHtml(bodyImage)).toContain('caption="caption"');
        expect(getHtml(bodyImage)).toContain('credit="credit"');
    })

    test('ElementKind.Image with thumbnail role', () => {
        const nodes = render(imageElementWithRole())
        const bodyImage = nodes.flat()[0];
        expect(getHtml(bodyImage)).toContain('img');
    })

    test('ElementKind.Pullquote', () => {
        const nodes = render(pullquoteElement())
        const pullquote = nodes.flat()[0];
        expect(getHtml(pullquote)).toContain('<blockquote><p>quote</p></blockquote>');
    })

    test('ElementKind.Pullquote with attribution', () => {
        const nodes = render(pullquoteWithAttributionElement())
        const pullquote = nodes.flat()[0];
        expect(getHtml(pullquote)).toContain('<blockquote><p>quote</p><cite>attribution</cite></blockquote>');
    })

    test('ElementKind.RichLink', () => {
        const nodes = render(richLinkElement())
        const richLink = nodes.flat()[0];
        expect(getHtml(richLink)).toContain('<h1>this links to a related article</h1>');
        expect(getHtml(richLink)).toContain('href="https://gu.com/article"');
    })

    test('ElementKind.Interactive', () => {
        const nodes = render(interactiveElement())
        const interactive = nodes.flat()[0];
        expect(getHtml(interactive)).toContain('<iframe src="https://gu.com/interactive" height="500" title=""></iframe>');
    })

    test('ElementKind.Tweet', () => {
        const nodes = render(tweetElement())
        const tweet = nodes.flat()[0];
        expect(getHtml(tweet)).toContain('twitter-tweet');
    })

    test('ElementKind.Instagram', () => {
        const nodes = render(instagramElement())
        const instagram = nodes.flat()[0];
        expect(getHtml(instagram)).toBe('<div><blockquote>Instagram</blockquote></div>');
    })

    test('ElementKind.Embed', () => {
        const nodes = render(embedElement())
        const embed = nodes.flat()[0];
        expect(getHtml(embed)).toContain('<div><section>Embed</section></div>');
    })

    test('ElementKind.Audio', () => {
        const nodes = render(audioElement())
        const audio = nodes.flat()[0];
        expect(getHtml(audio)).toContain('src="https://www.spotify.com/" sandbox="allow-scripts" height="300" width="500" title="Audio element"');
    })

    test('ElementKind.Video', () => {
        const nodes = render(videoElement())
        const video = nodes.flat()[0];
        expect(getHtml(video)).toContain('src="https://www.youtube.com/" height="300" width="500" allowfullscreen="" title="Video element"');
    })

    test('ElementKind.InteractiveAtom', () => {
        const nodes = render(atomElement())
        const atom = nodes.flat()[0];
        expect(getHtml(atom)).toContain('main { background: yellow; }');
        expect(getHtml(atom)).toContain("console.log(&#x27;init&#x27;)");
        expect(getHtml(atom)).toContain('Some content');
    })

    test('ElementKind.LiveEvent', () => {
        const nodes = render(liveEventElement())
        const liveEvent = nodes.flat()[0];
        expect(getHtml(liveEvent)).toContain('<h1>this links to a live event</h1>');
    })

    test('ElementKind.ExplainerAtom', () => {
        const nodes = render(explainerElement())
        const explainer = nodes.flat()[0];
        expect(getHtml(explainer)).toContain('<main>Some content</main>');
    })
});

describe('Paragraph tags rendered correctly', () => {
    test('Contains no styles in standfirsts', () => {
        const fragment = JSDOM.fragment('<p>Parapraph tag</p><span>1</span>');
        const nodes = renderStandfirstText(fragment, mockFormat);
        const html = getHtml(nodes.flat()[0]);
        expect(html).toBe('<p>Parapraph tag</p>')
    });

    test('Contains styles in article body', () => {
        const fragment = JSDOM.fragment('<p>Parapraph tag</p><span>1</span>');
        const nodes = renderText(fragment, mockFormat);
        const html = getHtml(nodes.flat()[0]);
        expect(html).not.toBe('<p>Parapraph tag</p>')
    });
});
