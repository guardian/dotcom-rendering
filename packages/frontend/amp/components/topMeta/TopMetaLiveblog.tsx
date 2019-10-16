import React from 'react';
import { headline, palette } from '@guardian/src-foundations';
import { css } from 'emotion';
import { pillarPalette } from '@frontend/lib/pillars';
import { ArticleModel } from '@frontend/amp/types/ArticleModel';
import { MainMedia } from '@frontend/amp/components/MainMedia';
import { Byline } from '@frontend/amp/components/topMeta/Byline';
import { string as curly } from 'curlyquotes';
import { TopMetaExtras } from '@frontend/amp/components/topMeta/TopMetaExtras';
import { ListStyle } from '@frontend/amp/components/elements/Text';
import { getSharingUrls } from '@frontend/lib/sharing-urls';
import { getAgeWarning } from '@frontend/lib/age-warning';

const headerStyle = (pillar: Pillar) => css`
    ${headline({ level: 4 })};
    font-weight: 500;
    padding: 3px 10px 24px;
    color: ${palette.neutral[100]};
    background-color: ${pillarPalette[pillar].main};
`;

const bylineStyle = (pillar: Pillar) => css`
    ${headline({ level: 1 })};
    color: ${pillarPalette[pillar].main};
    padding-top: 3px;
    padding-bottom: 8px;
    font-style: italic;

    a {
        font-weight: 700;
        color: ${pillarPalette[pillar].main};
        text-decoration: none;
        font-style: normal;
    }
`;

const standfirstStyle = (pillar: Pillar) => css`
    ${headline({ level: 1 })};
    color: ${palette.neutral[100]};
    background-color: ${pillarPalette[pillar].dark};
    font-weight: bold;
    padding: 3px 10px 12px;

    a {
        color: ${palette.neutral[100]};
    }

    p {
        margin-bottom: 8px;
    }
    strong {
        font-weight: 700;
    }

    ${ListStyle(pillarPalette[pillar].neutral.border)};
`;

const fullWidth = css`
    margin: 0 -10px;
`;

const Headline: React.FC<{
    headlineText: string;
    standfirst: string;
    pillar: Pillar;
    starRating?: number;
}> = ({ headlineText, pillar, standfirst }) => {
    return (
        <div className={fullWidth}>
            <h1 className={headerStyle(pillar)}>{curly(headlineText)}</h1>
            <div // tslint:disable-line:react-no-dangerous-html
                className={standfirstStyle(pillar)}
                dangerouslySetInnerHTML={{
                    __html: standfirst,
                }}
            />
        </div>
    );
};

export const TopMetaLiveblog: React.FC<{
    articleData: ArticleModel;
}> = ({ articleData }) => (
    <header>
        <Headline
            headlineText={articleData.headline}
            standfirst={articleData.standfirst}
            pillar={articleData.pillar}
            starRating={articleData.starRating}
        />

        {articleData.mainMediaElements.map((element, i) => (
            <MainMedia key={i} element={element} pillar={articleData.pillar} />
        ))}

        <Byline
            byline={articleData.author.byline}
            tags={articleData.tags}
            pillar={articleData.pillar}
            guardianBaseURL={articleData.guardianBaseURL}
            className={bylineStyle(articleData.pillar)}
        />

        <TopMetaExtras
            sharingUrls={getSharingUrls(
                articleData.pageId,
                articleData.webTitle,
            )}
            pillar={articleData.pillar}
            ageWarning={getAgeWarning(
                articleData.tags,
                articleData.webPublicationDate,
            )}
            webPublicationDate={articleData.webPublicationDateDisplay}
            twitterHandle={articleData.author.twitterHandle}
        />
    </header>
);
