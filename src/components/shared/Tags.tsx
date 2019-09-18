import React from 'react';
import { css } from '@emotion/core'
import { sidePadding, textSans, darkModeCss } from '../../styles';
import { palette } from '@guardian/src-foundations';

const tagsStyles = css`
    margin-top: 0;
    margin-bottom: 0;

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

    ${sidePadding}
`;

const tagsDarkStyles = darkModeCss`
    background: ${palette.neutral[10]};
    color: ${palette.neutral[86]};

    li a {
        color: ${palette.neutral[60]};
        background-color: ${palette.neutral[20]};
    }
`;

interface Tag {
    webUrl: string;
    webTitle: string;
}

interface TagsProps {
    tags: Tag[];
}

const Tags = ({ tags }: TagsProps) => (
    <ul css={[tagsStyles, tagsDarkStyles]}>
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
