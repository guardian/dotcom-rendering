import { joinUrl } from '@guardian/libs';
import { useApi } from '../lib/useApi';
import {
	getOptionsHeadersWithOkta,
	useSignedInAuthState,
} from '../lib/useSignedInAuthState';
import type { Props as DiscussionProps } from './Discussion';
import { Discussion } from './Discussion';

export const DiscussionWhenSignedIn = (props: DiscussionProps) => {
	const authStatus = useSignedInAuthState();
	const { discussionApiUrl } = props;

	const options = getOptionsHeadersWithOkta(authStatus);

	const { data } = useApi<{ userProfile: UserProfile }>(
		authStatus.kind !== 'Pending'
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
