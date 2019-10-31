// tslint:disable:react-no-dangerous-html

import React from 'react';
import { css, cx } from 'emotion';

import { textSans, headline, palette } from '@guardian/src-foundations';
import { from, between } from '@guardian/src-utilities';
import { pillarMap, pillarPalette } from '@root/src/lib/pillars';
import { ArticleRenderer } from '@root/src/web/components/lib/ArticleRenderer';
import { getSharingUrls } from '@root/src/lib/sharing-urls';

import { SharingIcons } from '@root/src/web/components/ShareIcons';
import { SubMetaLinksList } from '@root/src/web/components/SubMetaLinksList';
import { SyndicationButton } from '@root/src/web/components/SyndicationButton';
import { ArticleStandfirst } from '@root/src/web/components/ArticleStandfirst';
import { Hide } from '@root/src/web/components/Hide';

const pillarColours = pillarMap(
    pillar =>
        css`
            color: ${pillarPalette[pillar].main};
        `,
);

// TODO refactor  to use in Caption.tsx
// const pillarFigCaptionIconColor = pillarMap(
//     pillar =>
//         css`
//             figcaption {
//                 &::before {
//                     border-color: transparent transparent
//                         ${pillarPalette[pillar].main} transparent;
//                 }
//             }
//         `,
// );

const guardianLines = css`
    background-image: repeating-linear-gradient(
        to bottom,
        ${palette.neutral[86]},
        ${palette.neutral[86]} 1px,
        transparent 1px,
        transparent 4px
    );
    background-repeat: repeat-x;
    background-position: top;
    background-size: 1px 13px;
    padding-top: 15px;
    margin-bottom: 6px;
`;

const captionFont = css`
    ${textSans({ level: 1 })};
    color: ${palette.neutral[46]};
`;

const bodyStyle = css`
    ${between.tablet.and.desktop} {
        padding-right: 80px;
    }

    h2 {
        ${headline({ level: 2 })};
    }

    strong {
        font-weight: bold;
    }

    img {
        width: 100%;
        height: auto;
    }

    figcaption {
        ${captionFont};
    }

    figure {
        margin-top: 16px;
        margin-bottom: 12px;
    }

    ul {
        margin-bottom: 12px;
    }

    ${from.tablet} {
        ul {
            margin-bottom: 16px;
        }
    }

    li {
        ${textSans({ level: 3 })};
        margin-bottom: 6px;
        padding-left: 20px;

        p {
            display: inline;
        }
    }

    li:before {
        display: inline-block;
        content: '';
        border-radius: 6px;
        height: 12px;
        width: 12px;
        margin-right: 8px;
        background-color: ${palette.neutral[86]};
        margin-left: -20px;
    }
`;

const immersiveBodyStyle = css`
    h2 {
        ${headline({ level: 5 })};
        font-weight: 200;
    }
`;

const linkColour = pillarMap(
    pillar => css`
        a {
            text-decoration: none;
            border-bottom: 1px solid ${palette.neutral[86]};
            ${pillarColours[pillar]};

            :hover {
                border-bottom: 1px solid ${pillarPalette[pillar].main};
            }
        }
    `,
);

const subMeta = css`
    margin-top: 12px;
    padding-top: 18px;
`;

const subMetaLabel = css`
    ${textSans({ level: 1 })};
    display: block;
    color: ${palette.neutral[60]};
`;

const subMetaSharingIcons = css`
    :after {
        content: '';
        display: block;
        clear: left;
    }
`;

const maxWidth = css`
    max-width: 630px;
`;

export const ArticleBody: React.FC<{
    CAPI: CAPIType;
    config: ConfigType;
    isShowcase?: boolean;
}> = ({ CAPI, config, isShowcase }) => {
    const hasSubMetaSectionLinks = CAPI.subMetaSectionLinks.length > 0;
    const hasSubMetaKeywordLinks = CAPI.subMetaKeywordLinks.length > 0;
    const sharingUrls = getSharingUrls(CAPI.pageId, CAPI.webTitle);
    return (
        <main className={maxWidth}>
            <div
                className={cx(bodyStyle, linkColour[CAPI.pillar], {
                    [immersiveBodyStyle]: CAPI.isImmersive,
                })}
            >
                {isShowcase && (
                    // For articles with main media set as showcase, the standfirst sometimes
                    // sits inside here so that the right column advert does not get pushed down
                    <Hide when="below" breakpoint="leftCol">
                        <ArticleStandfirst
                            pillar={CAPI.pillar}
                            standfirst={CAPI.standfirst}
                        />
                    </Hide>
                )}
                <ArticleRenderer
                    elements={CAPI.blocks[0] ? CAPI.blocks[0].elements : []}
                    pillar={CAPI.pillar}
                    config={CAPI.config}
                />
            </div>
            <div className={cx(subMeta, guardianLines)}>
                {(hasSubMetaSectionLinks || hasSubMetaKeywordLinks) && (
                    <span className={subMetaLabel}>Topics</span>
                )}
                {hasSubMetaSectionLinks && (
                    <SubMetaLinksList
                        links={CAPI.subMetaSectionLinks}
                        isSectionLinkList={true}
                        pillar={CAPI.pillar}
                    />
                )}
                {hasSubMetaKeywordLinks && (
                    <SubMetaLinksList
                        links={CAPI.subMetaKeywordLinks}
                        isSectionLinkList={false}
                        pillar={CAPI.pillar}
                    />
                )}
                {CAPI.showBottomSocialButtons && (
                    <SharingIcons
                        className={subMetaSharingIcons}
                        sharingUrls={sharingUrls}
                        pillar={CAPI.pillar}
                        displayIcons={[
                            'facebook',
                            'twitter',
                            'email',
                            'linkedIn',
                            'pinterest',
                            'whatsApp',
                            'messenger',
                        ]}
                    />
                )}
                {CAPI.showBottomSocialButtons && (
                    <SyndicationButton
                        webUrl={CAPI.webURL}
                        internalPageCode={CAPI.pageId}
                    />
                )}
            </div>
        </main>
    );
};
