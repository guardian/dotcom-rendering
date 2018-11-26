import React from 'react';
import { css } from 'react-emotion';
import { pillarPalette } from '@frontend/lib/pillars';
import { serif } from '@guardian/pasteup/fonts';
import { palette } from '@guardian/pasteup/palette';

const guardianLines = css`
    background-image: repeating-linear-gradient(
        to bottom,
        ${palette.neutral[86]},
        ${palette.neutral[86]} 1px,
        transparent 1px,
        transparent 4px
    );
    background-repeat: repeat-x;
    background-position: top;
    background-size: 1px 13px;
    padding-top: 18px;
    margin-bottom: 6px;

    margin-top: 0.75rem;
`;

const linkStyle = (pillar: Pillar) => css`
    position: relative;
    padding-left: 0.3rem;
    padding-right: 0.35rem;
    text-decoration: none;
    color: ${pillarPalette[pillar].main};
    font-family: ${serif.body};
    font-size: 15px;

    :after {
        content: '/';
        font-size: 1em;
        position: absolute;
        pointer-events: none;
        top: 0;
        right: -0.19em;
        color: #767676;
    }
`;

const itemStyle = css`
    display: inline-block;

    :last-of-type > a::after {
        content: '';
    }
`;

const listStyle = css`
    display: inline;
    margin-left: -0.35rem;
`;

const Submeta: React.SFC<{
    pillar: Pillar;
    tags: TagType[];
}> = ({ pillar, tags }) => {
    const keywords = tags.filter(tag => tag.type === 'Keyword');

    const links = keywords.map(tag => (
        <li className={itemStyle} key={tag.id}>
            <a
                className={linkStyle(pillar)}
                href={`https://www.theguardian.com/${tag.id}`}
            >
                {tag.title}
            </a>
        </li>
    ));

    return (
        <div className={guardianLines}>
            <ul className={listStyle}>{links}</ul>
        </div>
    );
};

export default Submeta;
