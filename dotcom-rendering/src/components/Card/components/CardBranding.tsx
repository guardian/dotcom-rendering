import { css } from '@emotion/react';
import {
	space,
	textSans12,
	visuallyHidden,
} from '@guardian/source/foundations';
import { decideBrandingLogo } from '../../../lib/decideLogo';
import { getZIndex } from '../../../lib/getZIndex';
import { getOphanComponents } from '../../../lib/labs';
import { palette as themePalette } from '../../../palette';
import type { Branding } from '../../../types/branding';
import type { DCRContainerPalette } from '../../../types/front';
import type { OnwardsSource } from '../../../types/onwards';
import { Badge } from '../../Badge';

type Props = {
	branding: Branding;
	onwardsSource: OnwardsSource | undefined;
	containerPalette?: DCRContainerPalette;
};

const brandingWrapperStyle = css`
	padding-right: ${space[2]}px;
	padding-bottom: ${space[2]}px;
	text-align: right;
	flex: auto;
	/* See: https://css-tricks.com/nested-links/ */
	z-index: ${getZIndex('card-nested-link')};
	position: relative;
`;

const labelStyle = css`
	${textSans12}
	color: ${themePalette('--card-footer-text')};
`;

export const CardBranding = ({
	branding,
	onwardsSource,
	containerPalette,
}: Props) => {
	const logo = decideBrandingLogo(branding, containerPalette);
	const dataAttributes = getOphanComponents({
		branding,
		locationPrefix:
			onwardsSource === 'related-content'
				? 'article-related-content'
				: 'front-card',
	});

	return (
		<div css={brandingWrapperStyle}>
			<div css={labelStyle}>{logo.label}</div>
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
				ophanComponentLink={dataAttributes.ophanComponentLink}
				ophanComponentName={dataAttributes.ophanComponentName}
			/>
		</div>
	);
};
