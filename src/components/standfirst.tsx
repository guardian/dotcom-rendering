// ----- Imports ----- //

import React, {FC, ReactElement, ReactNode} from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { background, neutral, text } from '@guardian/src-foundations/palette';
import { remSpace } from '@guardian/src-foundations';

import { Item, getFormat } from 'item';
import { renderStandfirstText } from 'renderer';
import { darkModeCss as darkMode } from 'styles';
import { Display, Design } from 'format';


// ----- Component ----- //

interface Props {
    item: Item;
}

const darkStyles: SerializedStyles = darkMode`
    background: ${background.inverse};
    color: ${neutral[60]};

    a {
        color: ${neutral[60]};
        border-bottom: 0.0625rem solid ${neutral[46]};
    }
`;

const styles: SerializedStyles = css`
    margin-bottom: ${remSpace[2]};
    color: ${text.primary};

    p, ul {
        margin: ${remSpace[2]} 0;
    }

    address {
        font-style: normal;
    }

    ${darkStyles}
`;

const normalHeadline = css`
    ${headline.xxxsmall({ fontWeight: 'bold' })}
    padding: 0;
`;

const thinHeadline = css`
    ${headline.xxsmall({ fontWeight: 'light' })}
`;

const immersive: SerializedStyles = css`
    ${styles}
    ${headline.xsmall({ fontWeight: 'light' })}
    margin-top: ${remSpace[3]};
`;

const media = css`
    color: ${neutral[86]};
    p, ul, li {
        ${headline.xxxsmall({ lineHeight: 'loose' })}
        margin: 0;
    }
    
    li:before {
        height: 0.7rem;
        width: 0.7rem;
    }
`;

const advertisementFeature = css`
    ${styles}
    ${textSans.medium()}
`

const getStyles = (item: Item): SerializedStyles => {
    if (item.display === Display.Immersive) {
        return immersive;
    }

    switch (item.design) {
        case Design.Review:
        case Design.Feature:
        case Design.Comment:
            return css(styles, thinHeadline);
        case Design.Media:
            return media;
        case Design.AdvertisementFeature:
            return advertisementFeature;

        default:
            return css(styles, normalHeadline);
    }
}

function content(standfirst: DocumentFragment, item: Item): ReactNode {
    const format = getFormat(item);
    const rendered = renderStandfirstText(standfirst, format);

    // Immersives append the byline to the standfirst.
    // Sometimes CAPI includes this within the standfirst HTML,
    // sometimes we have to add it ourselves
    const bylineInStandfirst = item.byline !== '' && standfirst.textContent?.includes(item.byline);

    if (item.display === Display.Immersive && !bylineInStandfirst) {
        return item.bylineHtml.fmap<ReactNode>(byline =>
            <>
                {rendered}
                <address>
                    <p>By {renderStandfirstText(byline, format)}</p>
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
