import React from 'react';
import { headline } from '@guardian/pasteup/typography';
import { css, cx } from 'emotion';
import { palette } from '@guardian/pasteup/palette';
import { pillarPalette } from '@frontend/lib/pillars';
import { ArticleModel } from '@frontend/amp/pages/Article';
import { MainMedia } from '@frontend/amp/components/MainMedia';
import Star from '@guardian/pasteup/icons/star.svg';
import { Byline } from '@frontend/amp/components/Byline';
import { string as curly } from 'curlyquotes';
import { TopMetaExtras } from './TopMetaExtras';
import { Standfirst } from './Standfirst';

const headerStyle = css`
    ${headline(5)};
    font-weight: 500;
    padding-bottom: 24px;
    padding-top: 3px;
    color: ${palette.neutral[7]};
`;

const ratingsWrapper = css`
    background-color: ${palette.highlight.main};
    display: inline-block;
    padding: 6px 10px 0;
    margin: 0 0 6px -10px;
    line-height: 24px;

    svg {
        width: 20px;
        height: 20px;
    }
`;

const emptyStar = css`
    fill: transparent;
    stroke: ${palette.neutral[7]};
`;

const bylineStyle = (pillar: Pillar) => css`
    ${headline(2)};
    color: ${pillarPalette[pillar].main};
    padding-bottom: 8px;
    font-style: italic;

    a {
        font-weight: 700;
        color: ${pillarPalette[pillar].main};
        text-decoration: none;
        font-style: normal;
    }
`;

const Headline: React.FC<{
    headlineText: string;
    standfirst: string;
    pillar: Pillar;
    starRating?: number;
}> = ({ headlineText, standfirst, pillar, starRating }) => {
    const stars = (n: number) => {
        return Array(5)
            .fill(0)
            .map((el, i) => {
                if (i < n) {
                    return <Star key={i} />;
                }
                return <Star className={emptyStar} key={i} />;
            });
    };

    return (
        <div>
            <h1 className={cx(headerStyle)}>{curly(headlineText)}</h1>

            {starRating !== undefined && (
                <div className={ratingsWrapper}>{stars(starRating)}</div>
            )}
        </div>
    );
};

export const TopMetaNews: React.FC<{
    articleData: ArticleModel;
}> = ({ articleData }) => (
    <header>
        {articleData.mainMediaElements.map((element, i) => (
            <MainMedia key={i} element={element} pillar={articleData.pillar} />
        ))}

        <Headline
            headlineText={articleData.headline}
            standfirst={articleData.standfirst}
            pillar={articleData.pillar}
            starRating={articleData.starRating}
        />

        <Standfirst text={articleData.standfirst} pillar={articleData.pillar} />

        <Byline
            byline={articleData.author.byline}
            tags={articleData.tags}
            pillar={articleData.pillar}
            guardianBaseURL={articleData.guardianBaseURL}
            className={bylineStyle(articleData.pillar)}
        />

        <TopMetaExtras
            sharingUrls={articleData.sharingUrls}
            pillar={articleData.pillar}
            ageWarning={articleData.ageWarning}
            webPublicationDate={articleData.webPublicationDateDisplay}
            twitterHandle={articleData.author.twitterHandle}
        />
    </header>
);
