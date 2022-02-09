import { getCookie } from '@guardian/libs';
import type { Props as DiscussionProps } from 'src/web/components/Discussion';
import { Discussion } from './Discussion';
import { DiscussionWhenSignedIn } from './DiscussionWhenSignedIn';

/**
 * DiscussionContainer
 *
 * A wrapper component that decides if the user is signed in or not.
 *
 * If they
 * are, it renders DiscussionWhenSignedIn which includes an api call to fetch
 * the user profile.
 *
 * If not, it simply renders Discussion
 *
 * We use component composition like this here because you cannoy call react
 * hooks conditionally and we're using a hook to make the fetch request
 *
 * Note. We allow the ...props pattern here because it makes sense when we're
 * just passing them through
 *
 */
// eslint-disable-next-line react/destructuring-assignment
export const DiscussionContainer = (props: DiscussionProps) => {
	const isSignedIn = !!getCookie({ name: 'GU_U', shouldMemoize: true });
	// eslint-disable-next-line react/jsx-props-no-spreading
	if (isSignedIn) return <DiscussionWhenSignedIn {...props} />;
	// eslint-disable-next-line react/jsx-props-no-spreading
	return <Discussion {...props} />;
};
