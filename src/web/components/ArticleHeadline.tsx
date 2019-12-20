import React from 'react';
import { css, cx } from 'emotion';

import { pillarPalette } from '@root/src/lib/pillars';
import { getAgeWarning } from '@root/src/lib/age-warning';
import { AgeWarning } from '@root/src/web/components/AgeWarning';
import { HeadlineTag } from '@root/src/web/components/HeadlineTag';
import { headline } from '@guardian/src-foundations/typography';
import { from, until } from '@guardian/src-foundations/mq';

type Props = {
    headlineString: string;
    designType: DesignType; // Decides headline appearance
    pillar: Pillar; // Decides headline colour when relevant
    webPublicationDate: string; // Used for age warning
    tags: TagType[]; // Used for age warning
    isShowcase?: boolean; // Used for Interviews to change headline position
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

const standardPadding = css`
    padding-bottom: 24px;
    padding-top: 3px;
    ${from.tablet} {
        padding-bottom: 36px;
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

const shiftPosition = (shift?: 'up' | 'down') => css`
    margin-top: ${shift && shift === 'up' && '-100px'};
    margin-bottom: ${shift && shift === 'down' && '-50px'};
`;

const shiftSlightly = css`
    margin-bottom: 16px;
`;

const invertedStyles = css`
    position: relative;
    color: white;
    display: 'inline';
    white-space: pre-wrap;
    padding-bottom: 5px;
    padding-right: 5px;
    box-shadow: -6px 0 0 black;
    /* Box decoration is required to push the box shadow out on Firefox */
    box-decoration-break: clone;
`;

const blackBackground = css`
    background-color: black;
`;

const maxWidth = css`
    ${from.desktop} {
        max-width: 620px;
    }
`;

const invertedWrapper = css`
    /*
        Because we use box-shadow (to get clean and even background styles
        even when lines wrap) we need a margin on this wrapper div to
        shift everything back to the right
    */
    margin-left: 6px;
`;

const ageWarningMargins = css`
    margin-top: 12px;
    margin-left: -10px;
    margin-bottom: 6px;

    ${from.tablet} {
        margin-left: -20px;
    }

    ${from.leftCol} {
        margin-left: -10px;
        margin-top: 0;
    }
`;

const renderHeadline = (
    designType: DesignType,
    pillar: Pillar,
    isShowcase: boolean,
    headlineString: string,
    options?: {
        colour?: string;
    },
) => {
    switch (designType) {
        case 'Article':
        case 'Media':
        case 'Review':
        case 'Live':
        case 'SpecialReport':
        case 'Recipe':
        case 'MatchReport':
        case 'GuardianView':
        case 'GuardianLabs':
        case 'Quiz':
        case 'AdvertisementFeature':
            return (
                <h1 className={cx(standardFont, standardPadding)}>
                    {curly(headlineString)}
                </h1>
            );

        case 'Feature':
            return (
                <h1
                    className={cx(
                        boldFont,
                        standardPadding,
                        colourStyles(options && options.colour),
                    )}
                >
                    {curly(headlineString)}
                </h1>
            );

        case 'Comment':
            return (
                <h1 className={cx(lightFont, standardPadding)}>
                    {curly(headlineString)}
                </h1>
            );

        case 'Analysis':
            return (
                <h1
                    className={cx(
                        standardFont,
                        standardPadding,
                        underlinedStyles,
                    )}
                >
                    {curly(headlineString)}
                </h1>
            );

        case 'Interview':
            return (
                // Inverted headlines have a wrapper div for positioning
                // and a black background (only for the text)
                <>
                    <HeadlineTag tagText="Interview" pillar={pillar} />
                    <h1
                        className={cx(
                            invertedFont,
                            invertedWrapper,
                            // We only shift the inverted headline down when main media is showcase
                            isShowcase ? shiftPosition('down') : shiftSlightly,
                            maxWidth,
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
                </>
            );

        case 'Immersive':
            return (
                // Immersive headlines are large and inverted and have their black background
                // extended to the right
                <h1
                    className={cx(
                        invertedWrapper,
                        shiftPosition('up'),
                        blackBackground,
                    )}
                >
                    <span
                        className={cx(
                            jumboFont,
                            maxWidth,
                            invertedStyles,
                            displayBlock,
                        )}
                    >
                        {curly(headlineString)}
                    </span>
                </h1>
            );
    }
};

export const ArticleHeadline = ({
    headlineString,
    designType,
    pillar,
    webPublicationDate,
    tags,
    isShowcase = false,
}: Props) => {
    const age = getAgeWarning(tags, webPublicationDate);
    return (
        <>
            {age && (
                <div className={ageWarningMargins}>
                    <AgeWarning age={age} />
                </div>
            )}
            {renderHeadline(designType, pillar, isShowcase, headlineString, {
                colour: pillarPalette[pillar].dark,
            })}
            {age && <AgeWarning age={age} isScreenReader={true} />}
        </>
    );
};
