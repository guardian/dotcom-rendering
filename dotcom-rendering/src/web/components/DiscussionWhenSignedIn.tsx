import { Discussion } from '@frontend/web/components/Discussion';
import type { Props as DiscussionProps } from '@frontend/web/components/Discussion';
import { useApi } from '../lib/useApi';
import { joinUrl } from '@guardian/libs';

export const DiscussionWhenSignedIn = (props: DiscussionProps) => {
	const { data } = useApi<UserProfile>(
		joinUrl(
			props.discussionApiUrl,
			'profile/me?strict_sanctions_check=false',
		),
	);
	if (!data) return null;
	return <Discussion user={data} {...props} />;
};
