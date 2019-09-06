import React from 'react';
import { css } from '@emotion/core'
import { sideMargins, textSans } from '../../styles';
import { palette } from '@guardian/src-foundations';

const tagsStyles = css`
    display: block;
    list-style: none;
    padding: 8px 0 16px 0;
    ${textSans}

    li {
        margin: 8px 8px 4px 0;
        display: inline-block;

        a {
            text-decoration: none;
            white-space: nowrap;
            padding: 6px 16px;
            border-radius: 30px;
            text-overflow: ellipsis;
            max-width: 18.75rem;
            color: ${palette.neutral[7]};
            background-color: ${palette.neutral[97]};
        }
    }

    ${sideMargins}
`;

interface Tag {
    webUrl: string;
    webTitle: string;
}

interface TagsProps {
    tags: Tag[];
}

const Tags = ({ tags }: TagsProps) => (
    <ul css={tagsStyles}>
        {tags.map((tag, index) => {
            return <li key={index}>
                <a href={tag.webUrl}>
                    {tag.webTitle}
                </a>
            </li>
        })}
    </ul>
)

export default Tags;
