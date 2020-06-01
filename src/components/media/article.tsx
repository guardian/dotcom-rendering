// ----- Imports ----- //

import React, { ReactNode } from 'react';
import { css } from '@emotion/core';
import { background } from '@guardian/src-foundations/palette';
import { from, breakpoints } from '@guardian/src-foundations/mq';

import HeaderImage from 'components/headerImage';
import Series from 'components/media/articleSeries';
import Standfirst from 'components/standfirst';
import Byline from 'components/media/byline';
import Body from 'components/media/articleBody';
import Tags from 'components/media/tags';
import { articleWidthStyles } from 'styles';
import { Item, getFormat } from 'item';
import Headline from 'components/headline';


// ----- Styles ----- //

const Styles = css`
    background: ${background.inverse};
`;

const BorderStyles = css`
    background: ${background.inverse};

    ${from.wide} {
        width: ${breakpoints.wide}px;
        margin: 0 auto;
    }
`;


// ----- Component ----- //

interface Props {
    item: Item;
    children: ReactNode[];
}

const Media = ({ item, children }: Props): JSX.Element =>
     <main css={[Styles]}>
        <article css={BorderStyles}>
            <header>
                <HeaderImage
                    image={item.mainImage}
                    format={getFormat(item)}
                />
                <div css={articleWidthStyles}>
                    <Series series={item.series} pillar={item.pillar} />
                    <Headline item={item} />
                    <Standfirst item={item} />

                </div>
                <section>
                    <Byline
                        pillar={item.pillar}
                        publicationDate={item.publishDate}
                        className={articleWidthStyles}
                        item={item}
                    />
                </section>
            </header>
            <Body pillar={item.pillar} className={[articleWidthStyles]}>
                {children}
            </Body>
            <footer css={articleWidthStyles}>
                <Tags tags={item.tags}/>
            </footer>
        </article>
    </main>;


// ----- Exports ----- //

export default Media;
