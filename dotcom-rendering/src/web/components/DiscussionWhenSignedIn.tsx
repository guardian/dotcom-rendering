import { joinUrl } from '@guardian/libs';
import type { Props as DiscussionProps } from 'src/web/components/Discussion';
import { Discussion } from './Discussion';
import { useApi } from '../lib/useApi';

// eslint-disable-next-line react/destructuring-assignment
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
	// eslint-disable-next-line react/jsx-props-no-spreading
	return <Discussion user={data.userProfile} {...props} />;
};
