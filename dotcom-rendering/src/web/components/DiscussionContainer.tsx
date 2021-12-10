import { getCookie } from '@guardian/libs';
import { Discussion } from '@frontend/web/components/Discussion';
import { DiscussionWhenSignedIn } from '@frontend/web/components/DiscussionWhenSignedIn';
import type { Props as DiscussionProps } from '@frontend/web/components/Discussion';

// eslint-disable-next-line react/destructuring-assignment
export const DiscussionContainer = (props: DiscussionProps) => {
	const isSignedIn =
		typeof window !== 'undefined' &&
		!!getCookie({ name: 'GU_U', shouldMemoize: true });
	// eslint-disable-next-line react/jsx-props-no-spreading
	if (isSignedIn) return <DiscussionWhenSignedIn {...props} />;
	// eslint-disable-next-line react/jsx-props-no-spreading
	return <Discussion {...props} />;
};
