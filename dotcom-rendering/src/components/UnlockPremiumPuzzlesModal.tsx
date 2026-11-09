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
} from '@guardian/source/react-components';
import { getZIndex } from '../lib/getZIndex';
import {
	buildPremiumPuzzlesSubscribeUrl,
	getPremiumPuzzlesSignInUrl,
	isSafeInternalPath,
} from '../lib/premiumPuzzlesUrls';

const blockerStyles = css`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
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
	/* New color specified by the Design team for the Modal background */
	background-color: #fef9f6;
	border-radius: ${space[3]}px;

	${until.phablet} {
		position: absolute;
		max-width: none;
		bottom: 0;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}
`;

const bodyStyles = css`
	display: flex;
	flex-direction: column;
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
	 * Same-site path the reader is sent back to after subscribing,
	 * e.g. `/puzzles-and-games`. Absolute and protocol-relative URLs are
	 * ignored.
	 */
	returnFromSubscribeToPath: string;
	/** Same-site path of the "Return to puzzle archive" button. */
	returnToArchivePath: string;
	/**
	 * The page's `config.idUrl`. Used to resolve the Support and Identity
	 * origins of the current environment (falls back to production).
	 */
	idUrl?: string;
	title?: string;
	subtitle?: string;
	benefits?: string[];
	cssOverrides?: SerializedStyles | SerializedStyles[];
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
	returnFromSubscribeToPath,
	returnToArchivePath,
	idUrl,
	title = DEFAULT_TITLE,
	subtitle = DEFAULT_SUBTITLE,
	benefits = DEFAULT_BENEFITS,
	cssOverrides,
}: Props) => {
	const subscribeUrl = buildPremiumPuzzlesSubscribeUrl({
		idUrl,
		returnFromSubscribeToPath,
	});
	const archiveUrl = isSafeInternalPath(returnToArchivePath)
		? returnToArchivePath
		: '/';

	return (
		<div css={[blockerStyles, cssOverrides]}>
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
					<div css={heroStyles}>hero image here</div>
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
						<LinkButton href={subscribeUrl} priority="primary">
							Subscribe
						</LinkButton>
						<LinkButton href={archiveUrl} priority="tertiary">
							Return to puzzle archive
						</LinkButton>
					</div>
					<p css={footnoteStyles}>
						Your current account doesn&apos;t include unlimited
						access to Guardian Puzzles. If you have a premium
						subscription{' '}
						<a href={getPremiumPuzzlesSignInUrl(idUrl)}>sign in</a>{' '}
						with that account to access.
					</p>
				</div>
			</div>
		</div>
	);
};
