interface ContributorTag extends TagType {
	type: 'Contributor';
}

export const isContributor = (tag: TagType): tag is ContributorTag =>
	tag.type === 'Contributor';

/**
 * Get the sole contributor on an article.
 *
 * This can be used to display more information about them,
 * such as their picture, bio or social media handle.
 *
 * An article has a sole contributor only if all of the following are true:
 * - there is a byline which is not an empty string
 * - the byline does not include the word “and”
 * - there is a `Contributor` tag whose title is included in the byline
 *
 * @returns A sole contributor if there is one, `undefined` otherwise.
 */
export const getSoleContributor = (
	tags: TagType[],
	byline: string | undefined,
): ContributorTag | undefined => {
	if (!byline) return undefined;
	if (byline.includes(' and ')) return undefined;

	const soleContributor = tags
		.filter(isContributor)
		.find(({ title }) => byline.includes(title));

	return soleContributor;
};

export const getContributorTagsForToken = (
	tags: TagType[],
	token: string,
): ContributorTag[] => {
	return tags.filter(isContributor).filter((t) => t.title === token);
};

type BylineComponent = { token: string; tag: TagType } | string;

export const getBylineComponentsFromTokens = (
	tokens: string[],
	tags: TagType[],
): BylineComponent[] => {
	const [bylineComponents] = tokens.reduce<[BylineComponent[], TagType[]]>(
		([bylines, remainingTags], token) => {
			const [firstContributorTag] = getContributorTagsForToken(
				remainingTags,
				token,
			);
			if (!firstContributorTag) {
				return [bylines.concat(token), remainingTags];
			}

			// We've used this tag, so remove it from the list of possible tags.
			// This ensures we don't use the same contributor tag when two identical
			// names with different contributor tags are used.
			const newRemainingTags = remainingTags.filter(
				(tag) => !(tag.id === firstContributorTag.id),
			);

			return [
				bylines.concat({ tag: firstContributorTag, token }),
				newRemainingTags,
			];
		},
		[[], tags],
	);

	return bylineComponents;
};
