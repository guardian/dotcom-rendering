// ----- Imports ----- //

import React, { ReactNode } from 'react';
import { css } from '@emotion/core';
import { neutral, background } from '@guardian/src-foundations/palette';
import { from, breakpoints } from '@guardian/src-foundations/mq';

import HeaderImage from 'components/headerImage';
import Series from 'components/series';
import Headline from 'components/headline';
import Standfirst from 'components/standfirst';
import Body from 'components/shared/articleBody';
import Tags from 'components/shared/tags';
import { darkModeCss, articleWidthStyles } from 'styles';
import { Keyline } from 'components/shared/keyline';
import { Standard, Review, getFormat } from 'item';
import { ImageMappings } from 'components/shared/page';
import Metadata from 'components/metadata';


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


// ----- Component ----- //

interface Props {
    imageMappings: ImageMappings;
    item: Standard | Review;
    children: ReactNode[];
}

const Standard = ({ imageMappings, item, children }: Props): JSX.Element => {
    // client side code won't render an Epic if there's an element with this id
    const epicContainer = item.shouldHideReaderRevenue
        ? <div id="epic-container"></div>
        : null

    return <main css={[Styles, DarkStyles]}>
        <article css={BorderStyles}>
            <header>
                <HeaderImage
                    image={item.mainImage}
                    imageMappings={imageMappings}
                    format={getFormat(item)}
                />
                <Series item={item} />
                <Headline item={item} />
                <div css={articleWidthStyles}>
                    <Standfirst item={item} />
                </div>
                <Keyline {...item} />
                <section css={articleWidthStyles}>
                    <Metadata imageMappings={imageMappings} item={item} />
                </section>
            </header>
            <Body className={[articleWidthStyles]}>
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
