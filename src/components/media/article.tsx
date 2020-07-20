// ----- Imports ----- //

import React, { ReactNode } from 'react';
import { css } from '@emotion/core';
import { background } from '@guardian/src-foundations/palette';
import { from, breakpoints } from '@guardian/src-foundations/mq';

import Series from 'components/media/articleSeries';
import Standfirst from 'components/standfirst';
import Byline from 'components/media/byline';
import Body from 'components/media/articleBody';
import Tags from 'components/media/tags';
import { articleWidthStyles } from 'styles';
import { Item } from 'item';
import Headline from 'components/headline';
import HeaderMedia from 'headerMedia';


// ----- Styles ----- //

const Styles = css`
    background: ${background.inverse};
    height: 100vh;
`;

const BorderStyles = css`
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
                <HeaderMedia item={item} />
                <div css={articleWidthStyles}>
                    <Series series={item.series} pillar={item.pillar} />
                </div>
                <Headline item={item} />
                <div css={articleWidthStyles}>
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
            <Body pillar={item.pillar} className={[articleWidthStyles]} format={item}>
                {children}
            </Body>
            <footer css={articleWidthStyles}>
                <Tags tags={item.tags}/>
            </footer>
        </article>
    </main>;


// ----- Exports ----- //

export default Media;
