import { joinUrl } from '@guardian/libs';
import type { Props as DiscussionProps } from '../../web/components/Discussion';
import { useApi } from '../lib/useApi';
import { Discussion } from './Discussion';

export const DiscussionWhenSignedIn = (props: DiscussionProps) => {
	const { discussionApiUrl } = props;
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
