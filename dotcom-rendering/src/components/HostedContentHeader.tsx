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
	Button,
	SvgGuardianLogo,
	SvgInfoRound,
} from '@guardian/source/react-components';
import { nestedOphanComponents } from '../lib/ophan-helpers';
import type { Branding } from '../types/branding';
import { BrandingLabel } from './BrandingLabel';

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

const brandingStyles = css`
	display: flex;
	width: 132px;
`;

const advertiserContentStyles = css`
	min-height: 24px;
	width: 100%;
	align-self: flex-end;
	display: flex;
	justify-content: space-around;
	align-items: center;
	${textSans14};
	/** Hard-coded to fit. TODO - address this */
	font-size: 13px;
	padding: 0 2px;

	button {
		width: 16px;
		height: 16px;
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
	width: 132px;
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
			<div css={brandingStyles}>
				<div
					css={advertiserContentStyles}
					style={{ backgroundColor: accentColor }}
				>
					<p>Advertiser content</p>
					{/** TODO - add button action ie on click/on hover handlers */}
					<Button
						size="xsmall"
						icon={<SvgInfoRound />}
						hideLabel={true}
						priority="subdued"
						theme={{
							textSubdued: sourcePalette.neutral[97],
						}}
					/>
				</div>

				<div css={badgeWrapperStyles}>
					<BrandingLabel branding={branding} isHosted={true} />
				</div>
			</div>

			<div css={logoStyles}>
				<Logo />
			</div>
		</div>
	);
};
