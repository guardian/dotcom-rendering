import React from 'react';
import { css, cx } from 'react-emotion';
import { palette } from '@guardian/pasteup/palette';
import TwitterIconPadded from '@guardian/pasteup/icons/twitter-padded.svg';
import FacebookIcon from '@guardian/pasteup/icons/facebook.svg';
import EmailIcon from '@guardian/pasteup/icons/email.svg';
import { wide } from '@guardian/pasteup/breakpoints';
import { screenReaderOnly } from '@guardian/pasteup/mixins';
import { pillarMap, pillarPalette } from '../pillars';

const pillarFill = pillarMap(
    pillar =>
        css`
            fill: ${pillarPalette[pillar].main};
        `,
);

const shareIconList = css`
    ${wide} {
        flex: auto;
    }
`;

const shareIconsListItem = css`
    padding: 0 3px 6px 0;
    float: left;
    min-width: 32px;
    cursor: pointer;
`;

const shareIcon = (colour: string) => css`
    border: 1px solid ${palette.neutral[86]};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 32px;
    max-width: 100%;
    width: auto;
    height: 32px;
    border-radius: 50%;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    box-sizing: content-box;

    svg {
        height: 88%;
        width: 88%;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        margin: auto;
        position: absolute;
    }

    :hover {
        background-color: ${colour};
        border-color: ${colour};
        fill: white;
    }
`;

interface ShareListItemType {
    id: SharePlatform;
    Icon: React.ComponentType;
    url: string;
    userMessage: string;
}

export const SharingIcons: React.SFC<{
    sharingUrls: {
        [K in SharePlatform]?: {
            url: string;
            userMessage: string;
        }
    };
    displayIcons: SharePlatform[];
    pillar: Pillar;
}> = ({ sharingUrls, displayIcons, pillar }) => {
    const icons: { [K in SharePlatform]?: React.ComponentType } = {
        facebook: FacebookIcon,
        twitter: TwitterIconPadded,
        email: EmailIcon,
    };

    const shareList = displayIcons.reduce((list: ShareListItemType[], id) => {
        const icon = icons[id];
        const sharingUrl = sharingUrls[id];

        if (icon && sharingUrl) {
            const listItem: ShareListItemType = Object.assign(
                {
                    id,
                    Icon: icon,
                },
                sharingUrl,
            );
            list.push(listItem);
        }

        return list;
    }, []);

    return (
        <ul className={shareIconList}>
            {shareList.map(shareListItem => {
                const { Icon, id, url, userMessage } = shareListItem;

                return (
                    <li className={shareIconsListItem} key={`${id}Share`}>
                        <a href={url} role="button">
                            <span
                                className={css`
                                    ${screenReaderOnly};
                                `}
                            >
                                {userMessage}
                            </span>
                            <span
                                className={cx(
                                    shareIcon(pillarPalette[pillar].main),
                                    pillarFill[pillar],
                                )}
                            >
                                <Icon />
                            </span>
                        </a>
                    </li>
                );
            })}
        </ul>
    );
};
