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
import { AdSlot, labelStyles } from '@frontend/web/components/AdSlot';
import { namedAdSlotParameters } from '@frontend/model/advertisement';

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

    header {
        display: flex;
        flex-direction: column;

        ${leftCol} {
            @supports (display: grid) {
                display: grid;
                grid-template-areas: 'section headline' 'meta main-media';
                grid-template-columns: 160px 1fr;
                margin-left: -160px;
            }
        }

        ${wide} {
            @supports (display: grid) {
                grid-template-columns: 240px 1fr;
                margin-left: -240px;
            }
        }
    }
`;

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
            </Container>
        </main>
    );
};
