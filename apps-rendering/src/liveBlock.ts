// ----- Imports ----- //

import type { Block } from '@guardian/content-api-models/v1/block';
import type { Tag } from '@guardian/content-api-models/v1/tag';
import type { Option } from '@guardian/types';
import type { Body } from 'bodyElement';
import { parseElements } from 'bodyElement';
import { maybeCapiDate } from 'capi';
import type { Contributor } from 'contributor';
import { tagToContributor } from 'contributor';
import type { Context } from 'parserContext';

// ----- Types ----- //

type LiveBlock = {
	id: string;
	isKeyEvent: boolean;
	title: string;
	firstPublished: Option<Date>;
	lastModified: Option<Date>;
	body: Body;
	contributors: Contributor[];
};

// ----- Functions ----- //

const contributorTags = (contributors: string[], tags: Tag[]): Tag[] => {
	const isTag = (tag: Tag | undefined): tag is Tag => tag !== undefined;
	return contributors
		.map((contributor) =>
			tags.find((tag) => tag.id === `profile/${contributor}`),
		)
		.filter(isTag);
};

const tagsToContributors = (tags: Tag[], context: Context): Contributor[] =>
	tags.map(tagToContributor(context.salt));

const parse =
	(context: Context, tags: Tag[]) =>
	(block: Block): LiveBlock => ({
		id: block.id,
		isKeyEvent: block.attributes.keyEvent ?? false,
		title: block.title ?? '',
		firstPublished: maybeCapiDate(block.firstPublishedDate),
		lastModified: maybeCapiDate(block.lastModifiedDate),
		body: parseElements(context)(block.elements),
		contributors: tagsToContributors(
			contributorTags(block.contributors, tags),
			context,
		),
	});

const parseMany =
	(context: Context) =>
	(blocks: Block[], tags: Tag[]): LiveBlock[] =>
		blocks.map(parse(context, tags));

// ----- Exports ----- //

export { LiveBlock, parseMany };
