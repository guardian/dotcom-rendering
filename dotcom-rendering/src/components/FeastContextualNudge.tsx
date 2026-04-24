import { css } from '@emotion/react';
import { storage } from '@guardian/libs';
import {
	from,
	headlineBold20,
	palette as sourcePalette,
	space,
	textEgyptian14,
	textEgyptian17,
	until,
} from '@guardian/source/foundations';
import {
	Button,
	LinkButton,
	SvgArrowRightStraight,
	SvgCross,
} from '@guardian/source/react-components';
import { useEffect, useState } from 'react';
import { hideSupportMessaging } from '../client/userFeatures/cookies/hideSupportMessaging';
import type { EditionId } from '../lib/edition';
import { useAB } from '../lib/useAB';

// ─── Constants ───────────────────────────────────────────────────────────────

const FEAST_NUDGE_DISMISSED_KEY = 'gu.feast-nudge.dismissed';
const DISMISS_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

/** Feast brand palette — matches FeastThrasher */
const FEAST_BG = '#f7efe9';
const FEAST_GREEN = '#68773c';
const FEAST_GREEN_HOVER = '#4d5c2b';

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Builds an Adjust go.link deep link.
 *
 * Users with the Feast app installed will be taken directly to the app;
 * users without it will be sent to the relevant App Store page.
 *
 * Once per-recipe Feast IDs are available from the `frontend` backend, add a
 * `deep_link_value` query parameter here so users land on the specific recipe.
 *
 * @see https://help.adjust.com/en/article/deep-linking
 */
const buildAppLink = (pageId: string): string => {
	const params = new URLSearchParams({
		utm_medium: 'ACQUISITIONS_NUDGE',
		utm_campaign: 'FeastContextualNudge',
		utm_content: pageId,
		utm_source: 'GUARDIAN_WEB',
	});
	return `https://guardian-feast.go.link/p0nQT?${params.toString()}`;
};

const isNudgeDismissed = (): boolean => {
	const dismissed = storage.local.get(FEAST_NUDGE_DISMISSED_KEY);
	if (typeof dismissed !== 'string') return false;
	const dismissedAt = new Date(dismissed).getTime();
	return Date.now() - dismissedAt < DISMISS_DURATION_MS;
};

const recordDismissal = (): void => {
	storage.local.set(FEAST_NUDGE_DISMISSED_KEY, new Date().toISOString());
};

// ─── Copy variants ────────────────────────────────────────────────────────────

type NudgeCopy = {
	heading: string;
	body: string;
	cta: string;
};

const getNudgeCopy = (
	isSubscriber: boolean,
	editionId: EditionId,
): NudgeCopy => {
	if (isSubscriber) {
		return {
			heading: 'Your supporter package includes Feast',
			body: 'Try Cook Mode on this recipe today — your screen stays on while you cook, hands-free.',
			cta: 'Open in the Feast app',
		};
	}

	if (editionId === 'US') {
		return {
			heading: 'Cook this recipe with the Feast app',
			body: 'Automatically convert cups, ounces and more. Plus 7,000+ recipes, Cook Mode and My Feast Collections. Try free for 14 days.',
			cta: 'Try the Feast app',
		};
	}

	return {
		heading: 'Cook this recipe with the Feast app',
		body: 'Use Cook Mode to keep your screen on while you cook, save recipes to My Feast, and explore 7,000+ Guardian recipes. Try free for 14 days.',
		cta: 'Try the Feast app',
	};
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const containerStyles = css`
	background-color: ${FEAST_BG};
	border-top: 1px solid rgba(0, 0, 0, 0.12);
	padding: ${space[4]}px ${space[3]}px;
	display: flex;
	align-items: flex-start;
	gap: ${space[3]}px;

	${from.tablet} {
		padding: ${space[5]}px ${space[5]}px;
		gap: ${space[5]}px;
	}
`;

const contentStyles = css`
	flex: 1;
`;

const headingStyles = css`
	${headlineBold20};
	color: ${sourcePalette.neutral[0]};
	margin: 0 0 ${space[2]}px;
`;

const bodyStyles = css`
	${textEgyptian14};
	color: ${sourcePalette.neutral[20]};
	margin: 0 0 ${space[4]}px;

	${from.tablet} {
		${textEgyptian17};
	}
`;

const ctaRowStyles = css`
	display: flex;
	flex-wrap: wrap;
	gap: ${space[2]}px;
	align-items: center;
`;

const ctaButtonStyles = css`
	background-color: ${FEAST_GREEN};
	color: ${sourcePalette.neutral[100]};

	:hover {
		background-color: ${FEAST_GREEN_HOVER};
	}
`;

const desktopOnlyLinkStyles = css`
	${textEgyptian14};
	color: ${sourcePalette.neutral[20]};

	${until.tablet} {
		display: none;
	}
`;

const mobileCtaStyles = css`
	${from.tablet} {
		display: none;
	}
`;

const dismissButtonStyles = css`
	flex-shrink: 0;
	margin-top: ${space[1]}px;
`;

// ─── Component ────────────────────────────────────────────────────────────────

type Props = {
	pageId: string;
	editionId: EditionId;
};

export const FeastContextualNudge = ({ pageId, editionId }: Props) => {
	/**
	 * Should be disabled by default, and only enable it if you need to do localhost testing or QA in production.
	 */
	const [isVisible, setIsVisible] = useState(true);

	const abTestAPI = useAB()?.api;

	useEffect(() => {
		const inVariant = abTestAPI?.isUserInVariant(
			'FeastContextualNudge',
			'variant',
		);
		if (!inVariant) return;
		if (isNudgeDismissed()) return;
		setIsVisible(true);
	}, [abTestAPI]);

	if (!isVisible) return null;

	const isSubscriber = hideSupportMessaging();
	const appLink = buildAppLink(pageId);
	const copy = getNudgeCopy(isSubscriber, editionId);

	const handleDismiss = () => {
		recordDismissal();
		setIsVisible(false);
	};

	return (
		<aside aria-label="Get the Feast app" css={containerStyles}>
			<div css={contentStyles}>
				<h2 css={headingStyles}>{copy.heading}</h2>
				<p css={bodyStyles}>{copy.body}</p>
				<div css={ctaRowStyles}>
					{/* Mobile: Adjust deep link that opens the app (or App Store) */}
					<LinkButton
						priority="primary"
						icon={<SvgArrowRightStraight />}
						iconSide="right"
						href={appLink}
						cssOverrides={css`
							${ctaButtonStyles}
							${mobileCtaStyles}
						`}
					>
						{copy.cta}
					</LinkButton>

					{/*
					 * Desktop: The Adjust go.link URL also works on desktop —
					 * it redirects to the appropriate App Store or a web fallback.
					 * TODO: Replace with a generated QR code image once design
					 * supplies the asset, encoding the same appLink URL.
					 */}
					<LinkButton
						priority="primary"
						icon={<SvgArrowRightStraight />}
						iconSide="right"
						href={appLink}
						cssOverrides={css`
							${ctaButtonStyles}
							${from.tablet} {
								display: inline-flex;
							}
							${until.tablet} {
								display: none;
							}
						`}
					>
						{copy.cta}
					</LinkButton>

					<span css={desktopOnlyLinkStyles}>
						Or scan the QR code on your phone to open the app
					</span>
				</div>
			</div>
			<div css={dismissButtonStyles}>
				<Button
					aria-label="Dismiss Feast app nudge"
					priority="tertiary"
					size="small"
					icon={<SvgCross />}
					hideLabel
					onClick={handleDismiss}
				>
					Dismiss
				</Button>
			</div>
		</aside>
	);
};
