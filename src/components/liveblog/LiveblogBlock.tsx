import React from 'react';
import { PillarStyles } from '../../styles';
import { css, SerializedStyles } from '@emotion/core'
import { palette } from '@guardian/src-foundations'
import { makeRelativeDate, formatDate } from 'utils/date';

const LiveblogBlockStyles = ({ kicker }: PillarStyles, highlighted: boolean): SerializedStyles => css`
    background: ${palette.neutral[100]};
    padding: 8px;
    margin: 8px;
    border-top: solid 1px ${highlighted ? kicker : palette.neutral[86]};
    border-bottom: solid 2px ${palette.neutral[93]};
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
        display: inline-block;
        background-color: ${palette.yellow.main};
    `
    return <h3 css={highlighted ? TitleStyles : null}>{title}</h3>
}

const LiveblogBlock = (props: LiveblogBlockProps): JSX.Element => {
    const { pillarStyles, highlighted, title, children, firstPublishedDate, lastModifiedDate } = props;
    return (
        <article css={LiveblogBlockStyles(pillarStyles, highlighted)}>
            <p>{makeRelativeDate(firstPublishedDate)}</p>
            <Title highlighted={highlighted} title={title} />
            { children }
            <p>Last updated: { formatDate(lastModifiedDate) }</p>
        </article>
    )
}

export default LiveblogBlock;
