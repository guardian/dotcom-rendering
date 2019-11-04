import React from 'react';
import { css, cx } from 'emotion';

import { from, until } from '@guardian/src-utilities';

import { MainMedia } from '@root/src/web/components/MainMedia';
import { ArticleHeadline } from '@root/src/web/components/ArticleHeadline';
import { ArticleStandfirst } from '@root/src/web/components/ArticleStandfirst';
import { SeriesSectionLink } from '@root/src/web/components/SeriesSectionLink';
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
    max-width: 620px;
`;

type Props = {
    CAPI: CAPIType;
};

export const StandardHeader = ({ CAPI }: Props) => {
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
                <ArticleStandfirst pillar={pillar} standfirst={standfirst} />
            </HeaderItem>
            <div className={cx(positionMainImage, maxWidth)}>
                <MainMedia elements={mainMediaElements} pillar={pillar} />
            </div>
        </header>
    );
};
