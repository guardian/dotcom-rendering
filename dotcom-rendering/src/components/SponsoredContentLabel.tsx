import { css } from '@emotion/react';
import {
	space,
	textSansBold12,
	visuallyHidden,
} from '@guardian/source/foundations';
import { decideBrandingLogo } from '../lib/decideLogo';
import { getZIndex } from '../lib/getZIndex';
import { palette } from '../palette';
import type { Branding } from '../types/branding';
import type { DCRContainerPalette } from '../types/front';
import { useConfig } from './ConfigContext';

type SponsoredContentLabelProps = {
	branding: Branding;
	alignment?: 'start' | 'end';
	orientation?: 'horizontal' | 'vertical';
	containerPalette?: DCRContainerPalette;
	ophanComponentLink?: string;
	ophanComponentName?: string;
};

const logoImageStyle = css`
	max-height: 60px;
	max-width: 120px;
	vertical-align: middle;
	height: auto;
	width: auto;
`;

const labelStyles = css`
	${textSansBold12};
	color: ${palette('--labs-header-label-text')};
`;

const wrapperStyles = css`
	padding-top: ${space[1]}px;
	display: flex;
	justify-content: end;
`;

const horizontalStyles = css`
	align-items: center;
	gap: ${space[2]}px;
`;

const verticalStyles = {
	start: css`
		flex-direction: column;
	`,
	end: css`
		align-items: end;
		flex-direction: column;
	`,
};

const linkStyles = css`
	height: 60px;
	/* See: https://css-tricks.com/nested-links/ */
	z-index: ${getZIndex('card-nested-link')};
	/** Vertically center the branding within the link */
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

/**
 * Component used to display "paid for" label alonside the sponsor logo
 * for a particular set of branding
 *
 * This is used for front container level branding for labs content and
 * should replace `CardBranding` eventually
 */
export const SponsoredContentLabel = ({
	branding,
	alignment = 'start',
	orientation = 'horizontal',
	containerPalette,
	ophanComponentLink,
	ophanComponentName,
}: SponsoredContentLabelProps) => {
	const { darkModeAvailable } = useConfig();
	const logo = decideBrandingLogo(branding, containerPalette);

	return (
		<div
			css={[
				wrapperStyles,
				orientation === 'vertical'
					? verticalStyles[alignment]
					: horizontalStyles,
			]}
		>
			<div css={labelStyles}>{logo.label}</div>
			<span
				css={css`
					${visuallyHidden};
				`}
			>
				{branding.sponsorName
					? `This content was paid for by ${branding.sponsorName} and produced by the Guardian Labs team.`
					: 'This content has been paid for by an advertiser and produced by the Guardian Labs team.'}
			</span>
			<a
				css={linkStyles}
				href={logo.link}
				data-sponsor={branding.sponsorName.toLowerCase()}
				rel="nofollow"
				aria-label={`Visit the ${branding.sponsorName} website`}
				data-testid="branding-logo"
				data-component={ophanComponentName}
				data-link-name={ophanComponentLink}
				className="branding-logo"
			>
				<picture>
					{darkModeAvailable && branding.logoForDarkBackground && (
						<source
							width={
								branding.logoForDarkBackground.dimensions.width
							}
							height={
								branding.logoForDarkBackground.dimensions.height
							}
							srcSet={encodeURI(
								branding.logoForDarkBackground.src,
							)}
							media={'(prefers-color-scheme: dark)'}
						/>
					)}
					<img
						css={logoImageStyle}
						src={logo.src}
						alt={branding.sponsorName}
						width={logo.dimensions.width}
						height={logo.dimensions.height}
					/>
				</picture>
			</a>
		</div>
	);
};
