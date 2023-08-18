import { isNonNullable } from '@guardian/libs';
import { isServer } from './isServer';
import { useApi } from './useApi';

type CommentCounts = Record<string, number>;

const DATA_ATTRIBUTE = 'data-discussion-id';

const uniqueDiscussionIds = isServer
	? undefined
	: new Set<string>(
			// create an initial set of IDs by reading what is in the DOM
			[...document.querySelectorAll(`[${DATA_ATTRIBUTE}]`)]
				.map((element) => element.getAttribute(DATA_ATTRIBUTE))
				.filter(isNonNullable),
	  );

const getUrl = (base: string) =>
	uniqueDiscussionIds
		? `${base}/getCommentCounts?${new URLSearchParams({
				'short-urls': [...uniqueDiscussionIds]
					.sort() // ensures identical sets produce the same query parameter
					.join(','),
		  }).toString()}`
		: undefined;

export const useCommentCount = (
	discussionApiUrl: string,
	shortUrl: string,
): number | undefined => {
	uniqueDiscussionIds?.add(shortUrl);

	const { data } = useApi<CommentCounts>(getUrl(discussionApiUrl), {
		// Discussion reponses have a long cache (~300s)
		refreshInterval: 27_000,
	});

	return data?.[shortUrl];
};
