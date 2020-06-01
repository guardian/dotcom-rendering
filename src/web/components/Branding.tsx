import React from 'react';
import { LinkStyle } from '@root/src/amp/components/elements/TextBlockComponent';
import { textSans } from '@guardian/src-foundations/typography';
import { css } from 'emotion';
import { ImageWrapper } from './Card/components/ImageWrapper';

const brandingStyle = (pillar: Pillar) => css`
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
    pillar: Pillar;
}> = ({ branding, pillar }) => {
    return (
        <div className={brandingStyle(pillar)}>
            <div className={brandingLabelStyle}>{branding.logo.label}</div>
            <a
                className={brandingLogoStyle}
                href={branding.logo.link}
                data-sponsor={branding.sponsorName.toLowerCase()}
                rel="nofollow"
                aria-label={`Visit the ${branding.sponsorName} website`}
            >
                <ImageWrapper>
                    <img
                        src={branding.logo.src}
                        width={branding.logo.dimensions.width}
                        height={branding.logo.dimensions.height}
                        alt={branding.sponsorName}
                    />
                </ImageWrapper>
            </a>
            <a href={branding.aboutThisLink}>About this content</a>
        </div>
    );
};
