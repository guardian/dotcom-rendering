import React from 'react';
import { css, cx } from 'emotion';

import { until, textSans, palette } from '@guardian/src-foundations';

import { MainMedia } from '@frontend/web/components/MainMedia';
import { ArticleHeadline } from '@frontend/web/components/ArticleHeadline';
import { ArticleStandfirst } from '@frontend/web/components/ArticleStandfirst';

const captionFont = css`
    ${textSans({ level: 1 })};
    color: ${palette.neutral[46]};
`;

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

const headlineCSS = css`
    max-width: 630px;
    ${until.phablet} {
        padding: 0 10px;
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
};

export const ArticleHeader = ({ CAPI, config }: Props) => {
    const {
        headline,
        webPublicationDate,
        tags,
        pillar,
        standfirst,
        mainMediaElements,
    } = CAPI;

    return (
        <header className={headerStyles}>
            <div className={headlineCSS}>
                <ArticleHeadline
                    headlineString={headline}
                    webPublicationDate={webPublicationDate}
                    tags={tags}
                />
                <ArticleStandfirst pillar={pillar} standfirst={standfirst} />
            </div>
            <div className={cx(mainMedia)}>
                {mainMediaElements.map((element, i) => (
                    <MainMedia element={element} key={i} pillar={pillar} />
                ))}
            </div>
        </header>
    );
};
