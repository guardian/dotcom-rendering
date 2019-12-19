import React from 'react';
import { css, cx } from 'emotion';
import { palette } from '@guardian/src-foundations';
import { from, until } from '@guardian/src-foundations/mq';
import { labelStyles } from '@root/src/web/components/AdSlot';

const articleBodyContainer = css`
    max-width: 620px;
    padding-left: 10px;
    position: relative;
    left: 229px;
    /* Set min-width: 0 here to prevent flex children breaking out of the
    containing parent. This ws happening for embedded tweets which have
    a width: 500px property.
    See: https://stackoverflow.com/a/47457331 */
    min-width: 0;

    flex-basis: 620px;
    order: 7;

    border-left: 1px solid ${palette.neutral[86]};

    ${until.wide} {
        left: 150px;
    }

    ${until.leftCol} {
        padding-left: 0;
        max-width: 100%;
        left: 0;

        flex-basis: 100%;

        border-left: 0;
    }

    ${until.phablet} {
        padding: 0 10px;
    }
`;

const articleAdStyles = css`
    .ad-slot {
        width: 300px;
        margin: 12px auto;
        min-width: 300px;
        min-height: 274px;
        text-align: center;
    }
    .ad-slot--mostpop {
        ${from.desktop} {
            margin: 0;
            width: auto;
        }
    }
    .ad-slot--inline {
        ${from.desktop} {
            margin: 0;
            width: auto;
            float: right;
            margin-top: 4px;
            margin-left: 20px;
        }
    }
    .ad-slot--offset-right {
        ${from.desktop} {
            float: right;
            width: auto;
            margin-right: -328px;
        }

        ${from.wide}  {
            margin-right: -388px;
        }
    }
    .ad-slot--outstream {
        ${from.tablet} {
            margin-left: 0;

            .ad-slot__label {
                margin-left: 35px;
                margin-right: 35px;
            }
        }
    }
    ${labelStyles};
`;

type Props = {
    children: JSXElements;
    layoutType?: LayoutType;
};

export const ArticleBodyContainer = ({ children }: Props) => {
    return (
        <main className={cx(articleBodyContainer, articleAdStyles)}>
            {children}
        </main>
    );
};
