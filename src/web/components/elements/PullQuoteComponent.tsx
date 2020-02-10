import React from 'react';
import { css, cx } from 'emotion';
import { QuoteIcon } from '@frontend/web/components/QuoteIcon';
import { pillarPalette } from '@root/src/lib/pillars';
import { palette } from '@guardian/src-foundations';
import { headline } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';
import { unescapeData } from '@root/src/lib/escapeData';

const gutter = 20;
const quoteTail = 25;
const quoteMark = 35;

const gsSpan = (nColumns: number) => nColumns * 60 + gutter * (nColumns - 1);

const commonStyles = (pillar: Pillar, designType: DesignType) => {
    switch (designType) {
        case 'Comment':
            return css`
                ${headline.xxsmall({ fontWeight: 'light' })};
                line-height: 25px;
                position: relative;
                /* TODO: Source foundation doesn't have this colour, once it does, remove the hex below */
                /* stylelint-disable-next-line color-no-hex */
                background-color: #fbe6d5;
                padding-left: 10px;
                padding-right: 10px;
                padding-top: 6px;
                padding-bottom: 12px;
                margin-bottom: 1.75rem;

                :after {
                    content: '';
                    width: ${quoteTail}px;
                    height: ${quoteTail}px;
                    bottom: -${quoteTail}px;
                    position: absolute;
                    /* TODO: Source foundation doesn't have this colour, once it does, remove the hex below */
                    /* stylelint-disable-next-line color-no-hex */
                    background-color: #fbe6d5;
                }
            `;
        default:
            return css`
                ${headline.xxsmall({ fontWeight: 'bold' })};
                line-height: 25px;
                position: relative;
                background-color: ${palette.neutral[97]};
                padding-left: 10px;
                padding-right: 10px;
                padding-top: 6px;
                padding-bottom: 12px;
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
            `;
    }
};

const supportingStyles = (pillar: Pillar) =>
    css`
        width: ${gsSpan(3)}px;
        margin-left: -${gutter / 2}px;
        margin-right: 0.6rem;
        clear: left;
        float: left;

        ${from.leftCol} {
            margin-left: -${gutter / 2 + gsSpan(3) / 2}px;
        }

        :after {
            left: ${gutter / 2};
            border-radius: 0 0 ${quoteTail}px;

            ${from.leftCol} {
                border-radius: 0 0 0 ${quoteTail}px;
                left: 0rem;
                margin-left: ${gsSpan(3) / 2 - quoteTail + 1}px;
            }
        }
    `;

const inlineStyles = (pillar: Pillar) =>
    css`
        margin-left: 0rem;
        display: block;

        ${from.mobileLandscape} {
            margin-left: -${gutter}px;
        }
        ${from.phablet} {
            margin-left: -${gutter / 2}px;
        }
        ${from.leftCol} {
            margin-left: -3.5rem;
        }

        :after {
            left: 0rem;
            border-radius: 0 0 ${quoteTail}px;

            ${from.mobileLandscape} {
                left: ${gutter}px;
            }
            ${from.phablet} {
                left: ${gutter / 2}px;
            }
            ${from.desktop} {
                left: 0px;
            }
            ${from.leftCol} {
                left: ${quoteMark + gutter / 2}px;
            }
        }
    `;

function getStyles(role: string, pillar: Pillar) {
    return role === 'supporting'
        ? supportingStyles(pillar)
        : inlineStyles(pillar);
}

export const PullQuoteComponent: React.FC<{
    html: string;
    pillar: Pillar;
    designType: DesignType;
    role: string;
    attribution?: string;
}> = ({ html, pillar, designType, attribution, role }) => (
    <aside
        className={cx(
            getStyles(role, pillar),
            commonStyles(pillar, designType),
        )}
    >
        <QuoteIcon colour={pillarPalette[pillar].main} />
        <blockquote
            className={css`
                display: inline;
            `}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
                __html: unescapeData(html),
            }}
        />
        <footer>
            <cite>{attribution}</cite>
        </footer>
    </aside>
);
