import { useAuthStatus } from '../lib/useAuthStatus';
import { useHydrated } from '../lib/useHydrated';
import type { Props as DiscussionProps } from './Discussion';
import { Discussion } from './Discussion';
import { DiscussionWhenSignedIn } from './DiscussionWhenSignedIn';
import { Placeholder } from './Placeholder';

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

export const DiscussionContainer = (props: DiscussionProps) => {
	const hydrated = useHydrated();
	const authStatus = useAuthStatus();

	if (!hydrated) return <Placeholder height={324} />;

	const isSignedIn =
		authStatus.kind === 'SignedInWithOkta' ||
		authStatus.kind === 'SignedInWithCookies';
	if (isSignedIn) {
		return <DiscussionWhenSignedIn authStatus={authStatus} {...props} />;
	}

	return <Discussion {...props} />;
};
