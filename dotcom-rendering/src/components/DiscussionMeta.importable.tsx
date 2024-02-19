import { joinUrl } from '@guardian/libs';
import type { GetDiscussionSuccess, UserProfile } from '../lib/discussion';
import { getOptionsHeadersWithOkta } from '../lib/identity';
import { useApi } from '../lib/useApi';
import { useAuthStatus } from '../lib/useAuthStatus';
import { useCommentCount } from '../lib/useCommentCount';
import { SignedInAs } from './SignedInAs';

type Props = {
	discussionApiUrl: string;
	shortUrlId: string;
	enableDiscussionSwitch: boolean;
};

export const DiscussionMeta = ({
	discussionApiUrl,
	shortUrlId,
	enableDiscussionSwitch,
}: Props) => {
	const authStatus = useAuthStatus();
	const commentCount = useCommentCount(discussionApiUrl, shortUrlId);

	const { data: discussionData } = useApi<GetDiscussionSuccess>(
		joinUrl(discussionApiUrl, 'discussion', shortUrlId),
		{
			// The default for dedupingInterval is 2 seconds but we want to wait longer here because the cache time
			// for a discussion is at least 15 seconds
			dedupingInterval: 8000,
		},
	);

	const { data: userData } = useApi<{ userProfile: UserProfile }>(
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
			user={userData?.userProfile}
			commentCount={commentCount}
			isClosedForComments={discussionData?.discussion.isClosedForComments}
		/>
	);
};
