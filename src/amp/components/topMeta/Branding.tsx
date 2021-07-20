import React from 'react';
import { css } from '@emotion/react';
import { textSans } from '@guardian/src-foundations/typography';

import { pillarPalette_DO_NOT_USE, neutralBorder } from '@root/src/lib/pillars';

export const brandingCss = `
	.branding-uk, .branding-us, .branding-au, .branding-int {
		display: none;
	}

	.amp-iso-country-gb .branding-uk,
	.amp-iso-country-us .branding-us,
	.amp-iso-country-au .branding-au,
	.amp-geo-group-eea:not(.amp-iso-country-gb) .branding-int,
	.amp-geo-no-group .branding-int {
		display: block;
	}
`;

const LinkStyle = (pillar: Theme) => css`
	a {
		color: ${pillarPalette_DO_NOT_USE[pillar].dark};
		text-decoration: none;
		border-bottom: 1px solid ${neutralBorder(pillar)};
		:hover {
			border-bottom: 1px solid ${pillarPalette_DO_NOT_USE[pillar].dark};
		}
	}
`;

const brandingStyle = (pillar: Theme) => css`
	padding: 10px 0;
	${LinkStyle(pillar)}

	a, a:hover {
		display: block;
		border-bottom: none;
		${textSans.xxsmall()}
	}
`;

const brandingLabelStyle = css`
	${textSans.xxsmall()};
`;

const brandingLogoStyle = css`
	padding: 10px 0;
`;

export const BrandingItem: React.FC<{
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

export const Branding: React.FC<{
	commercialProperties: CommercialProperties;
	pillar: Theme;
}> = ({ commercialProperties, pillar }) => (
	<>
		{Object.keys(commercialProperties).map((editionId) => {
			const { branding } = commercialProperties[editionId as Edition];
			return branding !== undefined ? (
				<div className={`branding branding-${editionId.toLowerCase()}`}>
					<BrandingItem branding={branding} pillar={pillar} />
				</div>
			) : null;
		})}
	</>
);
