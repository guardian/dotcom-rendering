import type { Atoms } from '@guardian/content-api-models/v1/atoms';
import type { BlockElement } from '@guardian/content-api-models/v1/blockElement';
import type { Content } from '@guardian/content-api-models/v1/content';
import { ContentType } from '@guardian/content-api-models/v1/contentType';

const articleContent = {
	id: '',
	type: ContentType.ARTICLE,
	webTitle: '',
	webUrl: '',
	apiUrl: '',
	tags: [],
	references: [],
	isHosted: false,
};

export const articleContentWith = (
	element: BlockElement,
	atoms?: Atoms,
): Content => ({
	...articleContent,
	atoms,
	blocks: {
		body: [
			{
				id: '',
				bodyHtml: '',
				bodyTextSummary: '',
				attributes: {},
				published: true,
				contributors: [],
				elements: [element],
			},
		],
	},
});

export const articleMainContentWith = (element: BlockElement): Content => ({
	...articleContent,
	blocks: {
		main: {
			id: '',
			bodyHtml: '',
			bodyTextSummary: '',
			attributes: {},
			published: true,
			contributors: [],
			elements: [element],
		},
	},
});
