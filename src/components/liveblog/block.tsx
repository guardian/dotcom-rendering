import React, { ReactNode } from 'react';
import { textSans, icons, basePx, linkStyle, textMargin, textPadding } from 'styles';
import { css, SerializedStyles } from '@emotion/core'
import { neutral, brandAlt } from '@guardian/src-foundations/palette';
import { until } from '@guardian/src-foundations/mq';
import { makeRelativeDate, formatDate } from 'date';
import LeftColumn from 'components/shared/leftColumn';
import { PillarStyles, Pillar, getPillarStyles } from 'pillar';
import { Option } from 'types/option';
import { remSpace } from '@guardian/src-foundations';

const LiveblogBlockStyles = ({ kicker }: PillarStyles, highlighted: boolean): SerializedStyles => css`
    background: ${neutral[100]};
    border-top: solid 1px ${highlighted ? kicker : neutral[86]};
    border-bottom: solid 2px ${neutral[93]};
    margin-top: 12px;
    margin-bottom: 12px;

    time {
        color: ${neutral[46]};
        ${textSans}
        display: inline-block;
        margin: 0;
    }

    time {
        ${textPadding}
        margin-top: 1rem;
    }

    time:nth-child(1) {
        margin-top: 0;
        margin-bottom: 1rem;
        padding-left: ${remSpace[2]};
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
        padding-left: 4rem;

        &::before {
            ${icons}
            font-style: normal;
            font-size: 2.5rem;
            content: '\\e11c';
            color: ${kicker};
            position: absolute;
            left: 0;
            ${textPadding}
            top: -10px;
        }
    }

    aside {
        width: calc(100% - 2rem);
        ${textMargin};
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
        padding: 0.1rem 0.125rem;
        background-color: ${brandAlt[400]};
        ${textMargin}
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
        .fmap<JSX.Element | null>(date => <time>{makeRelativeDate(date)}</time>)
        .withDefault(null)

    const relativeLastModified: JSX.Element | null = lastModifiedDate
        .fmap<JSX.Element | null>(date => <time>Last updated: {formatDate(date)}</time>)
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
