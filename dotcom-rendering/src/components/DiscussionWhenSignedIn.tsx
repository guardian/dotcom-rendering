import { joinUrl } from '@guardian/libs';
import { useApi } from '../lib/useApi';
import {
	getOptionsHeadersWithOkta,
	useSignedInAuthState,
} from '../lib/useSignedInAuthState';
import type { Props as DiscussionProps } from './Discussion';
import { Discussion } from './Discussion';

export const DiscussionWhenSignedIn = (props: DiscussionProps) => {
	const [status, authState] = useSignedInAuthState();
	const { discussionApiUrl } = props;

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
	if (!data) return null;

	return <Discussion user={data.userProfile} {...props} />;
};
