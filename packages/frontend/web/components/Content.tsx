import React from 'react';
import { css } from 'emotion';
import {
    tablet,
    desktop,
    leftCol,
    wide,
    palette,
    mobileLandscape,
} from '@guardian/src-foundations';
import { clearFix } from '@guardian/pasteup/mixins';
import { Container } from '@guardian/guui';
import { ArticleBody } from '@frontend/web/components/ArticleBody';
import { ArticleHeader } from '@frontend/web/components/ArticleHeader';
import { labelStyles } from '@frontend/web/components/AdSlot';
import { ArticleAside } from '@frontend/web/components/ArticleAside';

const wrapper = css`
    padding-top: 6px;
    margin-right: 0;
    margin-left: 0;
    ${clearFix}

    ${desktop} {
        max-width: 620px;
        margin-right: 310px;
        padding-left: 10px;
    }

    ${leftCol} {
        margin-left: 150px;
        margin-right: 310px;
        position: relative;
        :before {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            height: 100%;
            width: 1px;
            background: ${palette.neutral[86]};
        }
    }

    ${wide} {
        margin-left: 230px;
    }
`;

const articleContainerStyles = css`
    position: relative;
    background-color: ${palette.neutral[100]};
    padding: 0 10px;

    ${mobileLandscape} {
        padding: 0 20px;
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
            <Container
                borders={true}
                showTopBorder={false}
                className={articleContainerStyles}
            >
                <article className={articleAdStyles}>
                    <div className={wrapper}>
                        <ArticleHeader CAPI={CAPI} config={config} />
                        <ArticleBody CAPI={CAPI} config={config} />
                    </div>
                    <ArticleAside config={config} />
                </article>
            </Container>
        </main>
    );
};
