import { joinUrl } from '@guardian/libs';
import { decidePalette } from '../lib/decidePalette';
import { getOptionsHeadersWithOkta } from '../lib/identity';
import { useApi } from '../lib/useApi';
import { useAuthStatus } from '../lib/useAuthStatus';
import { useDiscussion } from '../lib/useDiscussion';
import { SignedInAs } from './SignedInAs';

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

	return (
		<SignedInAs
			enableDiscussionSwitch={enableDiscussionSwitch}
			user={data?.userProfile}
			commentCount={commentCount}
			isClosedForComments={isClosedForComments}
		/>
	);
};
