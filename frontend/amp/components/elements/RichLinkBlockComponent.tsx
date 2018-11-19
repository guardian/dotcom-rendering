import React from 'react';
import { css } from 'emotion';
import { palette } from '@guardian/pasteup/palette';
import { serif, sans } from '@guardian/pasteup/fonts';
import { pillarPalette } from '@frontend/lib/pillars';

export const RichLinkBlockComponent: React.SFC<{
    element: RichLinkBlockElement;
    pillar: Pillar;
}> = ({ element, pillar }) => {
    if (element.sponsorship) {
        throw new Error('Sponsored rich links not supported');
    }
    return (
        <aside className={style}>
            <a className={linkStyle(pillar)} href={element.url}>
                {element.text}
            </a>
        </aside>
    );
};

const style = css`
    float: left;
    width: 140px;
    padding: 4px;
    padding-bottom: 18px;

    margin: 4px 10px 12px 0;
    background-color: ${palette.neutral[93]};
    border-top: 1px solid ${palette.neutral[86]};
    margin-right: 20px;
`;
const linkStyle = (pillar: Pillar) => css`
    color: ${pillarPalette[pillar].main};
    font-family: ${serif.headline};
    font-weight: 500;
    border: 0;
    text-decoration: none;
    font-size: 14px;
    line-height: 16px;
    word-wrap: break-word;
    :hover {
        text-decoration: underline;
    }
    ::before {
        content: 'More on this topic';
        display: block;
        color: ${palette.neutral[46]};
        font-size: 12px;
        line-height: 16px;
        font-family: ${sans.body};
        font-weight: 400;
    }
`;
