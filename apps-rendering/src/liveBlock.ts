// ----- Imports ----- //

import type { Block } from '@guardian/content-api-models/v1/block';
import type { Tag } from '@guardian/content-api-models/v1/tag';
import type { Result } from '@guardian/types';
import { err, ok, OptionKind, partition } from '@guardian/types';
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
	(context: Context, tags: Tag[]) =>
	(block: Block): Result<string, LiveBlock> => {
		const firstPublishedDate = maybeCapiDate(block.firstPublishedDate);
		const lastModifiedDate = maybeCapiDate(block.lastModifiedDate);

		if (firstPublishedDate.kind === OptionKind.None) {
			return err(
				"Could not parse live block: 'firstPublishedDate' was invalid",
			);
		}

		if (lastModifiedDate.kind === OptionKind.None) {
			return err(
				"Could not parse live block: 'lastModifiedDate' was invalid",
			);
		}

		return ok({
			id: block.id,
			isKeyEvent: block.attributes.keyEvent ?? false,
			title: block.title ?? '',
			firstPublished: firstPublishedDate.value,
			lastModified: lastModifiedDate.value,
			body: parseElements(context)(block.elements),
			contributors: tagsToContributors(
				contributorTags(block.contributors, tags),
				context,
			),
			isPinned: block.attributes.pinned ?? false,
		});
	};

const parseMany =
	(context: Context) =>
	(blocks: Block[], tags: Tag[]): LiveBlock[] =>
		partition(blocks.map(parse(context, tags))).oks;

// ----- Exports ----- //

export { LiveBlock, parseMany };
