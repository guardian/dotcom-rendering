import { css } from '@emotion/react';
import { space, textSans } from '@guardian/source-foundations';
import { trackSponsorLogoLinkClick } from '../../../client/ga/ga';
import { decideLogo } from '../../../lib/decideLogo';
import { decidePalette } from '../../../lib/decidePalette';
import { getZIndex } from '../../../lib/getZIndex';
import { visuallyHidden } from '../../../lib/visuallyHidden';
import type { Branding } from '../../../types/branding';

type Props = {
	branding: Branding;
	format: ArticleFormat;
};

const logoImageStyle = css`
	max-height: 60px;
	margin-left: ${space[3]}px;
	vertical-align: middle;
	height: auto;
	width: auto;
`;

const brandingWrapperStyle = css`
	padding-right: ${space[2]}px;
	padding-bottom: ${space[2]}px;
	text-align: right;
	flex: auto;
	/* See: https://css-tricks.com/nested-links/ */
	${getZIndex('card-nested-link')}
	position: relative;
`;

const labelStyle = css`
	${textSans.xxsmall()}
`;

export const CardBranding = ({ branding, format }: Props) => {
	const logo = decideLogo(format, branding);
	const palette = decidePalette(format);
	return (
		<div css={brandingWrapperStyle}>
			<div style={{ color: palette.text.cardFooter }} css={labelStyle}>
				{logo.label}
			</div>
			<span css={visuallyHidden}>
				{branding.sponsorName
					? `This content was paid for by ${branding.sponsorName} and produced by the Guardian Labs team.`
					: 'This content has been paid for by an advertiser and produced by the Guardian Labs team.'}
			</span>
			<a
				href={logo.link}
				data-sponsor={branding.sponsorName.toLowerCase()}
				rel="nofollow"
				aria-label={`Visit the ${branding.sponsorName} website`}
				onClick={() =>
					trackSponsorLogoLinkClick(
						branding.sponsorName.toLowerCase(),
					)
				}
				data-cy="card-branding-logo"
			>
				<img
					css={logoImageStyle}
					src={logo.src}
					alt={branding.sponsorName}
					width={logo.dimensions.width}
					height={logo.dimensions.height}
				/>
			</a>
		</div>
	);
};
