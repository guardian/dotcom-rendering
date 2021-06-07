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
		${textSans.xxsmall({ fontWeight: 'bold' })}
		color: ${palette.text.cardFooter};
	`;
};

export const CardBranding = ({ branding, palette }: Props) => (
	<div css={brandingWrapperStyle}>
		<div css={labelStyle(palette)}>{branding.logo.label}</div>
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
			href={branding.logo.link}
			data-sponsor={branding.sponsorName.toLowerCase()}
			rel="nofollow"
			aria-label={`Visit the ${branding.sponsorName} website`}
		>
			<img
				css={logoImageStyle}
				src={branding.logo.src}
				alt={branding.sponsorName}
				width={branding.logo.dimensions.width}
				height={branding.logo.dimensions.height}
			/>
		</a>
	</div>
);
