// ----- Imports ----- //

import React, { FC, ReactElement, ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { headline } from '@guardian/src-foundations/typography';

import { Design, Format } from 'item';
import { Option } from 'types/option';
import { remSpace } from '@guardian/src-foundations';
import { getPillarStyles } from 'pillar';
import { getHref } from 'renderer';


// ----- Component ----- //

interface Props extends Format {
    bylineHtml: Option<DocumentFragment>;
};

const styles = (colour: string): SerializedStyles => css`
    ${headline.xxxsmall()}
    color: ${colour};
    margin-bottom: ${remSpace[1]};
`;

const commentStyles = css`
    ${headline.medium({ fontWeight: 'light', italic: true })}
`;

const anchorStyles = (colour: string): SerializedStyles => css`
    ${headline.xxxsmall({ fontWeight: 'bold' })}
    font-style: normal;
    color: ${colour};
    text-decoration: none;
`;

const getStyles = (format: Format): SerializedStyles => {
    switch (format.design) {
        case Design.Comment:
            return commentStyles;

        default:
            const colours = getPillarStyles(format.pillar);

            return styles(colours.kicker);
    }
}

const toReact = (format: Format) => (node: Node): ReactNode => {
    const colours = getPillarStyles(format.pillar);

    switch (node.nodeName) {
        case 'A':
            return (
                <a href={getHref(node).withDefault('')} css={anchorStyles(colours.kicker)}>
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
