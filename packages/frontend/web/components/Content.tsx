import React from 'react';
import { css } from 'emotion';
import { tablet, desktop, wide } from '@guardian/src-foundations';

import { ArticleContainer } from '@frontend/web/components/ArticleContainer';
import { ArticleBody } from '@frontend/web/components/ArticleBody';
import { AdSlot, labelStyles } from '@frontend/web/components/AdSlot';
import { namedAdSlotParameters } from '@frontend/model/advertisement';

// TODO: find a better of setting opacity
const secondaryColumn = css`
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 20px;
    width: 300px;
    margin-left: 20px;
    margin-top: 6px;

    min-height: 300px;
    display: none;

    ${desktop} {
        display: block;
    }
`;

const adSlotWrapper = css`
    position: static;
    height: 1059px;
`;

const stickyAdSlot = css`
    position: sticky;
    top: 0;
`;

const articleAdStyles = css`
    .ad-slot {
        width: 300px;
        margin: 12px auto;
        min-width: 300px;
        min-height: 274px;
        text-align: center;
    }
    .ad-slot--most-popular {
        ${desktop} {
            margin: 0;
            width: auto;
        }
    }
    .ad-slot--inline {
        ${desktop} {
            margin: 0;
            width: auto;
            float: right;
            margin-top: 4px;
            margin-left: 20px;
        }
    }
    .ad-slot--offset-right {
        ${desktop} {
            float: right;
            width: auto;
            margin-right: -328px;
        }

        ${wide} {
            margin-right: -408px;
        }
    }
    .ad-slot--outstream {
        ${tablet} {
            margin-left: 0;

            .ad-slot__label {
                margin-left: 35px;
                margin-right: 35px;
            }
        }
    }
    ${labelStyles};
`;

interface Props {
    CAPI: CAPIType;
    config: ConfigType;
}
export const Content = ({ CAPI, config }: Props) => {
    return (
        <main>
            <ArticleContainer showTopBorder={false}>
                <article className={articleAdStyles}>
                    <ArticleBody CAPI={CAPI} config={config} />
                    <div className={secondaryColumn}>
                        <div className={adSlotWrapper}>
                            <AdSlot
                                asps={namedAdSlotParameters('right')}
                                config={config}
                                className={stickyAdSlot}
                            />
                        </div>
                    </div>
                </article>
            </ArticleContainer>
        </main>
    );
};
