import { joinUrl } from '@guardian/libs';
import { useApi } from '../lib/useApi';
import type {
	SignedInWithCookies,
	SignedInWithOkta,
} from '../lib/useAuthStatus';
import { getOptionsHeadersWithOkta } from '../lib/useAuthStatus';
import type { Props as DiscussionProps } from './Discussion';
import { Discussion } from './Discussion';

type Props = DiscussionProps & {
	authStatus: SignedInWithOkta | SignedInWithCookies;
};

export const DiscussionWhenSignedIn = ({ authStatus, ...props }: Props) => {
	const { discussionApiUrl } = props;

	const options = getOptionsHeadersWithOkta(authStatus);

	const { data } = useApi<{ userProfile: UserProfile }>(
		joinUrl(discussionApiUrl, 'profile/me?strict_sanctions_check=false'),
		{},
		options,
	);

	const user = data ? { profile: data.userProfile, authStatus } : undefined;

	return <Discussion user={user} {...props} />;
};
