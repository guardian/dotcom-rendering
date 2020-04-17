// ----- Imports ----- //

import React, { FC, ReactElement, ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { headline } from '@guardian/src-foundations/typography';

import { Design, Format } from 'format';
import { Option } from 'types/option';
import { neutral } from '@guardian/src-foundations';
import { getPillarStyles } from 'pillarStyles';
import { getHref } from 'renderer';
import { darkModeCss } from 'styles';


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

const commentStyles = css`
    ${headline.medium({ fontWeight: 'light', italic: true })}
`;

const commentAnchorStyles = (kicker: string, inverted: string): SerializedStyles => css`
    color: ${kicker};
    text-decoration: none;

    ${darkModeCss`
        color: ${inverted};
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

const getStyles = (format: Format): SerializedStyles => {
    const { kicker } = getPillarStyles(format.pillar);

    switch (format.design) {
        case Design.Comment:
            return commentStyles;

        default:
            return styles(kicker);
    }
}

const getAnchorStyles = (format: Format): SerializedStyles => {
    const { kicker, inverted } = getPillarStyles(format.pillar);

    switch (format.design) {
        case Design.Comment:
            return commentAnchorStyles(kicker, inverted);
        
        default:
            return anchorStyles(kicker, inverted);
    }
}

const toReact = (format: Format) => (node: Node): ReactNode => {
    switch (node.nodeName) {
        case 'A':
            return (
                <a href={getHref(node).withDefault('')} css={getAnchorStyles(format)}>
                    {node.textContent ?? ''}
                </a>
            );
        case '#text':
            return node.textContent;
    }
}

const renderText = (format: Format, byline: DocumentFragment): ReactNode =>
    Array.from(byline.childNodes).map(toReact(format));

const Byline: FC<Props> = ({ bylineHtml, ...format }) =>
    bylineHtml.fmap<ReactElement | null>(byline =>
        <address css={getStyles(format)}>
            {renderText(format, byline)}
        </address>
    ).withDefault(null);


// ----- Exports ----- //

export default Byline;
