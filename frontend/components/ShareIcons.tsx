import React from 'react';
import { css } from 'react-emotion';
import { palette } from '@guardian/pasteup/palette';
import TwitterIconPadded from '@guardian/pasteup/icons/twitter-padded.svg';
import FacebookIcon from '@guardian/pasteup/icons/facebook.svg';
import EmailIcon from '@guardian/pasteup/icons/email.svg';
import { wide } from '@guardian/pasteup/breakpoints';

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
    fill: ${colour};
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

interface ShareIconType {
    id: SharePlatform;
    Icon: React.ComponentType;
}

interface ShareListItemType extends ShareIconType {
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
    pillarColour: string;
}> = ({ sharingUrls, pillarColour }) => {
    const icons: ShareIconType[] = [
        {
            id: 'facebook',
            Icon: FacebookIcon,
        },
        {
            id: 'twitter',
            Icon: TwitterIconPadded,
        },
        {
            id: 'email',
            Icon: EmailIcon,
        },
    ];

    const shareList = icons.reduce((list: ShareListItemType[], icon) => {
        const { id } = icon;
        const sharingUrl = sharingUrls[id as SharePlatform];

        if (sharingUrl) {
            const listItem: ShareListItemType = Object.assign(
                {},
                icon,
                sharingUrl,
            );
            list.push(listItem);
        }

        return list;
    }, []);

    return (
        <ul className={shareIconList}>
            {shareList.map(shareListItem => {
                const { Icon, id, url } = shareListItem;

                return (
                    <li className={shareIconsListItem} key={`${id}Share`}>
                        <a href={url} role="button">
                            <span className={shareIcon(pillarColour)}>
                                <Icon />
                            </span>
                        </a>
                    </li>
                );
            })}
        </ul>
    );
};
