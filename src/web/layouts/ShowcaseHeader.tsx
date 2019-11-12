import React from 'react';
import { css } from 'emotion';

import { pillarPalette } from '@root/src/lib/pillars';
import { from, until, between } from '@guardian/src-foundations/mq';

import { MainMedia } from '@root/src/web/components/MainMedia';
import { ArticleHeadline } from '@root/src/web/components/ArticleHeadline';
import { ArticleStandfirst } from '@root/src/web/components/ArticleStandfirst';
import { ArticleTitle } from '@root/src/web/components/ArticleTitle';
import { HeaderItem } from '@root/src/web/components/HeaderItem';
import { Hide } from '@root/src/web/components/Hide';

const positionMainImage = css`
    /*
        Decide the order for ArticleHeader items. The natural order is:
            - 1. <SeriesSectionLink />
            - 2. <ArticleHeadline />
            - 3. <ArticleStandfirst />
            - 4. <MainImage />
    */

    /* For all articles, below 740px move the image above headline */
    ${until.tablet} {
        order: 0;
    }

    ${between.tablet.and.leftCol} {
        order: 4;
    }

    /* Move the standfirst above the main image when over 1140px */
    ${from.leftCol} {
        order: 2;
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
    badge?: BadgeType;
};

export const ShowcaseHeader = ({ CAPI, badge }: Props) => {
    const {
        headline,
        tags,
        webPublicationDate,
        pillar,
        mainMediaElements,
        standfirst,
    } = CAPI;

    return (
        <header className={headerStyles}>
            <HeaderItem order={1}>
                <Hide when="above" breakpoint="leftCol">
                    <ArticleTitle
                        CAPI={CAPI}
                        badge={badge}
                        inLeftCol={false}
                        fallbackToSection={true}
                    />
                </Hide>
            </HeaderItem>
            <HeaderItem order={2}>
                <ArticleHeadline
                    headlineString={headline}
                    tags={tags}
                    webPublicationDate={webPublicationDate}
                    type="bold"
                    colour={pillarPalette[pillar].dark}
                />
            </HeaderItem>
            <HeaderItem order={3}>
                <Hide when="above" breakpoint="leftCol">
                    <ArticleStandfirst
                        pillar={pillar}
                        standfirst={standfirst}
                    />
                </Hide>
            </HeaderItem>
            <div className={positionMainImage}>
                <MainMedia elements={mainMediaElements} pillar={pillar} />
            </div>
        </header>
    );
};
