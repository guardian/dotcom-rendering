import React from 'react';
import { css, cx } from 'emotion';
import {
    phablet,
    until,
    desktop,
    wide,
    tablet,
} from '@guardian/src-foundations';
import { labelStyles } from '@frontend/web/components/AdSlot';

const articleContainer = css`
    padding-right: 20px;

    ${until.phablet} {
        padding-left: 10px;
    }

    ${phablet} {
        padding-left: 20px;
    }

    flex-grow: 1;
`;

const maxWidth = css`
    max-width: 630px;
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

export const ArticleMain = ({ children }: Props) => {
    return (
        <main className={cx(articleContainer, articleAdStyles)}>
            <div className={maxWidth}>{children}</div>
        </main>
    );
};
