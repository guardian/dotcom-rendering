// ----- Imports ----- //

import React, { FC, ReactElement, ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { headline } from '@guardian/src-foundations/typography';
import { background, neutral, text } from '@guardian/src-foundations/palette';
import { from } from '@guardian/src-foundations/mq';

import { Item, Design, Display } from 'item';
import { renderText } from 'renderer';
import { spaceToRem, textPadding, darkModeCss as darkMode } from 'styles';
import { PillarStyles, getPillarStyles } from 'pillar';


// ----- Component ----- //

interface Props {
    item: Item;
}

const darkStyles = ({ inverted }: PillarStyles): SerializedStyles => darkMode`
    background: ${background.inverse};
    color: ${neutral[86]};

    a {
        color: ${inverted};
    }
`;

const styles = (pillarStyles: PillarStyles): SerializedStyles => css`
    margin-bottom: ${spaceToRem(2)};
    ${textPadding}
    color: ${text.primary};

    p, ul {
        margin: 0;
    }

    address {
        font-style: normal;
    }

    ${darkStyles(pillarStyles)}
`;

const normalHeadline = css`
    ${headline.xxxsmall({ fontWeight: 'bold' })}
`;

const thinHeadline = css`
    ${headline.xxxsmall({ fontWeight: 'light' })}

    ${from.tablet} {
        ${headline.xxsmall({ fontWeight: 'light' })}
    }
`;

const immersive = (pillarStyles: PillarStyles): SerializedStyles => css`
    ${styles(pillarStyles)}
    ${headline.xsmall({ fontWeight: 'light' })}
    margin-top: ${spaceToRem(3)};

    a {
        box-shadow: inset 0 -0.1rem ${pillarStyles.kicker};
        padding-bottom: 0.2rem;
    }
`;

const getStyles = (item: Item): SerializedStyles => {
    const pillarStyles = getPillarStyles(item.pillar);

    if (item.display === Display.Immersive) {
        return immersive(pillarStyles);
    }

    switch (item.design) {
        case Design.Review:
        case Design.Feature:
        case Design.Comment:
            return css(styles(pillarStyles), thinHeadline);

        default:
            return css(styles(pillarStyles), normalHeadline);
    }
}

function content(standfirst: DocumentFragment, item: Item): ReactNode {
    const rendered = renderText(standfirst, item.pillar);

    // Immersives append the byline to the standfirst.
    // Sometimes CAPI includes this within the standfirst HTML,
    // sometimes we have to add it ourselves
    const bylineInStandfirst = item.byline !== '' && standfirst.textContent?.includes(item.byline);

    if (item.display === Display.Immersive && !bylineInStandfirst) {
        return item.bylineHtml.fmap<ReactNode>(byline =>
            <>
                {rendered}
                <address>
                    <p>By {renderText(byline, item.pillar)}</p>
                </address>
            </>
        ).withDefault(rendered);
    }

    return rendered;
}


const Standfirst: FC<Props> = ({ item }) =>
    item.standfirst.fmap<ReactElement | null>(standfirst =>
        <div css={getStyles(item)}>{content(standfirst, item)}</div>,
    ).withDefault(null);


// ----- Exports ----- //

export default Standfirst;
