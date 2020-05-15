// ----- Imports ----- //

import React, { ReactNode } from 'react';
import { css } from '@emotion/core';
import { neutral, opinion, background } from '@guardian/src-foundations/palette';
import { from, breakpoints } from '@guardian/src-foundations/mq';

import HeaderImage from 'components/headerImage';
import Series from 'components/series';
import Headline from 'components/headline';
import Standfirst from 'components/standfirst';
import ArticleBody from 'components/shared/articleBody';
import Tags from 'components/shared/tags';
import Cutout from 'components/opinion/cutout';
import { darkModeCss, articleWidthStyles, basePx } from 'styles';
import { Keyline } from 'components/shared/keyline';
import { Comment, getFormat } from 'item';
import { ImageMappings } from 'components/shared/page';
import Byline from 'components/byline';
import Metadata from 'components/metadata';


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

const topBorder = css`
    border-top: solid 1px ${neutral[86]};
    margin-top: ${basePx(1)};

    ${from.wide} {
        margin-top: ${basePx(1)};
    }

    ${darkModeCss`
        border-top: solid 1px ${neutral[20]};
    `}
`;


// ----- Component ----- //

interface Props {
    imageMappings: ImageMappings;
    item: Comment;
    children: ReactNode[];
}

const Opinion = ({ imageMappings, item, children }: Props): JSX.Element =>
    <main css={[Styles, DarkStyles]}>
        <article css={BorderStyles}>
            <header>
                <div css={articleWidthStyles}>
                    <Series item={item}/>
                    <Headline item={item} />
                    <Byline {...item} />
                </div>
                <Cutout 
                    contributors={item.contributors}
                    imageMappings={imageMappings}
                    className={articleWidthStyles}
                />
                <Keyline {...item} />
                <div css={articleWidthStyles}>
                    <Standfirst item={item} />
                </div>

                <section css={[articleWidthStyles, topBorder]}>
                    <Metadata item={item} imageMappings={imageMappings} />
                </section>

                <HeaderImage
                    image={item.mainImage}
                    imageMappings={imageMappings}
                    format={getFormat(item)}
                />
            </header>
            <ArticleBody className={[articleWidthStyles]}>
                {children}
            </ArticleBody>
            <footer css={articleWidthStyles}>
                <Tags tags={item.tags}/>
            </footer>
        </article>
    </main>


// ----- Exports ----- //

export default Opinion;
