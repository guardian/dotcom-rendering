import { css } from '@emotion/react';
import {
	breakpoints,
	from,
	palette as sourcePalette,
	space,
	textSans14,
	textSansBold12,
	textSansBold14,
	visuallyHidden,
} from '@guardian/source/foundations';
import {
	LinkButton,
	SvgArrowRightStraight,
	SvgGuardianLogo,
} from '@guardian/source/react-components';
import { nestedOphanComponents } from '../lib/ophan-helpers';
import type { Branding } from '../types/branding';
import { BrandingLabel } from './BrandingLabel';
import { Details } from './Details';

const BRANDING_WIDTH_MOBILE = '80px';
const BRANDING_WIDTH_DESKTOP = '132px';

export type Props = {
	branding: Branding;
};

const headerWrapperStyles = css`
	display: flex;
	justify-content: space-between;
	width: 100%;
	margin: 0 auto;
	padding: 0 10px;
	height: 48px;
	color: ${sourcePalette.neutral[100]};

	${from.mobileLandscape} {
		padding: 0 20px;
	}

	${from.tablet} {
		height: 58px;
	}

	${from.tablet} {
		width: ${breakpoints.tablet}px;
	}

	${from.desktop} {
		width: ${breakpoints.desktop}px;
	}

	${from.leftCol} {
		width: ${breakpoints.leftCol}px;
	}

	${from.wide} {
		width: ${breakpoints.wide}px;
	}
`;

const leftContent = css`
	display: flex;
	position: relative;
`;

const brandingStyles = css`
	display: flex;
	width: ${BRANDING_WIDTH_MOBILE};
	${from.tablet} {
		width: ${BRANDING_WIDTH_DESKTOP};
	}
`;

const advertiserContentStyles = css`
	min-height: 24px;
	width: 100%;
	align-self: flex-end;
	display: flex;
	justify-content: space-around;
	align-items: center;
	${textSans14};
	padding: 0 2px;

	button {
		width: 16px;
		height: 16px;
	}
`;

const detailsLabelStyles = css`
	margin-left: ${space[1]}px;
	align-self: end;
`;

const detailsPositionStyles = css`
	left: -(calc(100% + 132px));
	top: calc(100% + 10px);
`;

const detailsContentStyles = css`
	${textSans14};
	background-color: ${sourcePalette.neutral[38]};
	border-radius: ${space[2]}px;
	border: none;

	width: calc(100vw - 20px);
	${from.tablet} {
		width: 308px;
	}
	padding: ${space[3]}px;

	/* Tooltip/popover arrow */
	&::before {
		content: '';
		position: absolute;
		top: -8px;
		left: 24px;
		width: 0;
		height: 0;
		border-left: 8px solid transparent;
		border-right: 8px solid transparent;
		border-bottom: 8px solid ${sourcePalette.neutral[38]};
	}
`;

const logoStyles = css`
	align-self: end;
	padding-bottom: ${space[1]}px;

	a {
		cursor: pointer;
		text-decoration: none;
		display: flex;
		align-items: flex-end;
	}

	svg {
		width: 94px;
		height: auto;

		${from.tablet} {
			width: 120px;
		}
	}
`;

const hostedByStyles = css`
	${textSansBold12};
	display: block;
	color: ${sourcePalette.neutral[97]};
	margin-right: ${space[1]}px;

	${from.tablet} {
		${textSansBold14};
	}
`;

const badgeWrapperStyles = css`
	position: absolute;
	display: block;
	width: ${BRANDING_WIDTH_MOBILE};
	${from.tablet} {
		width: ${BRANDING_WIDTH_DESKTOP};
	}
	height: auto;
	top: 100%;
	text-align: center;
	z-index: 1;
`;

/**
 * Can't reuse general Logo.tsx until we add a new palette to work with hosted.
 * The color doesn't work with palette --masthead-nav-link-text
 */
const Logo = () => (
	<a href="/" data-link-name={nestedOphanComponents('hosted-header', 'logo')}>
		<span
			css={css`
				${visuallyHidden};
			`}
		>
			The Guardian - Back to home
		</span>
		<p css={hostedByStyles}>Hosted by</p>

		<SvgGuardianLogo textColor={`${sourcePalette.neutral[100]}`} />
	</a>
);

export const HostedContentHeader = ({ branding }: Props) => {
	const accentColor =
		branding.hostedCampaignColour ?? sourcePalette.neutral[38];
	return (
		<div css={headerWrapperStyles}>
			<div css={leftContent}>
				<div css={brandingStyles}>
					<div
						css={advertiserContentStyles}
						style={{ backgroundColor: accentColor }}
					>
						<p>Advertiser content</p>
					</div>

					<div css={badgeWrapperStyles}>
						<BrandingLabel branding={branding} isHosted={true} />
					</div>
				</div>

				<div css={detailsLabelStyles}>
					<Details
						label="About"
						labelSize="xsmall"
						positionStyles={detailsPositionStyles}
					>
						<div css={detailsContentStyles}>
							<span>
								This article was paid for, produced and
								controlled by the advertiser rather than the
								publisher. It is subject to regulation by the
								Advertising Standards Authority. This content is
								produced by the advertiser with no involvement
								from Guardian News and Media staff.
							</span>
							<br />
							<LinkButton
								iconSide="right"
								size="xsmall"
								priority="subdued"
								theme={{
									textSubdued: sourcePalette.neutral[100],
								}}
								icon={<SvgArrowRightStraight />}
								href="https://www.theguardian.com/info/2016/jan/25/content-funding"
							>
								Learn more
							</LinkButton>
						</div>
					</Details>
				</div>
			</div>

			<div css={logoStyles}>
				<Logo />
			</div>
		</div>
	);
};
