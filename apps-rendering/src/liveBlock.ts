// ----- Imports ----- //

import type { Campaign } from '@guardian/apps-rendering-api-models/campaign';
import type { Block } from '@guardian/content-api-models/v1/block';
import type { Tag } from '@guardian/content-api-models/v1/tag';
import { OptionKind } from '../vendor/@guardian/types/index';
import type { Body } from 'bodyElement';
import { parseElements } from 'bodyElement';
import { maybeCapiDate } from 'capi';
import type { Contributor } from 'contributor';
import { tagToContributor } from 'contributor';
import { Optional } from 'optional';
import type { Context } from 'parserContext';
import { Result } from 'result';

// ----- Types ----- //

type LiveBlock = {
	id: string;
	isKeyEvent: boolean;
	title: Optional<string>;
	firstPublished: Date;
	lastModified: Date;
	body: Body;
	contributors: Contributor[];
	isPinned: boolean;
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
	(context: Context, tags: Tag[], campaigns: Campaign[]) =>
	(block: Block): Result<string, LiveBlock> => {
		const firstPublishedDate = maybeCapiDate(block.firstPublishedDate);
		const lastModifiedDate = maybeCapiDate(block.lastModifiedDate);

		if (firstPublishedDate.kind === OptionKind.None) {
			return Result.err(
				"Could not parse live block: 'firstPublishedDate' was invalid",
			);
		}

		if (lastModifiedDate.kind === OptionKind.None) {
			return Result.err(
				"Could not parse live block: 'lastModifiedDate' was invalid",
			);
		}

		return Result.ok({
			id: block.id,
			isKeyEvent: block.attributes.keyEvent ?? false,
			title: Optional.fromNullable(block.title),
			firstPublished: firstPublishedDate.value,
			lastModified: lastModifiedDate.value,
			body: Result.partition(
				parseElements(context, campaigns)(block.elements),
			).oks,
			contributors: tagsToContributors(
				contributorTags(block.contributors, tags),
				context,
			),
			isPinned: block.attributes.pinned ?? false,
		});
	};

const parseMany =
	(context: Context) =>
	(blocks: Block[], tags: Tag[], campaigns: Campaign[]): LiveBlock[] =>
		Result.partition(blocks.map(parse(context, tags, campaigns))).oks;

// ----- Exports ----- //

export { LiveBlock, parseMany };
