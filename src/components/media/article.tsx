// ----- Imports ----- //

import React, { ReactNode } from 'react';
import { css } from '@emotion/core';
import { neutral, background } from '@guardian/src-foundations/palette';
import { from, breakpoints } from '@guardian/src-foundations/mq';

import HeaderImage from 'components/shared/headerImage';
import Series from 'components/shared/articleSeries';
import Standfirst from 'components/standfirst';
import Byline from 'components/standard/byline';
import { CommentCount } from 'components/shared/commentCount'
import Body from 'components/shared/articleBody';
import Tags from 'components/shared/tags';
import {darkModeCss, articleWidthStyles, headlineFontStyles, headlineFont} from 'styles';
import { Keyline } from 'components/shared/keyline';
import { getPillarStyles } from 'pillar';
import {Item} from "../../item";
import Headline from 'components/headline';

// ----- Styles ----- //

const Styles = css`
    background: ${background.inverse};
`;

const DarkStyles = darkModeCss`
    background: ${background.inverse};
`;

const BorderStyles = css`
    background: ${background.inverse};
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


// ----- Component ----- //

interface Props {
    imageSalt: string;
    item: Item;
    children: ReactNode[];
}

const Media = ({ imageSalt, item, children }: Props): JSX.Element =>
     <main css={[Styles, DarkStyles]}>
        <article css={BorderStyles}>
            <header>
                <HeaderImage
                    image={item.mainImage}
                    imageSalt={imageSalt}
                    className={HeaderImageStyles}
                    pillar={item.pillar}
                />
                <div css={articleWidthStyles}>
                    <Series series={item.series} pillar={item.pillar} />
                    <Headline item={item} />
                    <Standfirst item={item} />

                </div>
                <section css={articleWidthStyles}>
                    <Byline item={item} imageSalt={imageSalt} />
                    {item.commentable
                        ? <CommentCount count={0} colour={getPillarStyles(item.pillar).kicker}/>
                        : null}
                </section>
            </header>
            <Body pillar={item.pillar} className={[articleWidthStyles]}>
                {children}
            </Body>
            <footer css={articleWidthStyles}>
                <Tags tags={item.tags}/>
            </footer>
        </article>
    </main>


// ----- Exports ----- //

export default Media;
