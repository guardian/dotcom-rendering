import React from 'react';
import { css } from 'react-emotion';
import { palette } from '@guardian/pasteup/palette';
import { sans } from '@guardian/pasteup/typography';

const wrapper = css`
    font-family: ${sans.body};
    overflow: hidden;
    position: relative;
    margin-bottom: 12px;
    padding-top: 12px;
    font-size: 14px;
    padding-left: 20px;
    border-left: 8px solid ${palette.neutral[86]};
    clear: left;
`;

const avatar = css`
    float: left;
    margin-right: 20px;
    margin-bottom: 12px;
`;

const metaLink = css`
    border-bottom: 1px solid ${palette.neutral[86]};
    color: ${palette.news.main};
    font-size: 12px;
    text-decoration: none;
    line-height: 1.5;
`;

const body = css`
    clear: left;

    p {
        font-size: 16px;
        font-weight: 300;
        margin-top: 0;
        margin-bottom: 8px;
        line-height: 1.5;
    }
`;

export const CommentBlockComponent: React.SFC<{
    element: CommentBlockElement;
}> = ({ element }) => (
    <div className={wrapper}>
        <amp-img
            class={avatar}
            layout="fixed"
            width="40"
            height="40"
            src={element.avatarURL}
        />
        <div>
            <a className={metaLink} href={element.profileURL}>
                {element.profileName}
            </a>
        </div>

        <div>
            <a className={metaLink} href={element.permalink}>
                {element.dateTime}
            </a>
        </div>

        <div // tslint:disable-line:react-no-dangerous-html
            className={body}
            dangerouslySetInnerHTML={{ __html: element.body }}
        />
    </div>
);
