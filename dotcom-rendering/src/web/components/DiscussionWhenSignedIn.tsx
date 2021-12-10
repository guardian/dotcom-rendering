import { joinUrl } from '@guardian/libs';
import { Discussion } from '@frontend/web/components/Discussion';
import type { Props as DiscussionProps } from '@frontend/web/components/Discussion';
import { useApi } from '../lib/useApi';

// eslint-disable-next-line react/destructuring-assignment
export const DiscussionWhenSignedIn = (props: DiscussionProps) => {
	const { discussionApiUrl } = props;
	const { data } = useApi<UserProfile>(
		joinUrl(discussionApiUrl, 'profile/me?strict_sanctions_check=false'),
		{},
		{
			credentials: 'include',
		},
	);
	if (!data) return null;
	// eslint-disable-next-line react/jsx-props-no-spreading
	return <Discussion user={data} {...props} />;
};
