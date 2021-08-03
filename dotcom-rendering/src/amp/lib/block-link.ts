export const blockLink = (url: string, blockID: string): string => {
	return `${url}?page=with:block-${blockID}#block-${blockID}`;
};
