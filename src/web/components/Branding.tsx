import React from 'react';
import { textSans } from '@guardian/src-foundations/typography';

import { css } from 'emotion';
import { neutral } from '@guardian/src-foundations';
import { pillarPalette } from '@root/src/lib/pillars';
import { until } from '@guardian/src-foundations/mq';

const brandingStyle = css`
	padding-bottom: 10px;
`;

const brandingLabelStyle = css`
	${textSans.xsmall({ fontWeight: 'bold' })};
	color: ${neutral[46]};
`;

const brandingLogoStyle = css`
	${until.phablet} {
		max-width: 150px;
	}
	max-width: 220px;
	width: 100%;
	padding: 10px 0;
	img {
		max-width: 100%;
	}
`;

const brandingAboutLink = (pillar: CAPIPillar) => css`
	color: ${pillarPalette[pillar].main};
	${textSans.xsmall()}
	display: block;
	text-decoration: none;
	&:hover {
		text-decoration: underline;
	}
`;

export const Branding: React.FC<{
	branding: Branding;
	pillar: CAPIPillar;
}> = ({ branding, pillar }) => {
	if (!branding) return null;
	return (
		<div className={brandingStyle}>
			<div className={brandingLabelStyle}>{branding.logo.label}</div>
			<div className={brandingLogoStyle}>
				<a
					href={branding.logo.link}
					data-sponsor={branding.sponsorName.toLowerCase()}
					rel="nofollow"
					aria-label={`Visit the ${branding.sponsorName} website`}
				>
					<img src={branding.logo.src} alt={branding.sponsorName} />
				</a>
			</div>

			<a
				href={branding.aboutThisLink}
				className={brandingAboutLink(pillar)}
			>
				About this content
			</a>
		</div>
	);
};
