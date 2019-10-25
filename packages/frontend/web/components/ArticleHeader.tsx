import React from 'react';
import { css, cx } from 'emotion';

import {
    until,
    from,
    tablet,
    leftCol,
    textSans,
    palette,
} from '@guardian/src-foundations';

import { MainMedia } from '@frontend/web/components/MainMedia';
import { ArticleHeadline } from '@frontend/web/components/ArticleHeadline';
import { ArticleStandfirst } from '@frontend/web/components/ArticleStandfirst';
import { SeriesSectionLink } from '@frontend/web/components/SeriesSectionLink';
import { HeaderItem } from '@frontend/web/components/HeaderItem';
import { Hide } from '@frontend/web/components/Hide';

const captionFont = css`
    ${textSans({ level: 1 })};
    color: ${palette.neutral[46]};
`;

const positionMainImage = (isShowcase: boolean) => {
    /*
        Decide the order for ArticleHeader items. The natural order is:
            - 1. <SeriesSectionLink />
            - 2. <ArticleHeadline />
            - 3. <ArticleStandfirst />
            - 4. <MainImage />
     */
    if (isShowcase) {
        return css`
            /* For all articles, below 740px move the image above headline */
            ${until.tablet} {
                order: 0;
            }

            ${from.tablet.until.leftCol} {
                order: 4;
            }

            /* Move the standfirst above the main image when over 1140px */
            ${leftCol} {
                order: 2;
            }
        `;
    }

    return css`
        /* For all articles, below 740px move the image above headline */
        ${until.tablet} {
            order: 0;
        }

        /* Above tablet, keep the image as the last header item shown */
        ${tablet} {
            order: 4;
        }
    `;
};

const mainMedia = css`
    @supports (display: grid) {
        grid-template-areas: 'main-media';
    }

    min-height: 1px;
    /*
    Thank you IE11, broken in stasis for all eternity.

    https://github.com/philipwalton/flexbugs/issues/75#issuecomment-161800607
    */

    margin-bottom: 6px;

    ${until.tablet} {
        margin: 0;
        order: -1;

        figcaption {
            display: none;
        }
    }

    img {
        flex: 0 0 auto; /* IE */
        width: 100%;
        height: 100%;
    }

    figcaption {
        ${captionFont};
    }
`;

const headerStyles = css`
    ${until.phablet} {
        margin: 0 -10px;
    }

    display: flex;
    flex-direction: column;
`;

type Props = {
    CAPI: CAPIType;
    config: ConfigType;
    isShowcase?: boolean;
};

export const ArticleHeader = ({ CAPI, config, isShowcase = false }: Props) => {
    const {
        headline,
        webPublicationDate,
        tags,
        pillar,
        standfirst,
        mainMediaElements,
    } = CAPI;

    return (
        <header className={cx(headerStyles)}>
            <HeaderItem order={1}>
                <Hide when="above" breakpoint="leftCol">
                    <SeriesSectionLink CAPI={CAPI} fallbackToSection={true} />
                </Hide>
            </HeaderItem>
            <HeaderItem order={2}>
                <ArticleHeadline
                    headlineString={headline}
                    tags={tags}
                    webPublicationDate={webPublicationDate}
                />
            </HeaderItem>
            <HeaderItem order={3}>
                {isShowcase ? (
                    <Hide when="above" breakpoint="leftCol">
                        <ArticleStandfirst
                            pillar={pillar}
                            standfirst={standfirst}
                        />
                    </Hide>
                ) : (
                    <ArticleStandfirst
                        pillar={pillar}
                        standfirst={standfirst}
                    />
                )}
            </HeaderItem>
            <div className={cx(mainMedia, positionMainImage(isShowcase))}>
                {mainMediaElements.map((element, i) => (
                    <MainMedia element={element} key={i} pillar={pillar} />
                ))}
            </div>
        </header>
    );
};
