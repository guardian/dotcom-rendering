import { ContentType, Tag, TagType, ElementType, AssetType, IBlockElement as BlockElement } from 'mapiThriftModels';
import { fromCapi, Standard, Review, getFormat } from 'item';
import { ElementKind, Audio, Video } from 'bodyElement';
import { Design } from 'format';
import { JSDOM } from 'jsdom';
import { Display } from '@guardian/types/Format';

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

const immersive = {
    id: "",
    type: ContentType.ARTICLE,
    webTitle: "",
    webUrl: "",
    apiUrl: "",
    tags: [],
    references: [],
    isHosted: false,
    fields: {
        displayHint: "immersive"
    }
}

const showcase = ({
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
                elements: []
            }
        ],
        main: {
            id: "",
            bodyHtml: "",
            bodyTextSummary: "",
            attributes: {},
            published: true,
            contributors: [],
            elements: [
                {
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
                        role: 'showcase',
                        copyright: "",
                        source: "",
                        photographer: "",
                        mediaId: "",
                        mediaApiUri: "https://image.co.uk",
                        suppliersReference: "",
                        imageType: ""
                    }
                }
            ]
        }
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

const f = fromCapi(JSDOM.fragment);

const getFirstBody = (item: Review | Standard) =>
    item.body[0].toOption().withDefault({ kind: ElementKind.Interactive, url: '' });


describe('fromCapi returns correct Item', () => {
    test('media', () => {
        const item = f(contentWithTag('type/audio'));
        expect(item.design).toBe(Design.Media);
    })

    test('review', () => {
        const item = f(reviewContent);
        expect(item.design).toBe(Design.Review);
    })

    test('analysis', () => {
        const item = f(contentWithTag('tone/analysis'));
        expect(item.design).toBe(Design.Analysis);
    })

    test('comment', () => {
        const item = f(contentWithTag('tone/comment'));
        expect(item.design).toBe(Design.Comment);
    })

    test('feature', () => {
        const item = f(contentWithTag('tone/features'));
        expect(item.design).toBe(Design.Feature);
    })

    test('live', () => {
        const item = f(contentWithTag('tone/minutebyminute'));
        expect(item.design).toBe(Design.Live);
    })

    test('recipe', () => {
        const item = f(contentWithTag('tone/recipes'));
        expect(item.design).toBe(Design.Recipe);
    })

    test('matchreport', () => {
        const item = f(contentWithTag('tone/matchreports'));
        expect(item.design).toBe(Design.MatchReport);
    })

    test('interview', () => {
        const item = f(contentWithTag('tone/interview'));
        expect(item.design).toBe(Design.Interview);
    })

    test('guardianview', () => {
        const item = f(contentWithTag('tone/editorials'));
        expect(item.design).toBe(Design.GuardianView);
    })

    test('quiz', () => {
        const item = f(contentWithTag('tone/quizzes'));
        expect(item.design).toBe(Design.Quiz);
    })

    test('advertisementfeature', () => {
        const item = f(contentWithTag('tone/advertisement-features'));
        expect(item.design).toBe(Design.AdvertisementFeature);
    })

    test('article', () => {
        const item = f(articleContent);
        expect(item.design).toBe(Design.Article);
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
        const item = f(articleContentWithElement(textElement)) as Standard;
        const element = getFirstBody(item)
        expect(element.kind).toBe(ElementKind.Text);
    })

    test('filters empty text elements', () => {
        const textElement = {
            type: ElementType.TEXT,
            assets: [],
            textTypeData: {
                html: ""
            }
        }
        const item = f(articleContentWithElement(textElement)) as Standard;
        const element = getFirstBody(item);
        expect(element.kind).toBe(ElementKind.Interactive);
    })
});

describe('image elements', () => {
    test('parses image elements', () => {
        const item = f(articleContentWithImage) as Standard;
        const element = getFirstBody(item);
        expect(element.kind).toBe(ElementKind.Image);
    })

    test('filters image elements without file url', () => {
        const item = f(articleContentWithImageWithoutFile) as Standard;
        const element = getFirstBody(item);
        expect(element.kind).toBe(ElementKind.Interactive);
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
        const item = f(articleContentWithElement(pullquoteElement)) as Standard;
        const element = getFirstBody(item);
        expect(element.kind).toBe(ElementKind.Pullquote);
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
        const item = f(articleContentWithElement(pullquoteElement)) as Standard;
        const element = getFirstBody(item);
        expect(element.kind).toBe(ElementKind.Interactive);
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
        const item = f(articleContentWithElement(interactiveElement)) as Standard;
        const element = item.body[0].toOption().withDefault({ kind: ElementKind.RichLink, url: '', linkText: '' })
        expect(element.kind).toBe(ElementKind.Interactive);
    })

    test('filters empty interactive elements', () => {
        const interactiveElement = {
            type: ElementType.INTERACTIVE,
            assets: [],
            interactiveTypeData: {
                iframeUrl: ""
            }
        }
        const item = f(articleContentWithElement(interactiveElement)) as Standard;
        const element = item.body[0].toOption().withDefault({ kind: ElementKind.RichLink, url: '', linkText: '' })
        expect(element.kind).toBe(ElementKind.RichLink);
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
        const item = f(articleContentWithElement(richLinkElement)) as Standard;
        const element = getFirstBody(item);
        expect(element.kind).toBe(ElementKind.RichLink);
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
        const item = f(articleContentWithElement(richLinkElement)) as Standard;
        const element = getFirstBody(item);
        expect(element.kind).toBe(ElementKind.Interactive);
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
        const item = f(articleContentWithElement(richLinkElement)) as Standard;
        const element = getFirstBody(item);
        expect(element.kind).toBe(ElementKind.Interactive);
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
        const item = f(articleContentWithElement(tweetElement)) as Standard;
        const element = getFirstBody(item);
        expect(element.kind).toBe(ElementKind.Tweet);
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
        const item = f(articleContentWithElement(tweetElement)) as Standard;
        const element = getFirstBody(item);
        expect(element.kind).toBe(ElementKind.Interactive);
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
        const item = f(articleContentWithElement(tweetElement)) as Standard;
        const element = getFirstBody(item);
        expect(element.kind).toBe(ElementKind.Interactive);
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
        const item = f(articleContentWithElement(tweetElement)) as Standard;
        const element = getFirstBody(item);
        expect(element.kind).toBe(ElementKind.Interactive);
    })
});

describe('instagram elements', () => {
    test('parses instagram elements', () => {
        const instagramElement = {
            type: ElementType.INSTAGRAM,
            assets: [],
            instagramTypeData: {
                html: "<p>Instagram post<p>",
                originalUrl: "",
                title: "",
                source: "",
                authorUrl: "",
                authorUsername: ""
            }
        }
        const item = f(articleContentWithElement(instagramElement)) as Standard;
        const element = getFirstBody(item);
        expect(element.kind).toBe(ElementKind.Instagram);
    });

    test('filters embed elements without instagramTypeData html', () => {
        const instagramElement = {
            type: ElementType.INSTAGRAM,
            assets: [],
            instagramTypeData: {
                originalUrl: "",
                title: "",
                source: "",
                authorUrl: "",
                authorUsername: ""
            }
        }
        const item = f(articleContentWithElement(instagramElement)) as Standard;
        const element = getFirstBody(item);
        expect(element.kind).toBe(ElementKind.Interactive);
    });
});

describe('embed elements', () => {
    test('parses embed elements', () => {
        const embedElement = {
            type: ElementType.EMBED,
            assets: [],
            embedTypeData: {
                html: "<p>Embed element<p>",
            }
        }
        const item = f(articleContentWithElement(embedElement)) as Standard;
        const element = getFirstBody(item);
        expect(element.kind).toBe(ElementKind.Embed);
    });

    test('filters embed elements without embedTypeData html', () => {
        const embedElement = {
            type: ElementType.EMBED,
            assets: [],
            embedTypeData: {}
        }
        const item = f(articleContentWithElement(embedElement)) as Standard;
        const element = getFirstBody(item);
        expect(element.kind).toBe(ElementKind.Interactive);
    });
});

describe('audio elements', () => {
    test('filters out audio elements with no src attributes on iframe', () => {
        const audioElement = {
            type: ElementType.AUDIO,
            assets: [],
            audioTypeData: {
                html: "<iframe></iframe>",
            }
        }
        const item = f(articleContentWithElement(audioElement)) as Standard;
        const element = getFirstBody(item);
        expect(element.kind).toBe(ElementKind.Interactive);
    });

    test('filters audio elements without audioTypeData html', () => {
        const audioElement = {
            type: ElementType.AUDIO,
            assets: [],
            audioTypeData: {}
        }
        const item = f(articleContentWithElement(audioElement)) as Standard;
        const element = getFirstBody(item);
        expect(element.kind).toBe(ElementKind.Interactive);
    });

    test('strips and sets attributes on iframe', () => {
        const audioElement = {
            type: ElementType.AUDIO,
            assets: [],
            audioTypeData: {
                html: "<iframe src='https://open.spotify.com/embed/track/' width='300' height='300' frameborder='0'></iframe>",
            }
        }
        const item = f(articleContentWithElement(audioElement)) as Standard;
        item.body[0].fmap<Audio>(element => element as Audio)
            .fmap(({ src, width, height }) => {
                expect(src).toContain('https://open.spotify.com/embed/track/');
                expect(width).toContain('300');
                expect(height).not.toContain('380');
            });
    });

    test('does not render if no iframe inside the html', () => {
        const audioElement = {
            type: ElementType.AUDIO,
            assets: [],
            audioTypeData: {
                html: "<p>Spotify playlist<p>",
            }
        }
        const item = f(articleContentWithElement(audioElement)) as Standard;
        const element = getFirstBody(item);
        expect(element.kind).toBe(ElementKind.Interactive);
    });
});


describe('video elements', () => {
    test('filters out video elements with no src attributes on iframe', () => {
        const videoElement = {
            type: ElementType.VIDEO,
            assets: [],
            videoTypeData: {
                html: "<iframe></iframe>",
            }
        }
        const item = f(articleContentWithElement(videoElement)) as Standard;
        const element = getFirstBody(item);
        expect(element.kind).toBe(ElementKind.Interactive);
    });

    test('filters video elements without videoTypeData html', () => {
        const videoElement = {
            type: ElementType.VIDEO,
            assets: [],
            videoTypeData: {}
        }
        const item = f(articleContentWithElement(videoElement)) as Standard;
        const element = getFirstBody(item);
        expect(element.kind).toBe(ElementKind.Interactive);
    });

    test('strips and sets attributes on iframe', () => {
        const videoElement = {
            type: ElementType.VIDEO,
            assets: [],
            videoTypeData: {
                html: "<iframe height='259' width='460' src='https://www.youtube-nocookie.com/embed/' frameborder='0' allowfullscreen ></iframe>"
            }
        }
        const item = f(articleContentWithElement(videoElement)) as Standard;
        item.body[0].fmap<Video>(element => element as Video)
            .fmap(({ src, width, height }) => {
                expect(src).toBe('https://www.youtube-nocookie.com/embed/');
                expect(width).toBe('460');
                expect(height).toBe('259');
            });
    });

    test('does not render if no iframe inside the html', () => {
        const videoElement = {
            type: ElementType.VIDEO,
            assets: [],
            videoTypeData: {
                html: "<p>YouTube video<p>",
            }
        }
        const item = f(articleContentWithElement(videoElement)) as Standard;
        const element = getFirstBody(item);
        expect(element.kind).toBe(ElementKind.Interactive);
    });
});

describe('format', () => {
    test('Uses immersive display', () => {
        const item = f(immersive);
        const format = getFormat(item);
        expect(format.display).toBe(Display.Immersive)
    });

    test('Uses showcase display', () => {
        const item = f(showcase);
        const format = getFormat(item);
        expect(format.display).toBe(Display.Showcase)
    });
});