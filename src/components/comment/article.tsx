// ----- Imports ----- //

import React, { ReactNode, FC } from 'react';
import { css } from '@emotion/core';
import { neutral, opinion, background } from '@guardian/src-foundations/palette';
import { from, breakpoints } from '@guardian/src-foundations/mq';

import Series from 'components/series';
import Headline from 'components/headline';
import Standfirst from 'components/standfirst';
import ArticleBody from 'components/shared/articleBody';
import Tags from 'components/shared/tags';
import Cutout from 'components/comment/cutout';
import { darkModeCss, articleWidthStyles, basePx, relatedContentStyles, lineStyles } from 'styles';
import { Comment as CommentItem } from 'item';
import Byline from 'components/byline';
import Metadata from 'components/metadata';
import HeaderMedia from 'headerMedia';
import OptionalLogo from 'components/shared/logo';
import RelatedContent from 'components/shared/relatedContent';
import { Lines } from '@guardian/src-ed-lines';
import FooterCcpa from 'components/shared/footer';


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

const commentLineStylePosition = css`
    margin-top: 83px;
`

interface Props {
    item: CommentItem;
    children: ReactNode[];
}

const Comment: FC<Props> = ({ item, children }) =>
    <main css={[Styles, DarkStyles]}>
        <article css={BorderStyles}>
            <header>
                <Series item={item}/>
                <Headline item={item} />
                <div css={articleWidthStyles}>
                    <Byline {...item} />
                </div>
                <Cutout
                    contributors={item.contributors}
                    className={articleWidthStyles}
                    format={item}
                />
                <div css={[commentLineStylePosition, lineStyles]}>
                    <Lines count={8} />
                </div>

                <div css={articleWidthStyles}>
                    <Standfirst item={item} />
                </div>

                <section css={[articleWidthStyles, topBorder]}>
                    <Metadata item={item} />
                </section>

                <HeaderMedia item={item}/>
                <section css={articleWidthStyles}>
                    {OptionalLogo(item)}
                </section>
            </header>
            <ArticleBody className={[articleWidthStyles]} format={item}>
                {children}
            </ArticleBody>
            <section css={articleWidthStyles}>
                <Tags tags={item.tags} format={item}/>
            </section>
        </article>
        <section css={relatedContentStyles}>
            <RelatedContent content={item.relatedContent}/>
        </section>
        <div id='articleFooter'><FooterCcpa isCcpa={false} /></div>

    </main>


// ----- Exports ----- //

export default Comment;
