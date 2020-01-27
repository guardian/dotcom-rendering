// ----- Imports ----- //

import React, { ReactNode } from 'react';
import { css } from '@emotion/core';
import { neutral, opinion, background } from '@guardian/src-foundations/palette';
import { from, breakpoints } from '@guardian/src-foundations/mq';

import HeaderImage from 'components/shared/headerImage';
import ArticleSeries from 'components/shared/articleSeries';
import Headline from 'components/opinion/headline';
import ArticleStandfirst from 'components/standard/standfirst';
import Byline from 'components/opinion/byline';
import ArticleBody from 'components/shared/articleBody';
import Tags from 'components/shared/tags';
import Cutout from 'components/opinion/cutout';
import { darkModeCss, articleWidthStyles, basePx } from 'styles';
import { Keyline } from 'components/shared/keyline';
import { CommentCount } from 'components/shared/commentCount';
import { getPillarStyles } from 'pillar';
import { Standard } from 'article';


// ----- Styles ----- //

const Styles = css`
    background: ${opinion[800]};
`;

const DarkStyles = darkModeCss`
    background: ${background.inverse};
`;

const BorderStyles = css`
    background: ${opinion[800]};
    ${darkModeCss`background: ${background.inverse};`}

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

const CommentCountStyles = css`
    background: ${opinion[800]};
    margin-top: 0;

    button {
        background: ${opinion[800]};
    }
`;

const topBorder = css`
    border-top: solid 1px ${neutral[86]};
    margin-top: ${basePx(1)};

    ${from.wide} {
        margin-top: ${basePx(1)};
    }
`;


// ----- Component ----- //

interface Props {
    imageSalt: string;
    article: Standard;
    children: ReactNode[];
}

const Opinion = ({ imageSalt, article, children }: Props): JSX.Element =>
    <main css={[Styles, DarkStyles]}>
        <article css={BorderStyles}>
            <header>
                <div css={articleWidthStyles}>
                    <ArticleSeries series={article.series} pillar={article.pillar}/>
                    <Headline
                        byline={article.bylineHtml}
                        headline={article.headline}
                        pillar={article.pillar}
                    />
                </div>
                <Cutout 
                    contributors={article.contributors}
                    imageSalt={imageSalt}
                    className={articleWidthStyles}
                />
                <Keyline {...article} />
                <ArticleStandfirst
                    article={article}
                    className={articleWidthStyles}
                />

                <section css={[articleWidthStyles, topBorder]}>
                    <Byline
                        pillar={article.pillar}
                        publicationDate={article.publishDate}
                        contributors={article.contributors}
                    />
                    {article.commentable
                        ? <CommentCount
                            count={0}
                            colour={getPillarStyles(article.pillar).kicker}
                            className={CommentCountStyles}
                            />
                        : null}
                </section>

                <HeaderImage
                    image={article.mainImage}
                    imageSalt={imageSalt}
                    className={HeaderImageStyles}
                />
            </header>
            <ArticleBody pillar={article.pillar} className={[articleWidthStyles]}>
                {children}
            </ArticleBody>
            <footer css={articleWidthStyles}>
                <Tags tags={article.tags}/>
            </footer>
        </article>
    </main>


// ----- Exports ----- //

export default Opinion;
