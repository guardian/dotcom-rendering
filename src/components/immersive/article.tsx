// ----- Imports ----- //

import React, { ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { background } from '@guardian/src-foundations/palette';
import { from, breakpoints } from '@guardian/src-foundations/mq';

import HeaderImage from 'components/immersive/headerImage';
import Series from 'components/immersive/series';
import Headline from 'components/immersive/headline';
import Standfirst from 'components/immersive/standfirst';
import Byline from 'components/immersive/byline';
import ArticleBody from 'components/shared/articleBody';
import Tags from 'components/shared/tags';
import { articleWidthStyles, basePx, darkModeCss } from 'styles';
import { Keyline } from 'components/shared/keyline';
import { getPillarStyles, Pillar } from 'pillar';
import { Item } from 'item';


// ----- Styles ----- //

const DarkStyles = darkModeCss`
    background: ${background.inverse};
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

const DropCapStyles = (pillar: Pillar): SerializedStyles => {
    const { kicker } = getPillarStyles(pillar);

    return css`
        p:first-child::first-letter,
        .section-rule + p::first-letter {
            color: ${kicker};
            font-weight: 100;
            font-style: normal;
            font-size: 7em;
            line-height: 1;
            padding-right: ${basePx(1)};
            float: left;
        }
    `;
}

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
    item: Item;
    children: ReactNode[];
}

const Immersive = ({ imageSalt, item, children }: Props): JSX.Element =>
    <main css={DarkStyles}>
        <article css={BorderStyles}>
            <header>
                <div css={articleWidthStyles}>
                    <HeaderImage
                        image={item.mainImage}
                        imageSalt={imageSalt}
                        className={HeaderImageStyles}
                        pillar={item.pillar}
                    />
                    <Series series={item.series} pillar={item.pillar}/>
                    <Headline headline={item.headline}/>
                    <Standfirst
                        standfirst={item.standfirst}
                        pillar={item.pillar}
                        className={articleWidthStyles}
                        bylineHtml={item.bylineHtml}
                        byline={item.byline}
                    />
                </div>
                <Keyline {...item} />
                <Byline
                    pillar={item.pillar}
                    publicationDate={item.publishDate}
                    contributors={item.contributors}
                    className={articleWidthStyles}
                />
            </header>
            <ArticleBody
                pillar={item.pillar}
                className={[articleWidthStyles, DropCapStyles(item.pillar), HeaderStyles]}
            >
                {children}
            </ArticleBody>
            <footer css={articleWidthStyles}>
                <Tags tags={item.tags}/>
            </footer>
        </article>
    </main>


// ----- Exports ----- //

export default Immersive;
