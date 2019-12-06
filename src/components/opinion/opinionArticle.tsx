import React from 'react';

import HeaderImage from '../shared/headerImage';
import ArticleSeries from '../news/articleSeries';
import OpinionHeadline from '../opinion/opinionHeadline';
import ArticleStandfirst from '../news/articleStandfirst';
import OpinionByline from './opinionByline';
import ArticleBody from '../shared/articleBody';
import Tags from 'components/shared/tags';
import OpinionCutout from './opinionCutout';
import { Content } from 'capiThriftModels';
import { darkModeCss, articleWidthStyles } from 'styles';
import { palette } from '@guardian/src-foundations';
import { from, breakpoints } from '@guardian/src-foundations/mq';
import { css } from '@emotion/core';
import { Keyline } from 'components/shared/keyline';
import { articleSeries, articleContributors, articleMainImage } from 'capi';
import { getPillarStyles, pillarFromString } from 'pillar';

export interface OpinionArticleProps {
    capi: Content;
    imageSalt: string;
}

const MainStyles = css`
    background: ${palette.opinion.faded};
`;

const MainDarkStyles = darkModeCss`
    background: ${palette.neutral.darkMode};
`;

const BorderStyles = css`
    background: ${palette.opinion.faded};

    ${from.wide} {
        width: ${breakpoints.wide}px;
        margin: 0 auto;
    }
`;

const HeaderImageStyles = css`
    figure {
        margin: 0;

        ${from.wide} {
            margin: 0 auto;
        }
    }
`;

const OpinionArticle = ({ capi, imageSalt }: OpinionArticleProps): JSX.Element => {

    const { fields, tags, webPublicationDate, pillarId, blocks } = capi;
    const series = articleSeries(capi);
    const pillar = pillarFromString(pillarId);
    const pillarStyles = getPillarStyles(pillar);
    const contributors = articleContributors(capi);
    const bodyElements = blocks.body[0].elements;
    const mainImage = articleMainImage(capi);

    return (
        <main css={[MainStyles, MainDarkStyles]}>
            <article css={BorderStyles}>
                <header>
                    <div css={articleWidthStyles}>
                        <ArticleSeries series={series} pillarStyles={pillarStyles}/>
                        <OpinionHeadline
                            byline={fields.bylineHtml}
                            headline={fields.headline}
                            pillarStyles={pillarStyles}
                        />
                    </div>
                    <OpinionCutout 
                        contributors={contributors}
                        imageSalt={imageSalt}
                        className={articleWidthStyles}
                    />
                    <Keyline pillar={pillar} type={'article'}/>
                    <ArticleStandfirst
                            standfirst={fields.standfirst}
                            feature={true}
                            pillarStyles={pillarStyles}
                            className={articleWidthStyles}
                    />
                    <OpinionByline
                        pillarStyles={pillarStyles}
                        publicationDate={webPublicationDate}
                        contributors={contributors}
                        className={articleWidthStyles}
                    />
                    <HeaderImage
                        image={mainImage}
                        imageSalt={imageSalt}
                        className={HeaderImageStyles}
                    />
                </header>
                <ArticleBody
                    pillarStyles={pillarStyles}
                    bodyElements={bodyElements}
                    imageSalt={imageSalt}
                    className={articleWidthStyles}
                />
                <footer css={articleWidthStyles}>
                    <Tags tags={tags}/>
                </footer>
            </article>
        </main>
    );
}

export default OpinionArticle;
