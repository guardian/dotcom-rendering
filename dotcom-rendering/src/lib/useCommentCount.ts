import { isNonNullable, isObject } from '@guardian/libs';
import { useEffect, useState } from 'react';
import { useApi } from './useApi';

/**
 * **Build an initial set of discussions**
 *
 * Setting this attribute helps build an initial set of discussion IDs.
 * Without it, there is a risk that each new usage of `useCommentCount`
 * leads to a distinct request to the discussion API
 */
export const DISCUSSION_ID_DATA_ATTRIBUTE = 'data-discussion-id';

/**
 * We only want to create this set on a client, never on the server
 */
let uniqueDiscussionIds: Set<string> | undefined;

/**
 * Create an initial set of IDs by reading what is in the DOM
 */
const getInitialIds = () =>
	[...document.querySelectorAll(`[${DISCUSSION_ID_DATA_ATTRIBUTE}]`)]
		.map((element) => element.getAttribute(DISCUSSION_ID_DATA_ATTRIBUTE))
		.filter(isNonNullable);

export const useCommentCount = (
	discussionApiUrl: string,
	shortUrl: string,
): number | undefined => {
	// A falsy value prevents fetching: https://swr.vercel.app/docs/conditional-fetching#conditional
	const [url, setUrl] = useState<string>();

	useEffect(() => {
		uniqueDiscussionIds ??= new Set(getInitialIds());
		uniqueDiscussionIds.add(shortUrl);

		const getCommentCountUrl = `${discussionApiUrl}/getCommentCounts?${new URLSearchParams(
			{
				'short-urls': [...uniqueDiscussionIds]
					.sort() // ensures identical sets produce the same query parameter
					.join(','),
			},
		).toString()}`;

		setUrl(getCommentCountUrl);
	}, [discussionApiUrl, shortUrl]);

	const { data } = useApi<unknown>(url);

	/**
	 * As per the endpoint, but let’s parse it
	 * @see https://github.com/guardian/discussion-api/blob/73e805641f509c79d12f207aeb50c3f1fb58c886/discussion-api/src/main/scala/com.gu.discussion.api/repository/Discussion.scala#L233
	 */
	const count = isObject(data) ? data[shortUrl] : undefined;
	return typeof count === 'number' ? count : undefined;
};

/** Ensure that we reduce the number of requests to get comment counts */
export const addDiscussionIds = (ids: string[]): void => {
	if (!uniqueDiscussionIds) return;
	for (const id of ids) {
		uniqueDiscussionIds.add(id);
	}
};
