import React from 'react';
import { css } from 'emotion';
import { unescapeData } from '@root/src/lib/escapeData';
import { textSans } from '@guardian/src-foundations/typography';
import { palette, space } from '@guardian/src-foundations';

type Props = {
    body: string;
    avatarURL: string;
    profileURL: string;
    profileName: string;
    dateTime: string;
};

const commentWrapper = css`
    ${textSans.medium()};
    padding: 4px 0 0 10px;
    border-left: 1px ${palette.neutral[86]} solid;
    border-top: 1px ${palette.neutral[86]} solid;
    margin-top: 12px;
`;

const bodyContent = css`
    p {
        word-break: break-word;
        margin-bottom: 8px;
    }
`;

const profileWrapper = css`
    display: flex;
    margin-top: ${space[4]}px;
    margin-bottom: ${space[12]}px;
`;

const avatar = css`
    width: ${space[12]}px;
    height: ${space[12]}px;
    margin-right: ${space[2]}px;
    border-bottom: none !important;
    img {
        border-radius: 50%;
    }
`;

const userName = css`
    a {
        ${textSans.medium({ fontWeight: 'bold' })};
        /* color: ${palette.neutral[86]}; */
        border-bottom: none;
    }
    p {
        ${textSans.small()};
    }
`;

export const CommentBlockComponent = ({
    body,
    avatarURL,
    profileURL,
    profileName,
    dateTime,
}: Props) => {
    return (
        <div className={commentWrapper}>
            <div
                className={bodyContent}
                dangerouslySetInnerHTML={{ __html: unescapeData(body) }}
            />
            <div className={profileWrapper}>
                <a className={avatar} href={profileURL}>
                    <img src={avatarURL} alt="" />
                </a>
                <div className={userName}>
                    <a href={profileURL}>{profileName}</a>
                    <p>{dateTime}</p>
                </div>
            </div>
        </div>
    );
};
