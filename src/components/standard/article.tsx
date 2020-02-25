// ----- Imports ----- //

import React, { ReactNode } from 'react';
import { css } from '@emotion/core';
import { neutral, background } from '@guardian/src-foundations/palette';
import { from, breakpoints } from '@guardian/src-foundations/mq';

import HeaderImage from 'components/shared/headerImage';
import Series from 'components/shared/articleSeries';
import Headline from 'components/headline';
import Standfirst from 'components/standard/standfirst';
import Byline from 'components/standard/byline';
import { CommentCount } from 'components/shared/commentCount'
import Body from 'components/shared/articleBody';
import Tags from 'components/shared/tags';
import { darkModeCss, articleWidthStyles } from 'styles';
import { Keyline } from 'components/shared/keyline';
import { getPillarStyles } from 'pillar';
import { Standard, Review } from 'item';


// ----- Styles ----- //

const Styles = css`
    background: ${neutral[97]};
`;

const DarkStyles = darkModeCss`
    background: ${background.inverse};
`;

const BorderStyles = css`
    background: ${neutral[100]};
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
    item: Standard | Review;
    children: ReactNode[];
}

const Standard = ({ imageSalt, item, children }: Props): JSX.Element => {
    // client side code won't render an Epic if there's an element with this id
    const epicContainer = item.shouldHideReaderRevenue
        ? <div id="epic-container"></div>
        : null

    return <main css={[Styles, DarkStyles]}>
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
                    <Standfirst item={item} className={articleWidthStyles} />

                </div>
                <Keyline {...item} />
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
            {epicContainer}
            <footer css={articleWidthStyles}>
                <Tags tags={item.tags}/>
            </footer>
        </article>
    </main>
}


// ----- Exports ----- //

export default Standard;
