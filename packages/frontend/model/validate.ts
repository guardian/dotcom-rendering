import Ajv from 'ajv';

export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'Validation Error';
    }
}

// enpoint can be used to reference matching schema
export const validateRequestData = (data: any, endpoint: string) => {

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

const schema = {
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
                'section', // scala option
                'edition',
                'editionId',
                'pageId',
                'pillar', // scala option
                'webPublicationDate',
                'webPublicationDateDisplay',
                'sectionLabel',
                'sectionUrl',
                'webTitle',
                'webURL',
                'contentType', // scala option
                'subMetaLinks',
                'commercial',
                'meta',
            ],
            properties: {
                content: { $ref: '#/definitions/Content' },
                tags: { $ref: '#/definitions/Tags' },
                pageId: { type: 'string', format: 'uri-reference', minLength: 1 },
                pillar: { type: 'string', enum: ['News', 'Opinion', 'Sport', 'Culture', 'Lifestyle', 'Arts'] }, // scala option
                pagination: { $ref: '#/definitions/Pagination' }, // scala option / optional
                webPublicationDate: { type: 'integer' }, // TODO format?
                webPublicationDateDisplay: { type: 'string' }, // TODO format?
                section: { type: 'string', minLength: 1 }, // scala option
                sectionLabel: { type: 'string' },
                sectionUrl: { type: 'string', format: 'uri-reference' },
                webTitle: { type: 'string', minLength: 1 },
                contendId: { type: 'string', format: 'uri-reference', minLength: 1 }, // scala option
                editionId: { type: 'string', enum: ['UK', 'US', 'AU', 'INTL'] },
                edition: { type: 'string' },
                webURL: { type: 'string', format: 'uri', minLength: 1 },
                contentType: { type: 'string', pattern: 'Article' }, // scala option
                starRating: { type: 'integer', minimum: 0, maximum: 5 }, // scala option / optional
                subMetaLinks: { $ref: '#/definitions/SubMetaLinks' },
                commercial: { $ref: '#/definitions/Commercial' },
                meta: { $ref: '#/definitions/Meta' },
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
                },
                guardianBaseURL: {
                    type: 'string',
                    format: 'uri',
                    minLength: 1,
                },
            },
        },
        version: { type: 'integer' },
    },
    additonalProperties: false,
    definitions: {
        Content: {
            type: 'object',
            required: [
                'headline',
                'standfirst', // scala option
                'main',
                'blocks',
                'byline',
                'trailText',
            ],
            properties: {
                headline: { type: 'string', minLength: 1 },
                standfirst: { type: 'string' },
                main: { type: 'string' },
                body: { type: 'string' },
                blocks: {
                    type: 'object',
                    required: ['body', 'keyEvents'],
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
                trailText: { type: 'string' },
            },
        },
        Tags: {
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
                                required: ['id', 'tagType', 'webTitle'],
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
                    items: {
                        type: 'object',
                    },
                },
                keywords: {
                    type: 'array',
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
                editionCommercialProperties: { type: 'object' },
            },
        },
        Meta: {
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
    }
};




