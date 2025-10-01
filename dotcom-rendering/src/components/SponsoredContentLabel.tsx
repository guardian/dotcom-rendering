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
import { Badge } from './Badge';

type SponsoredContentLabelProps = {
	branding: Branding;
	alignment?: 'start' | 'end';
	orientation?: 'horizontal' | 'vertical';
	containerPalette?: DCRContainerPalette;
};

const labelStyles = css`
	${textSansBold12};
	color: ${palette('--labs-header-label-text')};
	margin-top: ${space[3]}px;
	margin-bottom: ${space[1]}px;
`;

const wrapperStyles = css`
	padding-right: ${space[2]}px;
	padding-bottom: ${space[2]}px;
	display: flex;
	flex: auto;
	gap: ${space[2]}px;
	justify-content: end;
	/* See: https://css-tricks.com/nested-links/ */
	z-index: ${getZIndex('card-nested-link')};
	/* position: relative; */
`;

const horizontalStyles = css`
	align-items: center;
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

export const SponsoredContentLabel = ({
	branding,
	alignment = 'start',
	orientation = 'horizontal',
	containerPalette,
}: SponsoredContentLabelProps) => {
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
			<Badge
				logo={logo}
				logoForDarkBackground={branding.logoForDarkBackground}
				sponsorName={branding.sponsorName}
			/>
		</div>
	);
};
