import React from 'react';
import { textSans } from '@guardian/src-foundations/typography';

import { css } from 'emotion';
import { neutral } from '@guardian/src-foundations';
import { pillarPalette } from '@root/src/lib/pillars';

const brandingStyle = css`
    padding-bottom: 10px;
`;

const brandingLabelStyle = css`
    ${textSans.xsmall({ fontWeight: 'bold' })};
    color: ${neutral[46]};
`;

const brandingLogoStyle = css`
    padding: 10px 0;
`;

const brandingAboutLink = (pillar: Pillar) => css`
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
    pillar: Pillar;
}> = ({ branding, pillar }) => {
    if (!branding) return null;
    return (
        <div className={brandingStyle}>
            <div className={brandingLabelStyle}>{branding.logo.label}</div>
            <a
                className={brandingLogoStyle}
                href={branding.logo.link}
                data-sponsor={branding.sponsorName.toLowerCase()}
                rel="nofollow"
                aria-label={`Visit the ${branding.sponsorName} website`}
            >
                <img
                    src={branding.logo.src}
                    width={branding.logo.dimensions.width}
                    height={branding.logo.dimensions.height}
                    alt={branding.sponsorName}
                />
            </a>
            <a
                href={branding.aboutThisLink}
                className={brandingAboutLink(pillar)}
            >
                About this content
            </a>
        </div>
    );
};
