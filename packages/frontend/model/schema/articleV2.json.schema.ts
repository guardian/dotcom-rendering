export const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Article',
    description: 'DCR Article Type request data requirements',
    type: 'object',
    required: ['page', 'site', 'version'],
    properties: {
        page: {
            type: 'object',
            required: [
                'content',
                'tags',
                'section',
                'edition',
                'editionId',
                'pageId',
                'pillar',
                'webPublicationDate',
                'webPublicationDateDisplay',
                'sectionLabel',
                'sectionUrl',
                'webTitle',
                'webURL',
                'contentType', // scala option -> throws error if missing
                'subMetaLinks',
                'commercial',
                'meta',
            ],
            properties: {
                content: { $ref: '#/definitions/Content' },
                tags: { $ref: '#/definitions/Tags' },
                pageId: {
                    type: 'string',
                    format: 'uri-reference',
                    minLength: 1,
                },
                pillar: {
                    type: 'string',
                    enum: [
                        'News',
                        'Opinion',
                        'Sport',
                        'Culture',
                        'Lifestyle',
                        'Arts',
                        '',
                    ],
                    default: '',
                }, // scala option
                pagination: { $ref: '#/definitions/Pagination' }, // optional
                webPublicationDate: { type: 'integer' }, // TODO format?
                webPublicationDateDisplay: { type: 'string' }, // TODO format?
                section: { type: 'string', default: '' }, // scala option
                sectionLabel: { type: 'string' },
                sectionUrl: { type: 'string', format: 'uri-reference' },
                webTitle: { type: 'string', minLength: 1 },
                seriesId: { type: 'string', default: '' }, // scala option
                contentId: {
                    type: 'string',
                    format: 'uri-reference',
                    minLength: 1,
                }, // scala option
                editionId: { type: 'string', enum: ['UK', 'US', 'AU', 'INTL'] },
                edition: { type: 'string', default: '' },
                webURL: { type: 'string', format: 'uri', minLength: 1 },
                contentType: {
                    type: 'string',
                    enum: ['Article', 'LiveBlog', ''],
                }, // TODO ga '' scala option -> validation will fail
                starRating: { type: 'integer', minimum: 0, maximum: 5 }, //  optional
                subMetaLinks: { $ref: '#/definitions/SubMetaLinks' },
                commercial: { $ref: '#/definitions/Commercial' },
                meta: { $ref: '#/definitions/Meta' },
            },
        },
        site: {
            type: 'object',
            required: [
                'ajaxUrl',
                'beaconUrl',
                'guardianBaseURL',
                'commercialUrl',
            ],
            properties: {
                ajaxUrl: { type: 'string', format: 'uri', minLength: 1 },
                beaconUrl: {
                    type: 'string',
                    format: 'uri-reference',
                    minLength: 1,
                },
                guardianBaseURL: {
                    type: 'string',
                    format: 'uri',
                    minLength: 1,
                },
                sentryPublicApiKey: { type: 'string', default: '' }, // scala option
                sentryHost: { type: 'string', default: '' }, // scala option
                switches: { type: 'object', default: {} },
                commercialUrl: { type: 'string', format: 'uri', minLength: 1 },
                dfpAccountId: { type: 'string', default: '' }, // TODO check and fix - not currently used
            },
        },
        version: { type: 'integer', minimum: 2, maximum: 2 },
    },
    additonalProperties: false,
    definitions: {
        Block: {
            type: 'object',
            required: ['bodyHtml', 'elements'],
            properties: {
                id: { type: 'string' },
                bodyHtml: { type: 'string', default: '' },
                elements: {
                    type: 'array',
                    default: [],
                },
                createdOn: { type: 'integer' },
                createdOnDisplay: { type: 'string' },
                lastUpdatedDisplay: { type: 'string' },
                title: { type: 'string' },
            },
        },
        Content: {
            type: 'object',
            required: ['headline', 'main', 'blocks', 'byline', 'trailText'],
            properties: {
                headline: { type: 'string', minLength: 1 },
                standfirst: { type: 'string', default: '' }, // scala option
                main: { type: 'string', default: '' },
                body: { type: 'string' },
                blocks: {
                    type: 'object',
                    required: ['body', 'main', 'keyEvents'],
                    properties: {
                        body: {
                            type: 'array',
                            items: { $ref: '#/definitions/Block' },
                        },
                        keyEvents: {
                            type: 'array',
                            items: { $ref: '#/definitions/Block' },
                        },
                        main: {
                            $ref: '#/definitions/Block',
                            default: { $ref: '#/definitions/Block' },
                        },
                    },
                },
                byline: { type: 'string', default: '' },
                trailText: { type: 'string', default: '' },
            },
        },
        Tags: {
            type: 'object',
            required: ['all'],
            properties: {
                authorIds: {
                    type: 'string',
                    default: '',
                }, // scala option
                toneIds: {
                    type: 'string',
                    default: '',
                }, // scala option
                keywordId: {
                    type: 'string',
                    default: '',
                }, // scala option
                commissioningDesks: {
                    type: 'string',
                    default: '',
                }, // scala option
                all: {
                    type: 'array',
                    default: [],
                    items: {
                        type: 'object',
                        required: ['properties'],
                        properties: {
                            properties: {
                                type: 'object',
                                required: ['id', 'tagType', 'webTitle'],
                                properties: {
                                    id: { type: 'string' },
                                    tagType: { type: 'string' },
                                    webTitle: { type: 'string' },
                                    twitterHandle: {
                                        type: 'string',
                                        default: '',
                                    },
                                    bylineImageUrl: {
                                        type: 'string',
                                        default: '',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        Pagination: {
            type: 'object',
            required: ['currentPage', 'totalPages'],
            properties: {
                currentPage: { type: 'integer' },
                totalPages: { type: 'integer' },
                newest: { type: 'string' },
                newer: { type: 'string' },
                oldest: { type: 'string' },
                older: { type: 'string' },
            },
        },
        SubMetaLinks: {
            type: 'object',
            required: ['sectionLabels', 'keywords'],
            properties: {
                sectionLabels: {
                    type: 'array',
                    default: [],
                    items: {
                        type: 'object',
                    },
                },
                keywords: {
                    type: 'array',
                    default: [],
                    items: {
                        type: 'object',
                    },
                },
            },
        },
        Commercial: {
            type: 'object',
            required: ['editionCommercialProperties'],
            properties: {
                editionCommercialProperties: { type: 'object', default: {} },
            },
        },
        Meta: {
            type: 'object',
            required: [
                'isHosted',
                'isCommentable',
                'isImmersive',
                'shouldHideAds',
                'hasStoryPackage',
                'hasRelated',
                'linkedData',
            ],
            properties: {
                isHosted: { type: 'boolean', default: false },
                isCommentable: { type: 'boolean', default: false },
                isImmersive: { type: 'boolean', default: false },
                shouldHideAds: { type: 'boolean', default: false },
                hasStoryPackage: { type: 'boolean', default: false },
                hasRelated: { type: 'boolean', default: false },
                linkedData: { type: 'array', default: [] },
            },
        },
    },
};
