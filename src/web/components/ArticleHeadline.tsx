import React from 'react';
import { css, cx } from 'emotion';

import { pillarPalette } from '@root/src/lib/pillars';
import { HeadlineTag } from '@root/src/web/components/HeadlineTag';
import { HeadlineByline } from '@root/src/web/components/HeadlineByline';

import { headline } from '@guardian/src-foundations/typography';
import { from, until } from '@guardian/src-foundations/mq';
import { neutral, space } from '@guardian/src-foundations';
import { Display } from '@root/src/lib/display';
import { getZIndex } from '@frontend/web/lib/getZIndex';

type Props = {
    headlineString: string;
    display: Display;
    designType: DesignType; // Decides headline appearance
    pillar: Pillar; // Decides headline colour when relevant
    byline?: string;
    tags: TagType[];
    isShowcase?: boolean; // Used for Interviews to change headline position
    noMainMedia?: boolean; // Used for Immersives where the headline styles
    // change when there is no main media
};

const curly = (x: any) => x;

const standardFont = css`
    ${headline.medium()};
    ${until.tablet} {
        ${headline.small()};
    }
`;

const boldFont = css`
    ${headline.medium({ fontWeight: 'bold' })};
    ${until.tablet} {
        ${headline.small({ fontWeight: 'bold' })};
    }
`;

const jumboFont = css`
    ${headline.xlarge({ fontWeight: 'bold' })};
    line-height: 56px;
    ${until.desktop} {
        ${headline.medium({ fontWeight: 'bold' })};
    }
`;

const invertedFont = css`
    ${headline.medium({ fontWeight: 'bold' })};
    line-height: 42px;
    ${until.tablet} {
        ${headline.small({ fontWeight: 'bold' })};
    }
`;

const lightFont = css`
    ${headline.medium({ fontWeight: 'light' })};
    font-size: 2.125rem;
    line-height: 2.375rem;
    ${until.mobileMedium} {
        ${headline.small({ fontWeight: 'light' })};
    }
`;

const underlinedStyles = css`
    background-image: repeating-linear-gradient(
        to bottom,
        transparent,
        transparent 47px,
        rgba(171, 6, 19, 0.5)
    );
    line-height: 48px;
    background-size: 1rem 48px;
    ${until.tablet} {
        background-image: repeating-linear-gradient(
            to bottom,
            transparent,
            transparent 39px,
            rgba(171, 6, 19, 0.5)
        );
        line-height: 40px;
        background-size: 1px 40px;
    }

    background-position: top left;
    background-clip: content-box;
    background-origin: content-box;
`;

const colourStyles = (colour?: string) => css`
    color: ${colour && colour};
`;

const displayBlock = css`
    display: block;
`;

const displayInline = css`
    display: inline;
`;

const displayFlex = css`
    display: flex;
    flex-direction: column;
`;

const shiftSlightly = css`
    margin-bottom: 16px;
`;

const invertedStyles = css`
    position: relative;
    color: white;
    white-space: pre-wrap;
    padding-bottom: ${space[1]}px;
    padding-right: ${space[1]}px;
    box-shadow: -6px 0 0 black;
    /* Box decoration is required to push the box shadow out on Firefox */
    box-decoration-break: clone;
`;

const immersiveStyles = css`
    min-height: 112px;
    padding-bottom: ${space[9]}px;
    padding-left: ${space[1]}px;
    ${from.mobileLandscape} {
        padding-left: ${space[3]}px;
    }
    ${from.tablet} {
        padding-left: ${space[1]}px;
    }
    margin-right: ${space[5]}px;
`;

const blackBackground = css`
    background-color: ${neutral[0]};
`;

const invertedText = css`
    color: white;
    white-space: pre-wrap;
    padding-bottom: ${space[1]}px;
    padding-right: ${space[1]}px;
`;

const maxWidth = css`
    ${from.desktop} {
        max-width: 620px;
    }
`;

const invertedWrapper = css`
    /*
        Make sure we vertically align the headline font with the body font
    */
    margin-left: 6px;
    ${from.tablet} {
        margin-left: 16px;
    }
    ${from.leftCol} {
        margin-left: 25px;
    }
    /* 
        We need this grow to ensure the headline fills the main content column
    */
    flex-grow: 1;
    /* 
        This z-index is what ensures the headline text shows above the pseudo black
        box that extends the black background to the right
    */
    ${getZIndex('articleHeadline')}
    ${until.mobileLandscape} {
        margin-right: 40px;
    }
`;

// Due to MainMedia using position: relative, this seems to effect the rendering order
// To mitigate we use z-index
// TODO: find a cleaner solution
const zIndex = css`
    z-index: 1;
`;

export const ArticleHeadline = ({
    headlineString,
    display,
    designType,
    pillar,
    tags,
    byline,
    noMainMedia,
}: Props) => {
    switch (display) {
        case Display.Immersive: {
            switch (designType) {
                case 'Comment':
                case 'GuardianView':
                    return (
                        <>
                            <h1 className={cx(lightFont, invertedText)}>
                                {curly(headlineString)}
                            </h1>
                            {byline && (
                                <HeadlineByline
                                    display={display}
                                    designType={designType}
                                    pillar={pillar}
                                    byline={byline}
                                    tags={tags}
                                />
                            )}
                        </>
                    );
                case 'Review':
                case 'Recipe':
                case 'Feature':
                case 'Analysis':
                case 'Interview':
                case 'Live':
                case 'Media':
                case 'PhotoEssay':
                case 'Article':
                case 'SpecialReport':
                case 'MatchReport':
                case 'GuardianLabs':
                case 'Quiz':
                case 'AdvertisementFeature':
                case 'Immersive':
                default:
                    if (noMainMedia) {
                        return (
                            // Immersive headlines have two versions, with main media, and (this one) without
                            <h1
                                className={cx(
                                    jumboFont,
                                    maxWidth,
                                    immersiveStyles,
                                    displayBlock,
                                )}
                            >
                                {curly(headlineString)}
                            </h1>
                        );
                    }
                    return (
                        // Immersive headlines with main media present, are large and inverted with
                        // a black background
                        <h1 className={cx(invertedWrapper, blackBackground)}>
                            <span
                                className={cx(
                                    jumboFont,
                                    maxWidth,
                                    invertedStyles,
                                    immersiveStyles,
                                    displayBlock,
                                )}
                            >
                                {curly(headlineString)}
                            </span>
                        </h1>
                    );
            }
        }
        case Display.Showcase:
        case Display.Standard:
        default: {
            switch (designType) {
                case 'Review':
                case 'Recipe':
                case 'Feature':
                    return (
                        <h1
                            className={cx(
                                boldFont,
                                colourStyles(pillarPalette[pillar].dark),
                            )}
                        >
                            {curly(headlineString)}
                        </h1>
                    );
                case 'Comment':
                case 'GuardianView':
                    return (
                        <>
                            <h1 className={lightFont}>
                                {curly(headlineString)}
                            </h1>
                            {byline && (
                                <HeadlineByline
                                    display={display}
                                    designType={designType}
                                    pillar={pillar}
                                    byline={byline}
                                    tags={tags}
                                />
                            )}
                        </>
                    );
                case 'Analysis':
                    return (
                        <h1 className={cx(standardFont, underlinedStyles)}>
                            {curly(headlineString)}
                        </h1>
                    );
                case 'Interview':
                    return (
                        // Inverted headlines have a wrapper div for positioning
                        // and a black background (only for the text)
                        <div
                            className={cx(shiftSlightly, maxWidth, displayFlex)}
                        >
                            <HeadlineTag tagText="Interview" pillar={pillar} />
                            <h1
                                className={cx(
                                    invertedFont,
                                    invertedWrapper,
                                    zIndex,
                                )}
                            >
                                <span
                                    className={cx(
                                        blackBackground,
                                        invertedStyles,
                                        displayInline,
                                    )}
                                >
                                    {curly(headlineString)}
                                </span>
                            </h1>
                            {byline && (
                                <HeadlineByline
                                    display={display}
                                    designType={designType}
                                    pillar={pillar}
                                    byline={byline}
                                    tags={tags}
                                />
                            )}
                        </div>
                    );
                case 'Live':
                case 'Media':
                case 'PhotoEssay':
                case 'Article':
                case 'SpecialReport':
                case 'MatchReport':
                case 'GuardianLabs':
                case 'Quiz':
                case 'AdvertisementFeature':
                case 'Immersive':
                default:
                    return (
                        <h1 className={standardFont}>
                            {curly(headlineString)}
                        </h1>
                    );
            }
        }
    }
};
