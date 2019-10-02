import React from 'react';
import { PillarStyles, textSans } from '../../styles';
import { css, SerializedStyles } from '@emotion/core'
import { palette } from '@guardian/src-foundations'
import { makeRelativeDate, formatDate } from 'utils/date';

const LiveblogBlockStyles = ({ kicker }: PillarStyles, highlighted: boolean): SerializedStyles => css`
    background: ${palette.neutral[100]};
    padding: 8px;
    margin: 8px;
    border-top: solid 1px ${highlighted ? kicker : palette.neutral[86]};
    border-bottom: solid 2px ${palette.neutral[93]};

    time {
        color: ${palette.neutral[46]};
        ${textSans}
        display: inline-block;
        padding: 12px 0px;
    }

    h3 {
        margin: 0;
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

const Title = ({ title, highlighted }: { title: string; highlighted: boolean }): JSX.Element => {
    const TitleStyles = css`
        padding: 0.5rem 0.125rem;
        background-color: ${palette.yellow.main};
    `
    return <h3><span css={highlighted ? TitleStyles : null}>{title}</span></h3>
}

const LiveblogBlock = (props: LiveblogBlockProps): JSX.Element => {
    const { pillarStyles, highlighted, title, children, firstPublishedDate, lastModifiedDate } = props;
    return (
        <article css={LiveblogBlockStyles(pillarStyles, highlighted)}>
            {makeRelativeDate(firstPublishedDate).map(date => <time>{date}</time>).withDefault(null)}
            <Title highlighted={highlighted} title={title} />
            { children }
            <time>Last updated: { formatDate(lastModifiedDate) }</time>
        </article>
    )
}

export default LiveblogBlock;
