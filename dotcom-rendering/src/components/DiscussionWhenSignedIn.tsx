import { joinUrl } from '@guardian/libs';
import { useApi } from '../lib/useApi';
import type { Props as DiscussionProps } from './Discussion';
import { Discussion } from './Discussion';

export const DiscussionWhenSignedIn = (props: DiscussionProps) => {
	const { discussionApiUrl } = props;

	// TODO OKTA: Discussion API call to migrate to use access token
	const { data } = useApi<{ userProfile: UserProfile }>(
		joinUrl(discussionApiUrl, 'profile/me?strict_sanctions_check=false'),
		{},
		{
			credentials: 'include',
		},
	);
	if (!data) return null;

	return <Discussion user={data.userProfile} {...props} />;
};
