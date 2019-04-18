import React from 'react';
import { css, cx } from 'emotion';
import { palette } from '@guardian/pasteup/palette';
import { headline, textSans } from '@guardian/pasteup/typography';
import { pillarPalette } from '@frontend/lib/pillars';

const richLinkContainer = css`
    float: left;
    width: 140px;
    padding: 4px;
    padding-bottom: 18px;
    margin: 4px 10px 12px 0;
    background-color: ${palette.neutral[93]};
    border-top: 1px solid ${palette.neutral[86]};
    margin-right: 20px;
`;

const pillarColour = (pillar: Pillar) => css`
    color: ${pillarPalette[pillar].dark};
`;

const richLink = css`
    font-weight: 500;
    border: 0;
    text-decoration: none;
    ${headline(1)};
    word-wrap: break-word;
    :hover {
        text-decoration: underline;
    }
    ::before {
        ${textSans(1)};
        content: 'More on this topic';
        display: block;
        color: ${palette.neutral[46]};
        font-weight: 400;
    }
`;

export const RichLink: React.FC<{
    element: RichLinkBlockElement;
    pillar: Pillar;
}> = ({ element, pillar }) => (
    <aside className={richLinkContainer}>
        <a className={cx(richLink, pillarColour(pillar))} href={element.url}>
            {element.text}
        </a>
    </aside>
);
