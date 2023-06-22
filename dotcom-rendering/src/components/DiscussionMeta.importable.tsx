import { joinUrl } from '@guardian/libs';
import { decidePalette } from '../lib/decidePalette';
import { useApi } from '../lib/useApi';
import { useDiscussion } from '../lib/useDiscussion';
import {
	getOptionsHeadersWithOkta,
	useSignedInAuthState,
} from '../lib/useSignedInAuthState';
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
	const [status, authState] = useSignedInAuthState();

	const { commentCount, isClosedForComments } = useDiscussion(
		joinUrl(discussionApiUrl, 'discussion', shortUrlId),
	);

	const options = getOptionsHeadersWithOkta(status, authState);

	const { data } = useApi<{ userProfile: UserProfile }>(
		status !== 'Pending'
			? joinUrl(
					discussionApiUrl,
					'profile/me?strict_sanctions_check=false',
			  )
			: undefined,
		{},
		options,
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
