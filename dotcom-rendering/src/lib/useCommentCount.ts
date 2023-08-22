import { isNonNullable } from '@guardian/libs';
import { isServer } from './isServer';
import { useApi } from './useApi';

type CommentCounts = Record<string, number>;

/**
 * **Build an initial set of discussions**
 *
 * Setting this attribute helps build an initial set of discussion IDs.
 * Without it, there is a risk that each new usage of `useCommentCount`
 * leads to a distinct request to the discussion API
 */
export const DISCUSSION_ID_DATA_ATTRIBUTE = 'data-discussion-id';

const uniqueDiscussionIds = isServer
	? undefined
	: new Set<string>(
			// create an initial set of IDs by reading what is in the DOM
			[...document.querySelectorAll(`[${DISCUSSION_ID_DATA_ATTRIBUTE}]`)]
				.map((element) =>
					element.getAttribute(DISCUSSION_ID_DATA_ATTRIBUTE),
				)
				.filter(isNonNullable),
	  );

const getUrl = (base: string, ids: Set<string> | undefined) =>
	ids
		? `${base}/getCommentCounts?${new URLSearchParams({
				'short-urls': [...ids]
					.sort() // ensures identical sets produce the same query parameter
					.join(','),
		  }).toString()}`
		: undefined;

export const useCommentCount = (
	discussionApiUrl: string,
	shortUrl: string,
): number | undefined => {
	uniqueDiscussionIds?.add(shortUrl);

	/**
	 * Generate an URL string or `undefined`,
	 * to enable conditional fetching with SWR.
	 * @see https://swr.vercel.app/docs/conditional-fetching#conditional
	 */
	const url = getUrl(discussionApiUrl, uniqueDiscussionIds);

	const { data } = useApi<CommentCounts>(url, {
		// Discussion reponses have a long cache (~300s)
		refreshInterval: 27_000,
	});

	return data?.[shortUrl];
};
