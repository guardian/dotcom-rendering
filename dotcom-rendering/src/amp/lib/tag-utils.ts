export const filterForTagsOfType = (
	tags: TagType[],
	tagType: string,
): TagType[] => {
	return tags.filter(
		(tag) =>
			tag.type === tagType ||
			(tag.type === 'PaidContent' && tag.paidContentType === tagType),
	);
};
