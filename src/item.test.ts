import { ContentType, Tag, TagType, ElementType, AssetType } from "mapiThriftModels";
import { fromCapi, Design, Standard, ElementKind } from 'item';
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

const articleContentWithText = {
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
                elements: [{
                    type: ElementType.TEXT,
                    assets: [],
                    textTypeData: {
                        html: "<p>Hong Kong authorities have warned people to avoid kissing their pets</p>"
                    }
                }]
            }
        ]
    }
}

const articleContentWithRichLink = {
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
                elements: [{
                    type: ElementType.RICH_LINK,
                    assets: [],
                    richLinkTypeData: {
                        url: "https://www.theguardian.com/",
                        originalUrl: "https://www.theguardian.com/",
                        linkText: "Chinese social media censoring 'officially sanctioned facts' on coronavirus",
                        linkPrefix: "Related: ",
                        role: "thumbnail"
                    }
                }]
            }
        ]
    }
}

const articleContentWithImage = {
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
                elements: [{
                    type: ElementType.IMAGE,
                    assets: [
                        {
                            type: AssetType.IMAGE,
                            mimeType: "image/jpeg",
                            file: "https://gu.com/image.jpg",
                            typeData: {
                                aspectRatio: "5:3",
                                width: 2000,
                                height: 1200
                            }
                        },
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
                        caption: "Was forced to bring in snow by helicopter in February as Europe had its warmest winter on record.",
                        copyright: "gu",
                        displayCredit: true,
                        credit: "Photograph: Photographer",
                        source: "gu",
                        photographer: "Photographer",
                        alt: "The ski resort of Superbagnères in the French Pyrenees",
                        mediaId: "id",
                        mediaApiUri: "https://image.co.uk",
                        suppliersReference: "reference",
                        imageType: "Photograph"
                    }
                }]
            }
        ]
    }
}

const articleContentWithPullquote = {
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
                elements: [{
                    type: ElementType.PULLQUOTE,
                    assets: [],
                    pullquoteTypeData: {
                        html: "<p>pullquote<p>",
                        attribution: ""
                    }
                }]
            }
        ]
    }
}

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

describe('body elements parsed correctly', () => {
    test('parses text elements', () => {
        const item = fromCapi(JSDOM.fragment)(articleContentWithText) as Standard;
        const element = item.body[0].toOption().withDefault({ kind: ElementKind.Interactive, url: '' })
        expect(element.kind).toBe(ElementKind.Text)
    })

    test('parses image elements', () => {
        const item = fromCapi(JSDOM.fragment)(articleContentWithImage) as Standard;
        const element = item.body[0].toOption().withDefault({ kind: ElementKind.Interactive, url: '' })
        expect(element.kind).toBe(ElementKind.Image)
    })

    test('parses pullquote elements', () => {
        const item = fromCapi(JSDOM.fragment)(articleContentWithPullquote) as Standard;
        const element = item.body[0].toOption().withDefault({ kind: ElementKind.Interactive, url: '' })
        expect(element.kind).toBe(ElementKind.Pullquote)
    })

    test('parses interactive elements', () => {

    })

    test('parses rich link elements', () => {
        const item = fromCapi(JSDOM.fragment)(articleContentWithRichLink) as Standard;
        const element = item.body[0].toOption().withDefault({ kind: ElementKind.Interactive, url: '' })
        expect(element.kind).toBe(ElementKind.RichLink)
    })

    test('parses tweet elements', () => {

    })

    test('handles unknown element', () => {

    })
});