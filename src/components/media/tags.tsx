import React from 'react';
import { css, SerializedStyles } from '@emotion/core'
import { neutral } from '@guardian/src-foundations/palette';
import { remSpace } from "@guardian/src-foundations";
import { textSans } from '@guardian/src-foundations/typography';

const tagsStyles = (background: string = neutral[20]): SerializedStyles => css`
    margin-top: 0;
    margin-bottom: 0;

    display: block;
    list-style: none;
    padding: ${remSpace[2]} 0 ${remSpace[3]} 0;
    ${textSans.medium()}

    li {
        margin: ${remSpace[2]} ${remSpace[2]} ${remSpace[1]} 0;
        display: inline-block;
        padding: ${remSpace[1]} 0;

        a {
            text-decoration: none;
            white-space: nowrap;
            padding: ${remSpace[2]} ${remSpace[3]};
            border-radius: 30px;
            text-overflow: ellipsis;
            max-width: 18.75rem;
            color: ${neutral[60]};
            background-color: ${background};
        }
    }
`;

interface TagsProps {
    tags: {
        webUrl: string;
        webTitle: string;
    }[];
    background?: string;
}

const Tags = ({ tags, background }: TagsProps): JSX.Element => (
    <ul css={tagsStyles(background)}>
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
