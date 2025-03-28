import { isObject, joinUrl } from '@guardian/libs';
import { useEffect, useState } from 'react';
import type { SignedInUser, UserProfile } from '../lib/discussion';
import {
	addUserName,
	comment,
	pickComment,
	recommend,
	reply,
	reportAbuse,
	unPickComment,
} from '../lib/discussionApi';
import type { SignedIn } from '../lib/identity';
import { getOptionsHeaders } from '../lib/identity';
import { useAuthStatus } from '../lib/useAuthStatus';
import { useHydrated } from '../lib/useHydrated';
import type { Props as DiscussionProps } from './Discussion';
import { Discussion } from './Discussion';
import { Placeholder } from './Placeholder';

const getUser = async ({
	discussionApiUrl,
	authStatus,
}: {
	discussionApiUrl: string;
	authStatus: SignedIn;
}): Promise<SignedInUser | undefined> => {
	const data: unknown = await fetch(
		joinUrl(discussionApiUrl, 'profile/me?strict_sanctions_check=false'),
		getOptionsHeaders(authStatus),
	)
		.then((r) => r.json())
		.catch(() => undefined);

	if (!isObject(data)) return;
	if (!isObject(data.userProfile)) return;

	const profile = data.userProfile as unknown as UserProfile;

	const isStaff = profile.badge.some((e) => e.name === 'Staff');

	return isStaff
		? {
				kind: 'Staff',
				profile,
				onComment: comment(authStatus),
				onReply: reply(authStatus),
				onRecommend: recommend(authStatus),
				onPick: pickComment(authStatus),
				onUnpick: unPickComment(authStatus),
				addUsername: addUserName(authStatus),
				reportAbuse: reportAbuse(authStatus),
		  }
		: {
				kind: 'Reader',
				profile,
				onComment: comment(authStatus),
				onReply: reply(authStatus),
				onRecommend: recommend(authStatus),
				addUsername: addUserName(authStatus),
				reportAbuse: reportAbuse(authStatus),
		  };
};

/**
 * A wrapper component that decides if the user is signed in or not.
 *
 * If they are, it renders `DiscussionWhenSignedIn` which includes
 * an API call to fetch the user profile.
 *
 * If not, it simply renders `Discussion`
 *
 * We use component composition like this here because you cannot call react
 * hooks conditionally and we're using a hook to make the fetch request
 *
 * Note. We allow the ...props pattern here because it makes sense when we're
 * just passing them through
 *
 * ## Why does this need to be an Island?
 *
 * Discussion has client-side interactivity.
 * Signed-in status is only known on the client.
 *
 * ---
 *
 * (No visual story exist)
 */
export const DiscussionWeb = (
	props: Omit<DiscussionProps, 'user' | 'reportAbuseUnauthenticated'>,
) => {
	const hydrated = useHydrated();
	const authStatus = useAuthStatus();
	const [user, setUser] = useState<SignedInUser>();

	useEffect(() => {
		if (authStatus.kind === 'Pending') return;
		if (authStatus.kind === 'SignedOut') return;

		getUser({ discussionApiUrl: props.discussionApiUrl, authStatus })
			.then(setUser)
			.catch(() => {
				// do nothing
			});
	}, [authStatus, props.discussionApiUrl]);

	if (!hydrated) return <Placeholder height={324} />;

	return (
		<Discussion
			user={user}
			{...props}
			reportAbuseUnauthenticated={reportAbuse(undefined)}
		/>
	);
};
