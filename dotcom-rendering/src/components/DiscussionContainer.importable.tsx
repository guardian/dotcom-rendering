import { isObject, joinUrl } from '@guardian/libs';
import { useEffect, useState } from 'react';
import {
	comment,
	pickComment,
	recommend,
	reply,
	unPickComment,
} from '../lib/discussionApi';
import type { SignedInWithCookies, SignedInWithOkta } from '../lib/identity';
import { getOptionsHeadersWithOkta } from '../lib/identity';
import { useAuthStatus } from '../lib/useAuthStatus';
import { useHydrated } from '../lib/useHydrated';
import type { SignedInUser, UserProfile } from '../types/discussion';
import type { Props as DiscussionProps } from './Discussion';
import { Discussion } from './Discussion';
import { Placeholder } from './Placeholder';

const getUser = async ({
	discussionApiUrl,
	authStatus,
}: {
	discussionApiUrl: string;
	authStatus: SignedInWithCookies | SignedInWithOkta;
}): Promise<SignedInUser | undefined> => {
	const data: unknown = await fetch(
		joinUrl(discussionApiUrl, 'profile/me?strict_sanctions_check=false'),
		getOptionsHeadersWithOkta(authStatus),
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
				authStatus,
		  }
		: {
				kind: 'Reader',
				profile,
				onComment: comment(authStatus),
				onReply: reply(authStatus),
				onRecommend: recommend(authStatus),
				authStatus,
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
export const DiscussionContainer = (props: Omit<DiscussionProps, 'user'>) => {
	const hydrated = useHydrated();
	const authStatus = useAuthStatus();
	const [user, setUser] = useState<SignedInUser>();

	useEffect(() => {
		if (authStatus.kind === 'Pending') return;
		if (authStatus.kind === 'SignedOutWithCookies') return;
		if (authStatus.kind === 'SignedOutWithOkta') return;

		getUser({ discussionApiUrl: props.discussionApiUrl, authStatus })
			.then(setUser)
			.catch(() => {
				// do nothing
			});
	}, [authStatus, props.discussionApiUrl]);

	if (!hydrated) return <Placeholder height={324} />;

	return <Discussion user={user} {...props} />;
};
