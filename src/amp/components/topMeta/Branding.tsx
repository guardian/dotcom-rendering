import { LinkStyle } from '@root/src/amp/components/elements/TextBlockComponent';
import { textSans } from '@guardian/src-foundations/typography';
import { css } from '@emotion/react';

const brandingStyle = (pillar: Theme) => css`
	padding: 10px 0;
	${LinkStyle(pillar)}

	a, a:hover {
		display: block;
		border-bottom: none;
		${textSans.xsmall()}
	}
`;

const brandingLabelStyle = css`
	${textSans.xsmall()};
`;

const brandingLogoStyle = css`
	padding: 10px 0;
`;

export const Branding: React.FC<{
	branding: Branding;
	pillar: Theme;
}> = ({ branding, pillar }) => {
	const { logo, sponsorName } = branding;

	return (
		<div css={brandingStyle(pillar)}>
			<div css={brandingLabelStyle}>{branding.logo.label}</div>
			<a
				css={brandingLogoStyle}
				href={logo.link}
				data-sponsor={sponsorName.toLowerCase()}
				rel="nofollow"
				aria-label={`Visit the ${sponsorName} website`}
			>
				<amp-img
					src={logo.src}
					width={logo.dimensions.width}
					height={logo.dimensions.height}
					alt={sponsorName}
				/>
			</a>
			<a href={branding.aboutThisLink}>About this content</a>
		</div>
	);
};
