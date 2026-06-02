import { css } from '@emotion/react';
import type { Breakpoint } from '@guardian/source/foundations';
import { from, space } from '@guardian/source/foundations';
import { useEffect, useRef } from 'react';
import {
	AB_TEST_NAME,
	NEWSLETTER_SIGNUP_COMPONENT_ID,
	sendNewsletterSignupEvent,
} from '../../lib/newsletterSignupTracking';
import { useIsSignedIn } from '../../lib/useAuthStatus';
import { useNewsletterSubscription } from '../../lib/useNewsletterSubscription';
import { palette } from '../../palette';
import type { DCRFrontCardNewsletter } from '../../types/front';
import { useConfig } from '../ConfigContext';
import { NewsletterHighlightsCard } from '../NewsletterHighlightsCard';
import { NewsletterSignupForm } from '../NewsletterSignupForm.island';
import { Placeholder } from '../Placeholder';

type Props = {
	newsletter: DCRFrontCardNewsletter;
	dataLinkName: string;
	idApiUrl: string;
	hideNewsletterSignupComponentForSubscribers: boolean;
};

const PLACEHOLDER_HEIGHTS = new Map<Breakpoint, number>([
	['mobile', 220],
	['tablet', 180],
	['desktop', 180],
]);

const containerStyles = css`
	display: flex;
	flex-direction: column;
	height: 100%;
	position: relative;
	padding: ${space[2]}px;
	background-color: ${palette('--highlights-card-background')};
	word-break: break-word;

	${from.tablet} {
		width: 280px;
		padding: 10px;
	}
	${from.desktop} {
		width: 300px;
	}
`;

export const HighlightsNewsletterSignupCard = ({
	newsletter,
	dataLinkName,
	idApiUrl,
	hideNewsletterSignupComponentForSubscribers,
}: Props) => {
	const { renderingTarget } = useConfig();
	const isSignedIn = useIsSignedIn();
	const isSubscribed = useNewsletterSubscription(
		newsletter.listId,
		idApiUrl,
		hideNewsletterSignupComponentForSubscribers,
	);
	const viewFiredRef = useRef(false);

	useEffect(() => {
		if (
			isSubscribed === undefined ||
			isSubscribed ||
			viewFiredRef.current
		) {
			return;
		}

		viewFiredRef.current = true;
		sendNewsletterSignupEvent({
			action: 'VIEW',
			identityName: newsletter.identityName,
			componentId: NEWSLETTER_SIGNUP_COMPONENT_ID.variant(
				newsletter.identityName,
			),
			renderingTarget,
			value: {
				eventDescription: 'newsletter-signup-viewed',
			},
			abTest: { name: AB_TEST_NAME, variant: 'variant' },
		});
	}, [isSubscribed, newsletter.identityName, renderingTarget]);

	if (isSubscribed === undefined) {
		return (
			<div css={containerStyles} data-link-name={dataLinkName}>
				<Placeholder heights={PLACEHOLDER_HEIGHTS} />
			</div>
		);
	}

	return (
		<div css={containerStyles} data-link-name={dataLinkName}>
			<NewsletterHighlightsCard
				highlightCardTitle={
					newsletter.highlightCardTitle ??
					`Sign up to ${newsletter.name}`
				}
				onClick={() => undefined}
				illustrationSquare={newsletter.illustrationSquare}
			/>
			<NewsletterSignupForm
				newsletterId={newsletter.identityName}
				newsletterName={newsletter.name}
				frequency={newsletter.frequency}
				hidePrivacyMessage={isSignedIn === true}
				isAlreadySubscribed={isSubscribed}
				abTest={{ name: AB_TEST_NAME, variant: 'variant' }}
			/>
		</div>
	);
};
