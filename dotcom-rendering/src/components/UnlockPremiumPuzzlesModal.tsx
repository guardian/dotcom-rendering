import { css, type SerializedStyles } from '@emotion/react';
import {
	headlineMedium24,
	palette as sourcePalette,
	space,
	textEgyptian17,
	textEgyptianBold17,
	textSans14,
	textSansBold14,
	until,
} from '@guardian/source/foundations';
import {
	LinkButton,
	SvgGuardianLogo,
	SvgTickRound,
	themeButtonReaderRevenue,
} from '@guardian/source/react-components';
import { useEffect, useRef, useState } from 'react';
import { getZIndex } from '../lib/getZIndex';
import {
	getModalMaxHeight,
	MODAL_FLOW_ATTRIBUTE,
	MODAL_MAX_HEIGHT_PROPERTY,
	shouldFlowWithPage,
} from '../lib/premiumPuzzlesModalLayout';
import {
	buildPremiumPuzzlesSubscribeUrl,
	getCurrentPageUrl,
	getPremiumPuzzlesSignInUrl,
	isSafeInternalPath,
} from '../lib/premiumPuzzlesUrls';

/**
 * The hero illustration, in its final, already cropped version, served by the
 * image CDN (`i.guim.co.uk`). Shown 556 px wide with the design's 185/69
 * aspect ratio; the file is 556 by 208 px, so the CDN does not enlarge it
 * further. Width and height are set on the `<img>` so the layout does not
 * jump when it loads.
 */
const HERO_IMAGE_URL =
	'https://i.guim.co.uk/img/uploads/2026/11/09/HERO-01-2.png?width=360&dpr=2&s=none';
const HERO_IMAGE_WIDTH = 556;
const HERO_IMAGE_HEIGHT = 207;

const blockerStyles = css`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;

	/* A bottom sheet on small screens: the modal goes to the bottom of the
	   covered content and sticks to the bottom of the screen (see modalStyles) */
	${until.phablet} {
		flex-direction: column;
		align-items: stretch;
		justify-content: flex-end;
	}

	/* On a screen too short for the sheet it goes to the top of the covered
	   content instead (see shouldFlowWithPage) */
	${until.phablet} {
		&[${MODAL_FLOW_ATTRIBUTE}='true'] {
			justify-content: flex-start;
		}
	}
`;

const overlayStyles = css`
	z-index: ${getZIndex('lightbox')};
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0.5;
	background-color: ${sourcePalette.neutral[0]};
`;

const modalStyles = css`
	z-index: ${getZIndex('sign-in-gate')};
	min-width: ${space[5]}px;
	min-height: ${space[24]}px;
	max-width: 620px;
	width: 100%;
	padding-top: ${space[4]}px;
	padding-left: ${space[4]}px;
	padding-right: ${space[4]}px;
	padding-bottom: ${space[6]}px;
	/* stylelint-disable-next-line color-no-hex -- specified by the Design team for the modal background, not in the Source palette */
	background-color: #fef9f6;
	border-radius: ${space[3]}px;

	${until.phablet} {
		/* Sticks to the bottom of the screen while the covered content is in
		   view, then stops at the end of it so the page footer shows below. */
		position: sticky;
		bottom: 0;
		display: flex;
		flex-direction: column;
		max-width: none;
		/* Set from the page layout, see getModalMaxHeight */
		max-height: var(${MODAL_MAX_HEIGHT_PROPERTY}, 70vh);
		padding: 0;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;

		/* Flows with the page, with its natural height */
		[${MODAL_FLOW_ATTRIBUTE}='true'] > & {
			position: static;
			max-height: none;
		}
	}
`;

const bodyStyles = css`
	display: flex;
	flex-direction: column;

	/* The logo, hero, title and benefits scroll, the footer does not */
	${until.phablet} {
		flex: 1 1 auto;
		min-height: 0;
		overflow-y: auto;
		padding: ${space[4]}px ${space[4]}px ${space[3]}px;

		[${MODAL_FLOW_ATTRIBUTE}='true'] > div > & {
			flex: none;
			overflow-y: visible;
		}
	}
`;

const headerStyles = css`
	display: flex;
	justify-content: flex-end;
`;

const dividerStyles = css`
	border: 0;
	border-top: 1px solid ${sourcePalette.neutral[86]};
	margin-top: ${space[4]}px;
	margin-bottom: ${space[4]}px;
	width: 100%;
`;

const heroStyles = css`
	display: flex;
	justify-content: center;

	img {
		display: block;
		width: 100%;
		max-width: ${HERO_IMAGE_WIDTH}px;
		height: auto;
		aspect-ratio: 185 / 69;
		object-fit: cover;
	}
`;

const titleStyles = css`
	${headlineMedium24};
	color: ${sourcePalette.brand[400]};
	font-variant-numeric: lining-nums proportional-nums;
	margin: ${space[4]}px 0;
`;

const subtitleStyles = css`
	${textEgyptianBold17};
	color: ${sourcePalette.neutral[0]};
	margin-top: ${space[2]}px;
	margin-bottom: ${space[3]}px;
`;

const benefitsStyles = css`
	${textEgyptian17};
	color: ${sourcePalette.neutral[0]};
	list-style: none;
	margin: 0 0 ${space[2]}px;
	padding: 0;

	li {
		display: flex;
		align-items: center;
		gap: ${space[2]}px;
		margin-bottom: ${space[2]}px;
	}

	svg {
		flex: none;
		fill: ${sourcePalette.brand[500]};
	}
`;

const footerStyles = css`
	display: flex;
	flex-direction: column;
	gap: ${space[6]}px;

	${until.phablet} {
		flex: none;
		position: relative;
		padding: ${space[4]}px ${space[4]}px
			calc(${space[6]}px + env(safe-area-inset-bottom, 0px));
		box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.15);

		[${MODAL_FLOW_ATTRIBUTE}='true'] > div > & {
			box-shadow: none;
		}
	}
`;

const buttonsStyles = css`
	display: flex;
	gap: ${space[3]}px;

	${until.phablet} {
		flex-direction: column;
	}

	a {
		flex: 1;
		justify-content: center;
	}
`;

const subscribeButtonStyles = css`
	border-radius: 40px;
`;

const archiveButtonStyles = css`
	border-radius: 40px;
	border: 2px solid ${sourcePalette.brand[400]};
`;

const footnoteStyles = css`
	${textSans14};
	color: ${sourcePalette.neutral[0]};
	text-align: center;

	a {
		${textSansBold14};
		color: ${sourcePalette.brand[500]};
		text-decoration-line: underline;
		text-decoration-style: solid;
		text-decoration-skip-ink: none;
		text-underline-position: from-font;
	}
`;

const DEFAULT_TITLE = 'Unlock the full puzzles experience - and more';

const DEFAULT_SUBTITLE =
	'Subscribe to the Guardian to unlock the ad-free puzzles archive and enjoy more digital benefits:';

const DEFAULT_BENEFITS = [
	'Unlimited ad-free reading on all your devices',
	'Unlimited access to the Guardian app and Guardian Feast app',
	'An exclusive weekly supporter newsletter',
];

type Props = {
	/**
	 * Full `https` URL the reader is sent back to after subscribing or signing
	 * in. Defaults to the URL of the page the modal is shown on.
	 */
	returnUrl?: string;
	/** Same-site path of the "Return to puzzle archive" button. */
	returnToArchivePath: string;
	/**
	 * The page's `config.idUrl`. Used to resolve the Support and Identity
	 * origins of the current environment (falls back to production).
	 */
	idUrl?: string;
	/**
	 * Whether the reader is signed in. Only changes the footnote: a signed out
	 * reader is told so, a signed in one is told their account has no access.
	 * Defaults to signed out.
	 */
	isSignedIn?: boolean;
	title?: string;
	subtitle?: string;
	benefits?: string[];
	cssOverrides?: SerializedStyles | SerializedStyles[];
};

/**
 * The URL of the page the reader is on. Read after mounting, so what the
 * server renders and what the browser first renders are the same.
 */
const useCurrentPageUrl = (): string | undefined => {
	const [url, setUrl] = useState<string | undefined>(undefined);
	useEffect(() => {
		setUrl(getCurrentPageUrl(window.location));
	}, []);
	return url;
};

/**
 * A blocking modal, with a dimmed overlay, asking the reader to subscribe to
 * unlock premium puzzles.
 *
 * It is absolutely positioned to fill its closest positioned ancestor, so the
 * parent must have `position: relative`. Whether to render it is up to the
 * caller.
 */
export const UnlockPremiumPuzzlesModal = ({
	returnUrl: returnUrlOverride,
	returnToArchivePath,
	idUrl,
	isSignedIn = false,
	title = DEFAULT_TITLE,
	subtitle = DEFAULT_SUBTITLE,
	benefits = DEFAULT_BENEFITS,
	cssOverrides,
}: Props) => {
	const currentPageUrl = useCurrentPageUrl();
	const returnUrl = returnUrlOverride ?? currentPageUrl;
	const subscribeUrl = buildPremiumPuzzlesSubscribeUrl({ idUrl, returnUrl });
	const archiveUrl = isSafeInternalPath(returnToArchivePath)
		? returnToArchivePath
		: '/';

	const blockerRef = useRef<HTMLDivElement>(null);

	// On small screens the modal is a bottom sheet whose height depends on how
	// much room is left under the page header (see getModalMaxHeight). When
	// there is too little room it flows with the page instead (see
	// shouldFlowWithPage)
	useEffect(() => {
		const blocker = blockerRef.current;
		if (!blocker) return;

		const updateMaxHeight = () => {
			const viewportHeight = window.innerHeight;
			const wrapperTop =
				blocker.getBoundingClientRect().top + window.scrollY;
			blocker.style.setProperty(
				MODAL_MAX_HEIGHT_PROPERTY,
				`${getModalMaxHeight({ viewportHeight, wrapperTop })}px`,
			);
			blocker.setAttribute(
				MODAL_FLOW_ATTRIBUTE,
				String(shouldFlowWithPage({ viewportHeight, wrapperTop })),
			);
		};

		updateMaxHeight();
		window.addEventListener('resize', updateMaxHeight);
		return () => window.removeEventListener('resize', updateMaxHeight);
	}, []);

	return (
		<div ref={blockerRef} css={[blockerStyles, cssOverrides]}>
			<div css={overlayStyles}></div>
			<div css={modalStyles}>
				<div css={bodyStyles}>
					<div css={headerStyles}>
						<SvgGuardianLogo
							textColor={sourcePalette.neutral[0]}
							width={98}
						/>
					</div>
					<hr css={dividerStyles} />
					<div css={heroStyles}>
						<img
							src={HERO_IMAGE_URL}
							width={HERO_IMAGE_WIDTH}
							height={HERO_IMAGE_HEIGHT}
							alt=""
						/>
					</div>
					<div css={titleStyles}>{title}</div>
					<div css={subtitleStyles}>{subtitle}</div>
					<ul css={benefitsStyles}>
						{benefits.map((benefit) => (
							<li key={benefit}>
								<SvgTickRound size="xsmall" />
								{benefit}
							</li>
						))}
					</ul>
				</div>
				<div css={footerStyles}>
					<div css={buttonsStyles}>
						<LinkButton
							href={subscribeUrl}
							priority="primary"
							theme={themeButtonReaderRevenue}
							cssOverrides={subscribeButtonStyles}
						>
							Subscribe
						</LinkButton>
						<LinkButton
							href={archiveUrl}
							priority="tertiary"
							cssOverrides={archiveButtonStyles}
						>
							Return to puzzle archive
						</LinkButton>
					</div>
					<p css={footnoteStyles}>
						{isSignedIn
							? "Your current account doesn't include unlimited access to Guardian Puzzles."
							: 'You are currently signed out.'}{' '}
						If you have a premium subscription{' '}
						<a href={getPremiumPuzzlesSignInUrl(idUrl, returnUrl)}>
							sign in
						</a>{' '}
						with that account to access.
					</p>
				</div>
			</div>
		</div>
	);
};
