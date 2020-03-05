import { ContentType, Tag, TagType, ElementType, AssetType, IBlockElement as BlockElement } from "mapiThriftModels";
import { fromCapi, Design, Standard, ElementKind, Image } from 'item';
import { JSDOM } from "jsdom";

const articleContent = {
    id: "",
    type: ContentType.ARTICLE,
    webTitle: "",
    webUrl: "",
    apiUrl: "",
    tags: [],
    references: [],
    isHosted: false
}

const contentWithTag = (tagId: string) => ({
    ...articleContent,
    tags: [new Tag({
        id: tagId,
        type: TagType.TONE,
        webTitle: "",
        webUrl: "",
        apiUrl: "",
        references: []
    })]
})

const reviewContent = {
    ...contentWithTag('tone/reviews'),
    fields: {
        starRating: 4
    }
}

const articleContentWithElement = (element: BlockElement) => ({
    ...articleContent,
    blocks: {
        body: [
            {
                id: "",
                bodyHtml: "",
                bodyTextSummary: "",
                attributes: {},
                published: true,
                contributors: [],
                elements: [element]
            }
        ]
    }
})

const articleContentWithImage = articleContentWithElement({
    type: ElementType.IMAGE,
    assets: [
        {
            type: AssetType.IMAGE,
            mimeType: "image/jpeg",
            file: "https://gu.com/image.jpg",
            typeData: {
                aspectRatio: "5:3",
                width: 5302,
                height: 3182,
                isMaster: true
            }
        }
    ],
    imageTypeData: {
        caption: "caption",
        copyright: "",
        displayCredit: true,
        credit: "credit",
        source: "",
        photographer: "",
        alt: "alt",
        mediaId: "",
        mediaApiUri: "https://image.co.uk",
        suppliersReference: "",
        imageType: ""
    }
})

const articleContentWithImageWithoutFile = articleContentWithElement({
    type: ElementType.IMAGE,
    assets: [
        {
            type: AssetType.IMAGE,
            mimeType: "image/jpeg",
            file: "",
            typeData: {
                aspectRatio: "5:3",
                width: 5302,
                height: 3182,
                isMaster: true
            }
        }
    ],
    imageTypeData: {
        copyright: "",
        source: "",
        photographer: "",
        mediaId: "",
        mediaApiUri: "https://image.co.uk",
        suppliersReference: "",
        imageType: ""
    }
})

describe('fromCapi returns correct Item', () => {
    test('media', () => {
        const item = fromCapi(JSDOM.fragment)(contentWithTag('type/audio'));
        expect(item.design).toBe(Design.Media)
    })

    test('review', () => {
        const item = fromCapi(JSDOM.fragment)(reviewContent);
        expect(item.design).toBe(Design.Review)
    })

    test('analysis', () => {
        const item = fromCapi(JSDOM.fragment)(contentWithTag('tone/analysis'));
        expect(item.design).toBe(Design.Analysis)
    })

    test('comment', () => {
        const item = fromCapi(JSDOM.fragment)(contentWithTag('tone/comment'));
        expect(item.design).toBe(Design.Comment)
    })

    test('feature', () => {
        const item = fromCapi(JSDOM.fragment)(contentWithTag('tone/features'));
        expect(item.design).toBe(Design.Feature)
    })

    test('live', () => {
        const item = fromCapi(JSDOM.fragment)(contentWithTag('tone/minutebyminute'));
        expect(item.design).toBe(Design.Live)
    })

    test('recipe', () => {
        const item = fromCapi(JSDOM.fragment)(contentWithTag('tone/recipes'));
        expect(item.design).toBe(Design.Recipe)
    })

    test('matchreport', () => {
        const item = fromCapi(JSDOM.fragment)(contentWithTag('tone/matchreports'));
        expect(item.design).toBe(Design.MatchReport)
    })

    test('interview', () => {
        const item = fromCapi(JSDOM.fragment)(contentWithTag('tone/interview'));
        expect(item.design).toBe(Design.Interview)
    })

    test('guardianview', () => {
        const item = fromCapi(JSDOM.fragment)(contentWithTag('tone/editorials'));
        expect(item.design).toBe(Design.GuardianView)
    })

    test('quiz', () => {
        const item = fromCapi(JSDOM.fragment)(contentWithTag('tone/quizzes'));
        expect(item.design).toBe(Design.Quiz)
    })

    test('advertisementfeature', () => {
        const item = fromCapi(JSDOM.fragment)(contentWithTag('tone/advertisement-features'));
        expect(item.design).toBe(Design.AdvertisementFeature)
    })

    test('article', () => {
        const item = fromCapi(JSDOM.fragment)(articleContent);
        expect(item.design).toBe(Design.Article)
    })
})


describe('text elements', () => {
    test('parses text elements', () => {
        const textElement = {
            type: ElementType.TEXT,
            assets: [],
            textTypeData: {
                html: "<p>paragraph</p>"
            }
        }
        const item = fromCapi(JSDOM.fragment)(articleContentWithElement(textElement)) as Standard;
        const element = item.body[0].toOption().withDefault({ kind: ElementKind.Interactive, url: '' })
        expect(element.kind).toBe(ElementKind.Text)
    })

    test('filters empty text elements', () => {
        const textElement = {
            type: ElementType.TEXT,
            assets: [],
            textTypeData: {
                html: ""
            }
        }
        const item = fromCapi(JSDOM.fragment)(articleContentWithElement(textElement)) as Standard;
        const element = item.body[0].toOption().withDefault({ kind: ElementKind.Interactive, url: '' })
        expect(element.kind).toBe(ElementKind.Interactive)
    })
});

describe('image elements', () => {
    test('parses image elements', () => {
        const item = fromCapi(JSDOM.fragment)(articleContentWithImage) as Standard;
        const element = item.body[0].toOption().withDefault({ kind: ElementKind.Interactive, url: '' })
        expect(element.kind).toBe(ElementKind.Image)
    })

    test('filters image elements without file url', () => {
        const item = fromCapi(JSDOM.fragment)(articleContentWithImageWithoutFile) as Standard;
        const element = item.body[0].toOption().withDefault({ kind: ElementKind.Interactive, url: '' })
        expect(element.kind).toBe(ElementKind.Interactive)
    })

    test('uses displayCredit', () => {
        const item = fromCapi(JSDOM.fragment)(articleContentWithImage) as Standard;
        const element = item.body[0].toOption().withDefault({
            kind: ElementKind.Image,
            alt: "",
            caption: JSDOM.fragment("caption"),
            credit: "",
            file: "",
            width: 500,
            height: 500,
            captionString: ""
        }) as Image;
        expect(element.caption).toStrictEqual(JSDOM.fragment("caption credit"))
    })
});

describe('pullquote elements', () => {
    test('parses pullquote elements', () => {
        const pullquoteElement = {
            type: ElementType.PULLQUOTE,
            assets: [],
            pullquoteTypeData: {
                html: "<p>pullquote<p>",
                attribution: ""
            }
        }
        const item = fromCapi(JSDOM.fragment)(articleContentWithElement(pullquoteElement)) as Standard;
        const element = item.body[0].toOption().withDefault({ kind: ElementKind.Interactive, url: '' })
        expect(element.kind).toBe(ElementKind.Pullquote)
    })

    test('filters empty pullquote elements', () => {
        const pullquoteElement = {
            type: ElementType.PULLQUOTE,
            assets: [],
            pullquoteTypeData: {
                html: "",
                attribution: ""
            }
        }
        const item = fromCapi(JSDOM.fragment)(articleContentWithElement(pullquoteElement)) as Standard;
        const element = item.body[0].toOption().withDefault({ kind: ElementKind.Interactive, url: '' })
        expect(element.kind).toBe(ElementKind.Interactive)
    })
});

describe('interactive elements', () => {
    test('parses interactive elements', () => {
        const interactiveElement = {
            type: ElementType.INTERACTIVE,
            assets: [],
            interactiveTypeData: {
                iframeUrl: "https://gu.com"
            }
        }
        const item = fromCapi(JSDOM.fragment)(articleContentWithElement(interactiveElement)) as Standard;
        const element = item.body[0].toOption().withDefault({ kind: ElementKind.RichLink, url: '', linkText: '' })
        expect(element.kind).toBe(ElementKind.Interactive)
    })

    test('filters empty interactive elements', () => {
        const interactiveElement = {
            type: ElementType.INTERACTIVE,
            assets: [],
            interactiveTypeData: {
                iframeUrl: ""
            }
        }
        const item = fromCapi(JSDOM.fragment)(articleContentWithElement(interactiveElement)) as Standard;
        const element = item.body[0].toOption().withDefault({ kind: ElementKind.RichLink, url: '', linkText: '' })
        expect(element.kind).toBe(ElementKind.RichLink)
    })
});

describe('rich link elements', () => {
    test('parses rich link elements', () => {
        const richLinkElement = {
            type: ElementType.RICH_LINK,
            assets: [],
            richLinkTypeData: {
                url: "https://www.theguardian.com/",
                originalUrl: "https://www.theguardian.com/",
                linkText: "link text",
                linkPrefix: "",
                role: ""
            }
        }
        const item = fromCapi(JSDOM.fragment)(articleContentWithElement(richLinkElement)) as Standard;
        const element = item.body[0].toOption().withDefault({ kind: ElementKind.Interactive, url: '' })
        expect(element.kind).toBe(ElementKind.RichLink)
    })

    test('filters rich link elements with empty urls', () => {
        const richLinkElement = {
            type: ElementType.RICH_LINK,
            assets: [],
            richLinkTypeData: {
                url: "",
                originalUrl: "https://www.theguardian.com/",
                linkText: "link text",
                linkPrefix: "",
                role: ""
            }
        }
        const item = fromCapi(JSDOM.fragment)(articleContentWithElement(richLinkElement)) as Standard;
        const element = item.body[0].toOption().withDefault({ kind: ElementKind.Interactive, url: '' })
        expect(element.kind).toBe(ElementKind.Interactive)
    })

    test('filters rich link elements with empty linkText', () => {
        const richLinkElement = {
            type: ElementType.RICH_LINK,
            assets: [],
            richLinkTypeData: {
                url: "https://www.theguardian.com/",
                originalUrl: "",
                linkText: "",
                linkPrefix: "",
                role: ""
            }
        }
        const item = fromCapi(JSDOM.fragment)(articleContentWithElement(richLinkElement)) as Standard;
        const element = item.body[0].toOption().withDefault({ kind: ElementKind.Interactive, url: '' })
        expect(element.kind).toBe(ElementKind.Interactive)
    })
});

describe('tweet elements', () => {
    test('parses tweet elements', () => {
        const tweetElement = {
            type: ElementType.TWEET,
            assets: [],
            tweetTypeData: {
                id: "id",
                html: "<blockquote>tweet<blockquote>"
            }
        }
        const item = fromCapi(JSDOM.fragment)(articleContentWithElement(tweetElement)) as Standard;
        const element = item.body[0].toOption().withDefault({ kind: ElementKind.Interactive, url: '' })
        expect(element.kind).toBe(ElementKind.Tweet)
    })

    test('filters tweet elements with empty ids', () => {
        const tweetElement = {
            type: ElementType.TWEET,
            assets: [],
            tweetTypeData: {
                id: "",
                html: "<blockquote>tweet<blockquote>"
            }
        }
        const item = fromCapi(JSDOM.fragment)(articleContentWithElement(tweetElement)) as Standard;
        const element = item.body[0].toOption().withDefault({ kind: ElementKind.Interactive, url: '' })
        expect(element.kind).toBe(ElementKind.Interactive)
    })

    test('filters tweet elements with empty html', () => {
        const tweetElement = {
            type: ElementType.TWEET,
            assets: [],
            tweetTypeData: {
                id: "id",
                html: ""
            }
        }
        const item = fromCapi(JSDOM.fragment)(articleContentWithElement(tweetElement)) as Standard;
        const element = item.body[0].toOption().withDefault({ kind: ElementKind.Interactive, url: '' })
        expect(element.kind).toBe(ElementKind.Interactive)
    })

    test('filters tweet elements with no blockquotes', () => {
        const tweetElement = {
            type: ElementType.TWEET,
            assets: [],
            tweetTypeData: {
                id: "id",
                html: "<span>tweet<span>"
            }
        }
        const item = fromCapi(JSDOM.fragment)(articleContentWithElement(tweetElement)) as Standard;
        const element = item.body[0].toOption().withDefault({ kind: ElementKind.Interactive, url: '' })
        expect(element.kind).toBe(ElementKind.Interactive)
    })
});
