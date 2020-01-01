import React from 'react';
import { css, cx } from 'emotion';
import { from, until } from '@guardian/src-foundations/mq';
import { labelStyles } from '@root/src/web/components/AdSlot';

const articleContainer = css`
    /* Set min-width: 0 here to prevent flex children breaking out of the
    containing parent. This ws happening for embedded tweets which have
    a width: 500px property.
    See: https://stackoverflow.com/a/47457331 */
    min-width: 0;

    ${until.leftCol} {
        /* below 1140 */
        padding-left: 0;
    }

    flex-grow: 1;
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
};

export const ArticleContainer = ({ children }: Props) => {
    return (
        <main className={cx(articleContainer, articleAdStyles)}>
            {children}
        </main>
    );
};
