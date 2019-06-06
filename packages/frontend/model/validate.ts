import Ajv from 'ajv';

export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'Validation Error';
    }
}

// enpoint can be used to reference matching schema
export const validateRequestData = (data: any, endpoint: string) => {
    const schema = {
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
                    'contentType', // scala option?
                    'subMetaLinks',
                    'commercial',
                    'meta',
                ],
                properties: {
                    content: {
                        type: 'object',
                        required: [
                            'headline',
                            'standfirst',
                            'main',
                            'blocks',
                            'byline',
                            'trailText',
                        ],
                        properties: {
                            headline: { type: 'string', minLength: 1 }, //
                            standfirst: { type: 'string' },
                            main: { type: 'string' },
                            body: { type: 'string' },
                            blocks: {
                                // todo
                                type: 'object',
                                required: ['body', 'keyEvents', 'main'],
                                properties: {
                                    body: {
                                        type: 'array',
                                        items: {},
                                    },
                                    keyEvents: {
                                        type: 'array',
                                    },
                                    main: {
                                        type: 'object',
                                        items: {},
                                    },
                                },
                            },
                            byline: { type: 'string' },
                            trailText: { type: 'string' }, //
                        },
                    },
                    tags: {
                        type: 'object',
                        required: ['all'],
                        properties: {
                            all: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    required: ['properties'],
                                    properties: {
                                        properties: {
                                            type: 'object',
                                            required: [
                                                'id',
                                                'tagType',
                                                'webTitle',
                                            ],
                                            properties: {
                                                id: { type: 'string' },
                                                tagType: { type: 'string' },
                                                webTitle: { type: 'string' },
                                                twitterHandle: {
                                                    type: 'string',
                                                },
                                                bylineImageUrl: {
                                                    type: 'string',
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    // author: { type: 'string', minLength: 1 }, // not used
                    pageId: {
                        type: 'string',
                        format: 'uri-reference',
                        minLength: 1,
                    }, // why this pass with uri
                    pillar: {
                        // option
                        type: 'string',
                        enum: [
                            'News',
                            'Opinion',
                            'Sport',
                            'Culture',
                            'Lifestyle',
                        ],
                    },
                    pagination: {
                        // optional!
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
                    webPublicationDate: { type: 'integer' }, // TODO timestamp
                    webPublicationDateDisplay: { type: 'string' }, // TODO  format
                    section: { type: 'string', minLength: 1 }, // option
                    sectionLabel: { type: 'string' }, //
                    sectionUrl: {
                        //
                        type: 'string',
                        format: 'uri-reference',
                    },
                    webTitle: { type: 'string', minLength: 1 }, //
                    contendId: {
                        // option
                        type: 'string',
                        format: 'uri-reference',
                        minLength: 1,
                    }, // why this pass with uri
                    editionId: {
                        type: 'string',
                        enum: ['UK', 'US', 'AU', 'INTL'],
                    },
                    edition: { type: 'string' },
                    webURL: { type: 'string', format: 'uri', minLength: 1 }, //
                    contentType: { type: 'string', pattern: 'Article' }, // option
                    starRating: { type: 'integer', minimum: 0, maximum: 5 }, // optional!!
                    subMetaLinks: {
                        //
                        type: 'object',
                        required: ['sectionLabels', 'keywords'],
                        properties: {
                            sectionLabels: {
                                type: 'array',
                                items: {
                                    type: 'object', // TODO
                                },
                            }, // non empty>
                            keywords: {
                                type: 'array',
                                items: {
                                    type: 'object', // TODO
                                },
                            }, // non empty?
                        },
                    },
                    commercial: {
                        type: 'object',
                        required: ['editionCommercialProperties'],
                        properties: {
                            editionCommercialProperties: { type: 'object' }, //
                        },
                    },
                    meta: {
                        type: 'object',
                        required: [
                            'isCommentable',
                            'isImmersive',
                            'shouldHideAds',
                            'hasStoryPackage',
                            'hasRelated',
                        ],
                        properties: {
                            isCommentable: { type: 'boolean' },
                            isImmersive: { type: 'boolean' },
                            shouldHideAds: { type: 'boolean' },
                            hasStoryPackage: { type: 'boolean' },
                            hasRelated: { type: 'boolean' },
                        },
                    },
                },
            },
            site: {
                type: 'object',
                required: ['beaconUrl', 'guardianBaseURL'],
                properties: {
                    beaconUrl: {
                        type: 'string',
                        format: 'uri-reference',
                        minLength: 1,
                    }, // non empty
                    guardianBaseURL: {
                        type: 'string',
                        format: 'uri',
                        minLength: 1,
                    }, // non empty
                },
            },
            version: { type: 'integer' },
        },
    };

    const options = {
        verbose: true,
        allErrors: true,
    };

    const ajv = new Ajv(options);
    const isValid = ajv.validate(schema, data);

    if (!isValid) {
        throw new ValidationError(
            `Could not validate ${endpoint} request for ${
            data.page.pageId
            }.\n ${JSON.stringify(ajv.errors, null, 2)}`,
        );
    }
    return isValid;
};
