import React from 'react';
import { LinkStyle } from '@frontend/amp/components/elements/Text';
import { textSans } from '@guardian/src-foundations';
import { css } from 'emotion';

const brandingStyle = (pillar: Pillar) => css`
    padding: 10px 0;
    ${LinkStyle(pillar)}

    a, a:hover {
        display: block;
        border-bottom: none;
        ${textSans({ level: 1 })}
    }
`;

const brandingLabelStyle = css`
    ${textSans({ level: 1 })};
`;

const brandingLogoStyle = css`
    padding: 10px 0;
`;

export const Branding: React.FC<{
    branding: Branding;
    pillar: Pillar;
}> = ({ branding, pillar }) => {
    const { logo, sponsorName } = branding;

    return (
        <div className={brandingStyle(pillar)}>
            <div className={brandingLabelStyle}>{branding.logo.label}</div>
            {/* tslint:disable-next-line: react-a11y-anchors */}
            <a
                className={brandingLogoStyle}
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
