import { css } from '@emotion/react';
import { space } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import { visuallyHidden } from '@guardian/src-foundations/accessibility';

type Props = {
	branding: Branding;
	palette: Palette;
};

const logoImageStyle = css`
	max-height: 60px;
	margin-left: ${space[3]}px;
	vertical-align: middle;
	height: auto;
	width: auto;
`;

const brandingWrapperStyle = css`
	padding-right: ${space[3]}px;
	padding-bottom: ${space[3]}px;
	text-align: right;
	flex: auto;
`;

const labelStyle = (palette: Palette) => {
	return css`
		${textSans.xxsmall()}
		color: ${palette.text.cardFooter};
	`;
};

const pickLogo = (branding: Branding, palette: Palette): BrandingLogo => {
	return palette.background.cardInvertLogo && branding.logoForDarkBackground
		? branding.logoForDarkBackground
		: branding.logo;
};

export const CardBranding = ({ branding, palette }: Props) => {
	const logo = pickLogo(branding, palette);
	return (
		<div css={brandingWrapperStyle}>
			<div css={labelStyle(palette)}>{logo.label}</div>
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
				href={logo.link}
				data-sponsor={branding.sponsorName.toLowerCase()}
				rel="nofollow"
				aria-label={`Visit the ${branding.sponsorName} website`}
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
