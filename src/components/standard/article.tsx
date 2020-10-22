// ----- Imports ----- //

import React, { ReactNode, FC } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { neutral, background } from '@guardian/src-foundations/palette';
import { from, breakpoints } from '@guardian/src-foundations/mq';

import HeaderMedia from 'headerMedia';
import Series from 'components/series';
import Headline from 'components/headline';
import Standfirst from 'components/standfirst';
import Metadata from 'components/metadata';
import OptionalLogo from 'components/shared/logo';
import Body from 'components/shared/articleBody';
import Tags from 'components/shared/tags';
import { darkModeCss, articleWidthStyles, onwardStyles, lineStyles } from 'styles';
import { Standard as StandardItem, Review as ReviewItem, Item } from 'item';
import { getThemeStyles, themeToPillar } from 'themeStyles';
import { Display } from '@guardian/types/Format';
import { remSpace } from '@guardian/src-foundations';
import { pipe2 } from 'lib';
import { map, withDefault } from '@guardian/types/option';
import RelatedContent from 'components/shared/relatedContent';
import ImmersiveCaption from 'components/immersiveCaption';
import Epic from 'components/shared/epic';
import { Lines } from '@guardian/src-ed-lines';
import FooterCcpa from 'components/shared/footer';



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

const itemStyles = (item: Item): SerializedStyles => {
    const { kicker, inverted } = getThemeStyles(item.theme);

    switch (item.display) {
        case Display.Immersive:
            return css`
                > p:first-of-type:first-letter,
                > hr + p:first-letter {
                    color: ${kicker};
                    display: inline-block;
                    vertical-align: text-top;
                    line-height: 5.625rem;
                    font-size: 6.8125rem;
                    display: inline-block;
                    font-weight: 900;
                    float: left;
                    margin-right: ${remSpace[2]};

                    ${darkModeCss`
                        color: ${inverted};
                    `}
                }
            `;

        default:
            return css``;
    }
}


interface Props {
    item: StandardItem | ReviewItem;
    children: ReactNode[];
}


const Standard: FC<Props> = ({ item, children }) => {
    // client side code won't render an Epic if there's an element with this id
    const epicContainer = item.shouldHideReaderRevenue
        ? null
        : <div css={articleWidthStyles} id="epic-placeholder">
            <Epic
                title=""
                body=""
                firstButton=""
                secondButton=""
            />
        </div>

    const commentContainer = item.commentable
        ? pipe2(
            item.internalShortId,
            map(id =>
                <section
                    css={onwardStyles}
                    id="comments"
                    data-closed={false}
                    data-pillar={themeToPillar(item.theme)}
                    data-short-id={id}
                ></section>),
            withDefault(<></>)
        )
        : null

    return <main css={[Styles, DarkStyles]}>
        <article className="js-article" css={BorderStyles}>
            <header>
                <HeaderMedia item={item} />
                <Series item={item} />
                <Headline item={item} />
                <div css={articleWidthStyles}>
                    <Standfirst item={item} />
                    <ImmersiveCaption item={item} />
                </div>
                <div css={lineStyles}>
                    <Lines count={4}/>
                </div>
                <section css={articleWidthStyles}>
                    <Metadata item={item} />
                    {OptionalLogo(item)}
                </section>
            </header>
            <Body className={[articleWidthStyles, itemStyles(item)]} format={item}>
                {children}
            </Body>
            {epicContainer}
            <section className="js-tags" css={articleWidthStyles}>
                <Tags tags={item.tags} format={item}/>
            </section>
        </article>
        <section css={onwardStyles}>
            <RelatedContent content={item.relatedContent}/>
        </section>
        {commentContainer}
        <div id='articleFooter'><FooterCcpa isCcpa={false} /></div>
    </main>
}


// ----- Exports ----- //

export default Standard;
