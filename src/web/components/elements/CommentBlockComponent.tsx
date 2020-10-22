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

const commentWrapperStyles = css`
    ${textSans.medium()};
    border-left: 1px ${palette.neutral[86]} solid;
    border-top: 1px ${palette.neutral[86]} solid;
    padding: ${space[1]}px 0 0 ${space[2]}px;
    margin-top: ${space[3]}px;
`;

const bodyContentStyles = css`
    p {
        word-break: break-word;
        margin-bottom: ${space[2]}px;
    }
`;

const profileWrapperStyles = css`
    display: flex;
    margin-top: ${space[4]}px;
    margin-bottom: ${space[12]}px;
`;

const usernameWrapperStyles = css`
    display: flex;
    flex-direction: column;
`;

const avatarStyles = css`
    width: ${space[12]}px;
    height: ${space[12]}px;
    margin-right: ${space[2]}px;
    //still can't overwrite inherited style from paraStyles
    border-bottom: none !important;
`;

export const CommentBlockComponent = ({
    body,
    avatarURL,
    profileURL,
    profileName,
    dateTime,
}: Props) => {
    return (
        <div className={commentWrapperStyles}>
            <div
                className={bodyContentStyles}
                dangerouslySetInnerHTML={{ __html: unescapeData(body) }}
            />
            <div className={profileWrapperStyles}>
                <a
                    className={avatarStyles}
                    href={profileURL}
                    aria-hidden="true"
                >
                    <img
                        className={css`
                            border-radius: 50%;
                        `}
                        src={avatarURL}
                        alt=""
                    />
                </a>
                <div className={usernameWrapperStyles}>
                    <a
                        className={css`
                            ${textSans.medium({ fontWeight: 'bold' })};
                            width: max-content;
                        `}
                        href={profileURL}
                    >
                        {profileName}
                    </a>
                    <time
                        className={css`
                            ${textSans.small()};
                        `}
                    >
                        {dateTime}
                    </time>
                </div>
            </div>
        </div>
    );
};
