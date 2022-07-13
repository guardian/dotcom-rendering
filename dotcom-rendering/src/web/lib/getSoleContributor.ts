type ContributorTag = TagType & {
	type: 'Contributor';
};

const isContributor = (tag: TagType): tag is ContributorTag =>
	tag.type === 'Contributor';

/**
 * Get the sole contributor of an article.
 * This only works if all of the following are true:
 * - there is only one `Contributor` tag
 * - that tag’s `title` is the same as the article byline
 *
 * @returns A sole contributor if there is one, undefined otherwise.
 */
const getSoleContributor = (
	tags: TagType[],
	byline?: string,
): ContributorTag | undefined => {
	const [soleContributor, ...otherContributors] = tags.filter(isContributor);

	if (otherContributors.length !== 0) return undefined;
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- it could be undefined
	if (soleContributor?.title !== byline) return undefined;

	return soleContributor;
};

export { isContributor, getSoleContributor };
