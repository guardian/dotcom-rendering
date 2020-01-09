import React from 'react';
import { css, cx } from 'emotion';

import { from, until } from '@guardian/src-foundations/mq';

import { MainMedia } from '@root/src/web/components/MainMedia';
import { ArticleHeadline } from '@root/src/web/components/ArticleHeadline';
import { ArticleStandfirst } from '@root/src/web/components/ArticleStandfirst';
import { ArticleTitle } from '@root/src/web/components/ArticleTitle';
import { HeaderItem } from '@root/src/web/components/HeaderItem';
import { Hide } from '@root/src/web/components/Hide';

import { buildAdTargeting } from '@root/src/lib/ad-targeting';

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

    ${from.tablet} {
        order: 4;
    }
`;

const headerStyles = css`
    ${until.phablet} {
        margin: 0 -10px;
    }

    display: flex;
    flex-direction: column;
`;

const maxWidth = css`
    ${from.desktop} {
        max-width: 620px;
    }
`;

type Props = {
    CAPI: CAPIType;
    badge?: BadgeType;
};

export const StandardHeader = ({ CAPI, badge }: Props) => {
    const {
        headline,
        tags,
        webPublicationDate,
        pillar,
        mainMediaElements,
        standfirst,
        config,
    } = CAPI;

    const adTargeting: AdTargeting = buildAdTargeting(config);

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
                    designType={CAPI.designType}
                    pillar={pillar}
                    webPublicationDate={webPublicationDate}
                    tags={tags}
                    byline={CAPI.author.byline}
                />
            </HeaderItem>
            <HeaderItem order={3}>
                <ArticleStandfirst
                    designType={CAPI.designType}
                    pillar={pillar}
                    standfirst={standfirst}
                />
            </HeaderItem>
            <div className={cx(positionMainImage, maxWidth)}>
                <Hide when="below" breakpoint="tablet">
                    <MainMedia
                        elements={mainMediaElements}
                        pillar={pillar}
                        adTargeting={adTargeting}
                    />
                </Hide>
            </div>
        </header>
    );
};
