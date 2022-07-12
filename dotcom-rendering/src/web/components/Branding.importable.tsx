import { css } from '@emotion/react';
import { neutral, textSans } from '@guardian/source-foundations';
import { trackSponsorLogoLinkClick } from '../browser/ga/ga';

const brandingStyle = css`
	padding-bottom: 10px;
`;

const brandingLabelStyle = css`
	${textSans.xxsmall()};
	color: ${neutral[20]};
`;

const brandingLogoStyle = css`
	padding: 10px 0;

	display: block;
	img {
		display: block;
	}
`;

const brandingAboutLink = (palette: Palette) => css`
	color: ${palette.text.branding};
	${textSans.xxsmall()}
	display: block;
	text-decoration: none;
	&:hover {
		text-decoration: underline;
	}
`;

type Props = {
	branding: Branding;
	palette: Palette;
};

export const Branding = ({ branding, palette }: Props) => {
	const sponsorId = branding.sponsorName.toLowerCase();

	return (
		<div css={brandingStyle}>
			<div css={brandingLabelStyle}>{branding.logo.label}</div>
			<div css={brandingLogoStyle}>
				<a
					href={branding.logo.link}
					data-sponsor={branding.sponsorName.toLowerCase()}
					rel="nofollow"
					aria-label={`Visit the ${branding.sponsorName} website`}
					onClick={() => trackSponsorLogoLinkClick(sponsorId)}
					data-cy="branding-logo"
				>
					<img
						width={branding.logo.dimensions.width}
						height={branding.logo.dimensions.height}
						src={branding.logo.src}
						alt={branding.sponsorName}
					/>
				</a>
			</div>

			<a href={branding.aboutThisLink} css={brandingAboutLink(palette)}>
				About this content
			</a>
		</div>
	);
};
