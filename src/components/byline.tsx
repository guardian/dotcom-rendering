// ----- Imports ----- //

import React, { FC, ReactElement } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { headline } from '@guardian/src-foundations/typography';

import { Design, Format } from 'item';
import { renderText } from 'renderer';
import { Option } from 'types/option';
import { remSpace } from '@guardian/src-foundations';


// ----- Component ----- //

interface Props extends Format {
    bylineHtml: Option<DocumentFragment>,
};

const styles = css`
    ${headline.xxxsmall({ fontWeight: 'bold' })}
    font-style: normal;
    margin-bottom: ${remSpace[1]};
`;

const commentStyles = css`
    ${headline.medium({ fontWeight: 'light', italic: true })}
`;

const getStyles = (item: Format): SerializedStyles => {
    switch (item.design) {
        case Design.Comment:
            return commentStyles;
        default:
            return styles;
    }
}

const Byline: FC<Props> = ({ bylineHtml, ...format }) =>
    bylineHtml.fmap<ReactElement | null>(byline =>
        <address css={getStyles(format)}>
            {renderText(byline, format.pillar)}
        </address>
    ).withDefault(null);


// ----- Exports ----- //

export default Byline;
