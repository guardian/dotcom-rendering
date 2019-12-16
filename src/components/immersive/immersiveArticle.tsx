import React from 'react';
import ImmersiveHeaderImage from 'components/immersive/immersiveHeaderImage';
import ImmersiveSeries from 'components/immersive/immersiveSeries';
import ImmersiveHeadline from 'components/immersive/immersiveHeadline';
import ImmersiveStandfirst from 'components/immersive/immersiveStandfirst';
import ImmersiveByline from 'components/immersive/ImmersiveByline';
import ArticleBody from 'components/shared/articleBody';
import Tags from 'components/shared/tags';
import { Content } from 'capiThriftModels';
import { articleWidthStyles, basePx } from 'styles';
import { from, breakpoints } from '@guardian/src-foundations/mq';
import { css, SerializedStyles } from '@emotion/core';
import { Keyline } from 'components/shared/keyline';
import { articleSeries, articleContributors, articleMainImage } from 'capi';
import { getPillarStyles, pillarFromString, PillarStyles } from 'pillar';

export interface ImmersiveArticleProps {
    capi: Content;
    imageSalt: string;
}

const BorderStyles = css`
    ${from.wide} {
        width: ${breakpoints.wide}px;
        margin: 0 auto;
    }
`;

const DropCapStyles = (pillarStyles: PillarStyles): SerializedStyles => css`
    .article__body p:first-of-type::first-letter {
        color: ${pillarStyles.kicker};
        font-weight: 100;
        font-style: normal;
        font-size: 7em;
        line-height: 1;
        padding-right: ${basePx(1)};
        float: left;
    }
`

const HeaderImageStyles = css`
    figure {
        margin: 0;

        ${from.wide} {
            margin: 0 auto;
        }
    }
`;

const ImmersiveArticle = ({ capi, imageSalt }: ImmersiveArticleProps): JSX.Element => {

    const { fields, tags, webPublicationDate, pillarId, blocks } = capi;
    const series = articleSeries(capi);
    const pillar = pillarFromString(pillarId);
    const pillarStyles = getPillarStyles(pillar);
    const contributors = articleContributors(capi);
    const bodyElements = blocks.body[0].elements;
    const mainImage = articleMainImage(capi);

    return (
        <main>
            <article css={[BorderStyles, DropCapStyles(pillarStyles)]}>
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
                            byline={fields.bylineHtml}
                        />
                    </div>
                    <Keyline pillar={pillar} type={'article'}/>
                    <ImmersiveByline
                        pillarStyles={pillarStyles}
                        publicationDate={webPublicationDate}
                        contributors={contributors}
                        className={articleWidthStyles}
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

export default ImmersiveArticle;
