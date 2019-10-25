import React from 'react';
import { css, cx } from 'emotion';
import { leftCol, desktop, wide, tablet } from '@guardian/src-foundations';
import { until } from '@guardian/src-utilities';
import { labelStyles } from '@frontend/web/components/AdSlot';

const articleContainer = css`
    ${until.leftCol} {
        /* below 1140 */
        padding-left: 0;
    }

    ${leftCol} {
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
        ${desktop}  {
            margin: 0;
            width: auto;
        }
    }
    .ad-slot--inline  {
        ${desktop}  {
            margin: 0;
            width: auto;
            float: right;
            margin-top: 4px;
            margin-left: 20px;
        }
    }
    .ad-slot--offset-right  {
        ${desktop}  {
            float: right;
            width: auto;
            margin-right: -328px;
        }

        ${wide}  {
            margin-right: -408px;
        }
    }
    .ad-slot--outstream  {
        ${tablet}  {
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
