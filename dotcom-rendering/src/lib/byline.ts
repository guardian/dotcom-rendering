export const getContributorTags = (tags: TagType[]): TagType[] => {
	return tags.filter((t) => t.type === 'Contributor');
};

export const getContributorTagsForToken = (
	tags: TagType[],
	token: string,
): TagType[] => {
	return getContributorTags(tags).filter((t) => t.title === token);
};

type BylineComponent = { token: string; tag: TagType } | string;

export const getBylineComponentsFromTokens = (
	tokens: string[],
	tags: TagType[],
): BylineComponent[] => {
	const [bylineComponents] = tokens.reduce(
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
		[[], tags] as [BylineComponent[], TagType[]],
	);

	return bylineComponents;
};
