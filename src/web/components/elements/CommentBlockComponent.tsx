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
    padding: 4px 0 0 10px;
    border-left: 1px ${palette.neutral[86]} solid;
    border-top: 1px ${palette.neutral[86]} solid;
    margin-top: 12px;
`;

const bodyContentStyles = css`
    p {
        word-break: break-word;
        margin-bottom: 8px;
    }
`;

const profileWrapperStyles = css`
    display: flex;
    margin-top: ${space[4]}px;
    margin-bottom: ${space[12]}px;
    a {
        border-bottom: none;
    }
`;

const avatarStyles = css`
    width: ${space[12]}px;
    height: ${space[12]}px;
    margin-right: ${space[2]}px;
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
                <a className={avatarStyles} href={profileURL}>
                    <img
                        className={css`
                            border-radius: 50%;
                        `}
                        src={avatarURL}
                        alt=""
                    />
                </a>
                <div>
                    <a
                        className={css`
                            ${textSans.medium({ fontWeight: 'bold' })};
                            border-bottom: none;
                        `}
                        href={profileURL}
                    >
                        {profileName}
                    </a>
                    <p
                        className={css`
                            ${textSans.small()};
                        `}
                    >
                        {dateTime}
                    </p>
                </div>
            </div>
        </div>
    );
};
