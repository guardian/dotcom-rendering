import { isNonNullable } from '@guardian/libs';
import { isServer } from './isServer';
import { useApi } from './useApi';

const REPLACEMENT = [/^http:\/\//, 'https://'] as const;
const upgradeToHttps = (url: string) => url.replace(...REPLACEMENT);

type CommentCounts = Record<string, number>;

const getInitialSetFromDOMAttribute = (attribute: string) =>
	[...document.querySelectorAll(`[${attribute}]`)]
		.map((element) => element.getAttribute(attribute))
		.filter(isNonNullable);

const uniqueDiscussionIds = new Set<string>(
	isServer ? [] : getInitialSetFromDOMAttribute('data-discussion-id'),
);

export const useCommentCount = (
	discussionApiUrl: string,
	shortUrl: string,
): number | undefined => {
	if (!isServer) {
		uniqueDiscussionIds.add(shortUrl);
	}

	const searchParams = new URLSearchParams({
		'short-urls': [...uniqueDiscussionIds]
			.sort() // ensures identical sets produce the same query parameter
			.join(','),
	});
	const url = `${upgradeToHttps(
		discussionApiUrl,
	)}/getCommentCounts?${searchParams.toString()}`;
	const { data } = useApi<CommentCounts>(url, {
		// Discussion reponses have a long cache (~300s)
		refreshInterval: isServer ? 0 : 27_000,
	});

	return data?.[shortUrl];
};
