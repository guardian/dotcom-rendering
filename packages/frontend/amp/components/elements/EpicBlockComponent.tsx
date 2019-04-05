import React from 'react';
import { css } from 'emotion';
import { headline, textSans } from '@guardian/pasteup/typography';
import { palette } from '@guardian/pasteup/palette';

// TODO use a better html parser
const parseHighlightedText = (text: string) => {
    const stringContainingHTMLSource = text
        .replace('%%CURRENCY_SYMBOL%%', '£')
        .replace('&ndash;', '-');
    return stringContainingHTMLSource;
};

// styles
const title = css`
    line-height: 1.5rem;
    font-weight: 900;
    margin-bottom: 0.75rem;
    ${headline(5)};
`;

const paragraph = css`
    ${textSans(5)};
    margin-bottom: 16px;
`;

const highlighted = css`
    ${textSans(5)};
    background-color: ${palette.highlight.main};
    padding: 0.125rem;
    font-weight: bold;
`;

export const EpicBlockComponent: React.FC<EpicElement> = (
    { heading, paragraphs, highlightedText },
    index,
) => {
    return (
        <div key={index}>
            <h1 className={title}>{heading}</h1>
            <p className={paragraph}> {paragraphs}</p>

            {highlightedText ? (
                <span className={highlighted}>
                    {parseHighlightedText(highlightedText)}
                </span>
            ) : null}
        </div>
    );
};
