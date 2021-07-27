import React from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { textSans } from '@guardian/src-foundations/typography';

import { pillarPalette_DO_NOT_USE, neutralBorder } from '@root/src/lib/pillars';
import { isEdition } from '@root/src/amp/lib/edition';

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

export const BrandingRegionContainer: React.FC<{
	children: (branding: Branding) => React.ReactNode;
	commercialProperties: CommercialProperties;
}> = ({ children, commercialProperties }) => {
	const brandingStyles = css`
		display: none;
	`;
	const ukStyles = css`
		.amp-iso-country-gb & {
			display: block;
		}
	`;
	const usStyles = css`
		.amp-iso-country-us & {
			display: block;
		}
	`;
	const auStyles = css`
		.amp-iso-country-au & {
			display: block;
		}
	`;
	const intStyles = css`
		.amp-geo-group-eea:not(.amp-iso-country-gb) &,
		.amp-geo-no-group & {
			display: block;
		}
	`;
	const editionStyles: Record<Edition, SerializedStyles> = {
		UK: ukStyles,
		US: usStyles,
		AU: auStyles,
		INT: intStyles,
	};
	return (
		<>
			{Object.keys(commercialProperties)
				.filter(isEdition)
				.map((editionId) => {
					const { branding } = commercialProperties[editionId];
					return branding !== undefined ? (
						<div css={[brandingStyles, editionStyles[editionId]]}>
							{children(branding)}
						</div>
					) : null;
				})}
		</>
	);
};
