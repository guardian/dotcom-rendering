import { joinUrl } from '@guardian/libs';
import { decidePalette } from '../lib/decidePalette.ts';
import { useApi } from '../lib/useApi.tsx';
import {
	getOptionsHeadersWithOkta,
	useAuthStatus,
} from '../lib/useAuthStatus.ts';
import { useDiscussion } from '../lib/useDiscussion.ts';
import { SignedInAs } from './SignedInAs.tsx';

type Props = {
	format: ArticleFormat;
	discussionApiUrl: string;
	shortUrlId: string;
	enableDiscussionSwitch: boolean;
};

export const DiscussionMeta = ({
	format,
	discussionApiUrl,
	shortUrlId,
	enableDiscussionSwitch,
}: Props) => {
	const authStatus = useAuthStatus();

	const { commentCount, isClosedForComments } = useDiscussion(
		joinUrl(discussionApiUrl, 'discussion', shortUrlId),
	);

	const { data } = useApi<{ userProfile: UserProfile }>(
		authStatus.kind === 'SignedInWithOkta' ||
			authStatus.kind === 'SignedInWithCookies'
			? joinUrl(
					discussionApiUrl,
					'profile/me?strict_sanctions_check=false',
			  )
			: undefined,
		{},
		authStatus.kind === 'SignedInWithOkta' ||
			authStatus.kind === 'SignedInWithCookies'
			? getOptionsHeadersWithOkta(authStatus)
			: undefined,
	);

	const palette = decidePalette(format);

	return (
		<SignedInAs
			palette={palette}
			enableDiscussionSwitch={enableDiscussionSwitch}
			user={data?.userProfile}
			commentCount={commentCount}
			isClosedForComments={isClosedForComments}
		/>
	);
};
