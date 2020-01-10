// ----- Imports ----- //

import React, { ReactNode } from 'react';
import { css } from '@emotion/core';
import { palette } from '@guardian/src-foundations';
import { from, breakpoints } from '@guardian/src-foundations/mq';

import HeaderImage from 'components/shared/headerImage';
import Series from 'components/shared/articleSeries';
import Headline from 'components/standard/headline';
import Standfirst from 'components/standard/standfirst';
import Byline from 'components/standard/byline';
import { CommentCount } from 'components/shared/commentCount'
import Body from 'components/shared/articleBody';
import Tags from 'components/shared/tags';
import { darkModeCss, articleWidthStyles } from 'styles';
import { Keyline } from 'components/shared/keyline';
import { getPillarStyles } from 'pillar';
import { Article as Standard } from 'article';


// ----- Styles ----- //

const Styles = css`
    background: ${palette.neutral[97]};
`;

const DarkStyles = darkModeCss`
    background: ${palette.neutral.darkMode};
`;

const BorderStyles = css`
    background: ${palette.neutral[100]};
    ${darkModeCss`background: ${palette.neutral.darkMode};`}

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


// ----- Component ----- //

interface Props {
    imageSalt: string;
    article: Standard;
    children: ReactNode[];
}

const Standard = ({ imageSalt, article, children }: Props): JSX.Element =>
    <main css={[Styles, DarkStyles]}>
        <article css={BorderStyles}>
            <header>
                <HeaderImage
                    image={article.mainImage}
                    imageSalt={imageSalt}
                    className={HeaderImageStyles}
                />
                <div css={articleWidthStyles}>
                    <Series series={article.series} pillar={article.pillar} />
                    <Headline
                        headline={article.headline}
                        article={article}
                        rating={String(article.starRating)}
                    />
                    <Standfirst article={article} className={articleWidthStyles} />
                </div>
                <Keyline {...article} />
                <section css={articleWidthStyles}>
                    <Byline article={article} imageSalt={imageSalt} />
                    {article.commentable
                        ? <CommentCount count={0} colour={getPillarStyles(article.pillar).kicker}/>
                        : null}
                </section>
            </header>
            <Body pillar={article.pillar} className={[articleWidthStyles]}>
                {children}
            </Body>
            <footer css={articleWidthStyles}>
                <Tags tags={article.tags}/>
            </footer>
        </article>
    </main>


// ----- Exports ----- //

export default Standard;
