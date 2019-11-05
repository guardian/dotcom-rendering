import React from 'react';
import { css, cx } from 'emotion';
import { from, until } from '@guardian/src-foundations/mq';
import { labelStyles } from '@root/src/web/components/AdSlot';

const articleContainer = css`
    ${until.leftCol} {
        /* below 1140 */
        padding-left: 0;
    }

    ${from.leftCol} {
        /* above 1140 */
        padding-left: 10px;
    }

    flex-grow: 1;
`;

const articleAdStyles = css`
    .ad-slot  {
        width: 300px;
        margin: 12px auto;
        min-width: 300px;
        min-height: 274px;
        text-align: center;
    }
    .ad-slot--mostpop  {
        ${from.desktop}  {
            margin: 0;
            width: auto;
        }
    }
    .ad-slot--inline  {
        ${from.desktop}  {
            margin: 0;
            width: auto;
            float: right;
            margin-top: 4px;
            margin-left: 20px;
        }
    }
    .ad-slot--offset-right  {
        ${from.desktop}  {
            float: right;
            width: auto;
            margin-right: -328px;
        }

        ${from.wide}  {
            margin-right: -408px;
        }
    }
    .ad-slot--outstream  {
        ${from.tablet}  {
            margin-left: 0;

            .ad-slot__label  {
                margin-left: 35px;
                margin-right: 35px;
            }
        }
    }
    ${labelStyles};
`;

type Props = {
    children: JSX.Element | JSX.Element[];
};

export const ArticleContainer = ({ children }: Props) => {
    return (
        <main className={cx(articleContainer, articleAdStyles)}>
            {children}
        </main>
    );
};
