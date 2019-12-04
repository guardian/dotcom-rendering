import React from 'react';
import { textSans, icons, basePx } from 'styles';
import { css, SerializedStyles } from '@emotion/core'
import { palette } from '@guardian/src-foundations';
import { until } from '@guardian/src-foundations/mq';
import { makeRelativeDate, formatDate } from 'date';
import LeftColumn from 'components/shared/leftColumn';
import { PillarStyles } from 'pillar';

const LiveblogBlockStyles = ({ kicker }: PillarStyles, highlighted: boolean): SerializedStyles => css`
    background: ${palette.neutral[100]};
    border-top: solid 1px ${highlighted ? kicker : palette.neutral[86]};
    border-bottom: solid 2px ${palette.neutral[93]};
    margin-top: 12px;
    margin-bottom: 12px;

    time {
        color: ${palette.neutral[46]};
        ${textSans}
        display: inline-block;
        margin: 0;
    }

    time:first-of-type {
        margin-bottom: 1em;
    }

    time:last-of-type {
        margin-top: 1em;
    }

    ${until.phablet} {
        margin-left: ${basePx(1)};
        margin-right: ${basePx(1)};
    }

    .rich-link a {
        color: ${kicker};
    }

    blockquote {
        font-style: italic;
        position: relative;
        margin-left: 0;
        padding-left: ${basePx(5)};

        &::before {
            ${icons}
            font-style: normal;
            font-size: 2.5rem;
            content: '\\e11c';
            color: ${kicker};
            position: absolute;
            left: 0;
            top: -10px;
        }
    }
`;

interface LiveblogBlockProps {
    pillarStyles: PillarStyles;
    highlighted: boolean;
    firstPublishedDate: Date;
    lastModifiedDate: Date;
    title: string;
    children: JSX.Element;
}

interface TitleProps {
    title: string;
    highlighted: boolean;
}

const Title = ({ title, highlighted }: TitleProps): JSX.Element | null => {
    const TitleStyles = css`
        padding: 0.5rem 0.125rem;
        background-color: ${palette.yellow.main};
    `
    return title ? <h3><span css={highlighted ? TitleStyles : null}>{title}</span></h3> : null;
}

const LiveblogBlock = (props: LiveblogBlockProps): JSX.Element => {
    const {
        pillarStyles,
        highlighted,
        title,
        children,
        firstPublishedDate,
        lastModifiedDate
    } = props;
    const relativeDate = makeRelativeDate(firstPublishedDate);
    const timeAgo = relativeDate ? <time>{relativeDate}</time> : null;
    return (
        <article>
            <LeftColumn
                columnContent={timeAgo}
                className={LiveblogBlockStyles(pillarStyles, highlighted)}
            >
                <Title highlighted={highlighted} title={title} />
                {children}
                <time>Last updated: {formatDate(lastModifiedDate)}</time>
            </LeftColumn>
        </article>
    )
}

export default LiveblogBlock;
