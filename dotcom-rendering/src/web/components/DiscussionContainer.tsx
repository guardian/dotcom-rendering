import { Discussion } from '@frontend/web/components/Discussion';
import { DiscussionWhenSignedIn } from '@frontend/web/components/DiscussionWhenSignedIn';
import type { Props as DiscussionProps } from '@frontend/web/components/Discussion';
import { getCookie } from '@guardian/libs';

export const DiscussionContainer = (props: DiscussionProps) => {
	const isSignedIn = !!getCookie({ name: 'GU_U', shouldMemoize: true });

	if (isSignedIn) return <DiscussionWhenSignedIn {...props} />;
	return <Discussion {...props} />;
};
