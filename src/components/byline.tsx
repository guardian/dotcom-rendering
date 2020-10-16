// ----- Imports ----- //

import React, { FC, ReactElement, ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { headline, textSans } from '@guardian/src-foundations/typography';

import { Design, Format } from '@guardian/types/Format';
import { Option, withDefault, map } from '@guardian/types/option';
import { neutral, palette } from '@guardian/src-foundations';
import { getPillarStyles } from 'pillarStyles';
import { getHref } from 'renderer';
import { darkModeCss } from 'styles';
import { pipe2 } from 'lib';


// ----- Component ----- //

interface Props extends Format {
    bylineHtml: Option<DocumentFragment>;
}

const styles = (kicker: string): SerializedStyles => css`
    ${headline.xxxsmall()}
    color: ${kicker};

    ${darkModeCss`
        color: ${neutral[60]};
    `}
`;

const anchorStyles = (kicker: string, inverted: string): SerializedStyles => css`
    ${headline.xxxsmall({ fontWeight: 'bold' })}
    font-style: normal;
    color: ${kicker};
    text-decoration: none;

    ${darkModeCss`
        color: ${inverted};
    `}
`;

const commentStyles = (kicker: string): SerializedStyles => css`
    color: ${kicker};
    width: 75%;
    ${headline.medium({ fontWeight: 'light', fontStyle: 'italic' })}
`;

const commentAnchorStyles = (kicker: string, inverted: string): SerializedStyles => css`
    color: ${kicker};
    text-decoration: none;

    ${darkModeCss`
        color: ${inverted};
    `}
`;

const advertisementFeatureStyles = css`
    ${textSans.medium( { lineHeight: 'regular' })}
    color: ${palette.labs[300]};

    ${darkModeCss`
        color: ${palette.labs[400]};
    `}
`;

const advertisementFeatureAnchorStyles = css`
    font-weight: bold;
    color: ${palette.labs[300]};
    font-style: normal;
    text-decoration: none;

    ${darkModeCss`
        color: ${palette.labs[400]};
    `}
`;

const getStyles = (format: Format): SerializedStyles => {
    const { kicker } = getPillarStyles(format.pillar);

    switch (format.design) {
        case Design.Comment:
            return commentStyles(kicker);

        case Design.AdvertisementFeature:
            return advertisementFeatureStyles;

        default:
            return styles(kicker);
    }
}

const getAnchorStyles = (format: Format): SerializedStyles => {
    const { kicker, inverted } = getPillarStyles(format.pillar);

    switch (format.design) {
        case Design.Comment:
            return commentAnchorStyles(kicker, inverted);

        case Design.AdvertisementFeature:
            return advertisementFeatureAnchorStyles;

        default:
            return anchorStyles(kicker, inverted);
    }
}

const toReact = (format: Format) => (node: Node): ReactNode => {
    switch (node.nodeName) {
        case 'A':
            return (
                <a href={withDefault('')(getHref(node))} css={getAnchorStyles(format)}>
                    {node.textContent ?? ''}
                </a>
            );
        case 'SPAN':
            return Array.from(node.childNodes).map(toReact(format));
        case '#text':
            return node.textContent;
    }
}

const renderText = (format: Format, byline: DocumentFragment): ReactNode =>
    Array.from(byline.childNodes).map(toReact(format));

const Byline: FC<Props> = ({ bylineHtml, ...format }) =>
    pipe2(
        bylineHtml,
        map(byline =>
            <address css={getStyles(format)}>
                {renderText(format, byline)}
            </address>
        ),
        withDefault<ReactElement | null>(null),
    );


// ----- Exports ----- //

export default Byline;
