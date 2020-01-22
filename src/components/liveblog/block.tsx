import React, { ReactNode } from 'react';
import { textSans, icons, basePx, linkStyle } from 'styles';
import { css, SerializedStyles } from '@emotion/core'
import { palette } from '@guardian/src-foundations';
import { until } from '@guardian/src-foundations/mq';
import { makeRelativeDate, formatDate } from 'date';
import LeftColumn from 'components/shared/leftColumn';
import { PillarStyles, Pillar, getPillarStyles } from 'pillar';
import { Option } from 'types/option';

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

    .rich-link {
        ${linkStyle(kicker)}
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

    aside {
        margin-left: 0;
        width: 100%;
    }
`;

interface LiveblogBlockProps {
    pillar: Pillar;
    highlighted: boolean;
    firstPublishedDate: Option<Date>;
    lastModifiedDate: Option<Date>;
    title: string;
    children: ReactNode;
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

const LiveblogBlock = ({
    pillar,
    highlighted,
    title,
    children,
    firstPublishedDate,
    lastModifiedDate,
}: LiveblogBlockProps): JSX.Element => {

    const relativeFirstPublished: JSX.Element | null = firstPublishedDate
        .map<JSX.Element | null>(date => <time>{makeRelativeDate(date)}</time>)
        .withDefault(null)

    const relativeLastModified: JSX.Element | null = lastModifiedDate
        .map<JSX.Element | null>(date => <time>Last updated: {formatDate(date)}</time>)
        .withDefault(null)

    return (
        <article>
            <LeftColumn
                columnContent={relativeFirstPublished}
                className={LiveblogBlockStyles(getPillarStyles(pillar), highlighted)}
            >
                <Title highlighted={highlighted} title={title} />
                {children}
                {relativeLastModified}
            </LeftColumn>
        </article>
    )
}

export default LiveblogBlock;
