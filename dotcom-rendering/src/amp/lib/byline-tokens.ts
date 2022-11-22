export const bylineTokens = (
	byline: string,
	contributorTags: TagType[],
): string[] => {
	const titles = contributorTags.map((c) => c.title);
	const regex = new RegExp(`(${titles.join('|')})`);

	return byline.split(regex);
};
