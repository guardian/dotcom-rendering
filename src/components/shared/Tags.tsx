import React from 'react';
import { css } from '@emotion/core'
import { sideMargins, textSans } from '../../styles';

const tagsCss = css`
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
            color: #121212;
            background-color: #f6f6f6;
        }
    }
`;

const Tags = ({ tags }) => (
    <ul css={[tagsCss, sideMargins]}>
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
