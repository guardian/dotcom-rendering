// ----- Imports ----- //

import React from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { palette } from '@guardian/src-foundations';

import { sidePadding, textSans, darkModeCss } from 'styles';
import { formatDate } from 'date';
import Avatar from 'components/shared/avatar';
import Follow from 'components/shared/follow';
import { PillarStyles, getPillarStyles, Pillar } from 'pillar';
import { Option } from 'types/option';
import { renderText } from 'renderer';
import { Article } from 'article';


// ----- Styles ----- //

const Styles = ({ kicker }: PillarStyles): SerializedStyles => css`
    width: 80%;
    float: left;
    display: inline-block;

    .author {
        address {
            line-height: 2.2rem;
            font-style: inherit;

            a {
                text-decoration: none;
                font-weight: 500;
            }
        }

        address, .follow, a {
            color: ${kicker};
        }

        time, .follow {
            ${textSans}
        }

        time {
            font-size: 1.4rem;
            color: ${palette.neutral[46]};
        }
    }
`;

const DarkStyles = ({ inverted }: PillarStyles): SerializedStyles => darkModeCss`
    background: ${palette.neutral.darkMode};
    color: ${palette.neutral[86]};

    .author {
        address, .follow, a {
            color: ${inverted};
        }

        time {
            color: ${palette.neutral[60]};
        }
    }
`;


// ----- Subcomponents ----- //

interface AuthorProps {
    byline: Option<DocumentFragment>;
    pillar: Pillar;
}

const Author = (props: AuthorProps): JSX.Element | null =>
    props.byline.map<JSX.Element | null>((bylineHtml: DocumentFragment) =>
        // This is not an iterator, ESLint is confused
        // eslint-disable-next-line react/jsx-key
        <address>{renderText(bylineHtml, props.pillar)}</address>
    ).withDefault(null);


// ----- Component ----- //

interface Props {
    article: Article;
    imageSalt: string;
}

function Byline({ article, imageSalt }: Props): JSX.Element {
    const pillarStyles = getPillarStyles(article.pillar);

    return (
        <div
            css={[Styles(pillarStyles), DarkStyles(pillarStyles)]}
        >
            <div css={sidePadding}>
                <Avatar
                    contributors={article.contributors}
                    bgColour={pillarStyles.inverted}
                    imageSalt={imageSalt}
                />
                <div className="author">
                    <Author byline={article.bylineHtml} pillar={article.pillar} />
                    <time className="date">{ formatDate(new Date(article.publishDate)) }</time>
                    <Follow contributors={article.contributors} />
                </div>
            </div>
        </div>
    );
}


// ----- Exports ----- //

export default Byline;
