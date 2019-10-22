import React from 'react';
import { css } from 'emotion';
import Quote from '@frontend/static/icons/quote.svg';
import { pillarPalette } from '@frontend/lib/pillars';
import {
    palette,
    body,
    desktop,
    leftCol,
    phablet,
    mobileLandscape,
} from '@guardian/src-foundations';
import { unescapeData } from '@frontend/lib/escapeData';

const gutter = 20;
const quoteTail = 25;
const quoteMark = 35;

const gsSpan = (nColumns: number) => nColumns * 60 + gutter * (nColumns - 1);

const commonStyles = (pillar: Pillar) =>
    css(`
    font-weight: bold;
    position: relative;
    background-color: ${palette.neutral[97]};
    padding: 0.375rem 0.625rem 0.75rem;
    margin-bottom: 1.75rem;
    color: ${pillarPalette[pillar].dark};

    :after {
        content: '';
        width: ${quoteTail}px;
        height: ${quoteTail}px;
        bottom: -${quoteTail}px;
        position: absolute;
        background-color: ${palette.neutral[97]};
    }

    cite,
    svg {
        color: ${pillarPalette[pillar].main};
        fill: ${pillarPalette[pillar].main};
    }
`);

const supportingStyles = (pillar: Pillar) =>
    css(
        `
        width: ${gsSpan(3)}px;
        margin-left: -${gutter / 2}px;
        margin-right: 0.6rem;
        clear: left;
        float: left;
        ${body({ level: 2 })};

        ${leftCol} {
            margin-left: -${gutter / 2 + gsSpan(3) / 2}px;
        }

        :after {
            left: ${gutter / 2};
            border-radius: 0 0 ${quoteTail}px;

            ${leftCol} {
                border-radius: 0 0 0 ${quoteTail}px;
                left: 0rem;
                margin-left: ${gsSpan(3) / 2 - quoteTail + 1}px;
            }
        }`,
        commonStyles(pillar),
    );

const inlineStyles = (pillar: Pillar) =>
    css(
        `
        margin-left: 0rem;
        display: block;
        ${body({ level: 2 })};

        ${mobileLandscape} {
            margin-left: -${gutter}px;
        }
        ${phablet} {
            margin-left: -${gutter / 2}px;
        }
        ${leftCol} {
            margin-left: -3.5rem;
        }

        :after {
            left: 0rem;
            border-radius: 0 0 ${quoteTail}px;

            ${mobileLandscape} {
                left: ${gutter}px;
            }
            ${phablet} {
                left: ${gutter / 2}px;
            }
            ${desktop} {
                left: 0px;
            }
            ${leftCol} {
                left: ${quoteMark + gutter / 2}px;
            }
        }`,
        commonStyles(pillar),
    );

function getStyles(role: string, pillar: Pillar) {
    return role === 'supporting'
        ? supportingStyles(pillar)
        : inlineStyles(pillar);
}

export const PullQuoteComponent: React.FC<{
    html: string;
    pillar: Pillar;
    role: string;
    attribution?: string;
}> = ({ html, pillar, attribution, role }) => (
    <aside className={getStyles(role, pillar)}>
        <Quote />{' '}
        <span // tslint:disable-line:react-no-dangerous-html
            dangerouslySetInnerHTML={{
                __html: unescapeData(html),
            }}
        />
        <footer>
            <cite>{attribution}</cite>
        </footer>
    </aside>
);
