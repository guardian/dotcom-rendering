// tslint:disable:react-no-dangerous-html

import React from 'react';
import { css, cx } from 'emotion';

import { palette } from '@guardian/pasteup/palette';
import { from, tablet } from '@guardian/pasteup/breakpoints';
import { headline, textSans } from '@guardian/pasteup/typography';
import { pillarMap, pillarPalette } from '@frontend/lib/pillars';
import { ArticleRenderer } from '@frontend/web/components/lib/ArticleRenderer';
import { getSharingUrls } from '@frontend/model/sharing-urls';

import { SharingIcons } from './ShareIcons';
import { SubMetaLinksList } from './SubMetaLinksList';
import { SyndicationButton } from './SyndicationButton';

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

const listStyles = css`
    li {
        ${textSans(5)};
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
    ${textSans(1)};
    color: ${palette.neutral[46]};
`;

const bodyStyle = css`
    ${from.tablet.until.desktop} {
        padding-right: 80px;
    }

    h2 {
        ${headline(3)};
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

    ${tablet} {
        ul {
            margin-bottom: 16px;
        }
    }

    ${listStyles};
`;

const immersiveBodyStyle = css`
    h2 {
        ${headline(7)};
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
    ${textSans(1)};
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

export const ArticleBody: React.FC<{
    CAPI: CAPIType;
    config: ConfigType;
}> = ({ CAPI, config }) => {
    const hasSubMetaSectionLinks = CAPI.subMetaSectionLinks.length > 0;
    const hasSubMetaKeywordLinks = CAPI.subMetaKeywordLinks.length > 0;
    const sharingUrls = getSharingUrls(CAPI.pageId, CAPI.webTitle);
    return (
        <div>
            <div
                className={cx(bodyStyle, linkColour[CAPI.pillar], {
                    [immersiveBodyStyle]: CAPI.isImmersive,
                })}
            >
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
        </div>
    );
};
