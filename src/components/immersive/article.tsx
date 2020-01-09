import React, { ReactNode } from 'react';
import ImmersiveHeaderImage from 'components/immersive/headerImage';
import ImmersiveSeries from 'components/immersive/series';
import ImmersiveHeadline from 'components/immersive/headline';
import ImmersiveStandfirst from 'components/immersive/standfirst';
import ImmersiveByline from 'components/immersive/byline';
import ArticleBody from 'components/shared/articleBody';
import Tags from 'components/shared/tags';
import { Content } from 'capiThriftModels';
import { articleWidthStyles, basePx, darkModeCss } from 'styles';
import { from, breakpoints } from '@guardian/src-foundations/mq';
import { css, SerializedStyles } from '@emotion/core';
import { Keyline } from 'components/shared/keyline';
import { articleSeries, articleContributors, articleMainImage } from 'capi';
import { getPillarStyles, PillarStyles } from 'pillar';
import { palette } from '@guardian/src-foundations';
import { Article } from 'article';

export interface ImmersiveArticleProps {
    capi: Content;
    imageSalt: string;
    article: Article;
    children: ReactNode[];
}

const MainDarkStyles = darkModeCss`
    background: ${palette.neutral.darkMode};
`;

const HeaderStyles = css`
    h2 {
        margin-top: 3.2rem;
        font-size: 2.6rem;
        line-height: 3.2rem;
        font-weight: 200;
        margin-bottom: 8px;

        &+p {
            margin-top: 0;
        }
    }
`;

const BorderStyles = css`
    ${from.wide} {
        width: ${breakpoints.wide}px;
        margin: 0 auto;
    }
`;

const DropCapStyles = (pillarStyles: PillarStyles): SerializedStyles => css`
    p:first-child::first-letter,
    .section-rule + p::first-letter {
        color: ${pillarStyles.kicker};
        font-weight: 100;
        font-style: normal;
        font-size: 7em;
        line-height: 1;
        padding-right: ${basePx(1)};
        float: left;
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

function ImmersiveArticle({
    capi,
    imageSalt,
    article,
    children,
}: ImmersiveArticleProps): JSX.Element {

    const { fields, tags, webPublicationDate } = capi;
    const series = articleSeries(capi);
    const pillarStyles = getPillarStyles(article.pillar);
    const contributors = articleContributors(capi);
    const mainImage = articleMainImage(capi);

    return (
        <main css={MainDarkStyles}>
            <article css={BorderStyles}>
                <header>
                    <div css={articleWidthStyles}>
                        <ImmersiveHeaderImage
                            image={mainImage}
                            imageSalt={imageSalt}
                            className={HeaderImageStyles}
                        />
                        <ImmersiveSeries series={series} pillarStyles={pillarStyles}/>
                        <ImmersiveHeadline headline={fields.headline}/>
                        <ImmersiveStandfirst
                            standfirst={fields.standfirst}
                            pillarStyles={pillarStyles}
                            className={articleWidthStyles}
                            bylineHtml={fields.bylineHtml}
                            byline={fields.byline}
                        />
                    </div>
                    <Keyline article={article}/>
                    <ImmersiveByline
                        pillarStyles={pillarStyles}
                        publicationDate={webPublicationDate}
                        contributors={contributors}
                        className={articleWidthStyles}
                    />
                </header>
                <ArticleBody
                    pillarStyles={pillarStyles}
                    className={[articleWidthStyles, DropCapStyles(pillarStyles), HeaderStyles]}
                >
                    {children}
                </ArticleBody>
                <footer css={articleWidthStyles}>
                    <Tags tags={tags}/>
                </footer>
            </article>
        </main>
    );
}

export default ImmersiveArticle;
