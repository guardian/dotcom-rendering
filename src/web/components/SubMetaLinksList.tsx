import React from 'react';
import { css, cx } from 'emotion';
import { palette } from '@guardian/src-foundations';
import { headline, textSans } from '@guardian/src-foundations/typography';

import { pillarMap, pillarPalette } from '@root/src/lib/pillars';

const pillarColours = pillarMap(
    pillar =>
        css`
            color: ${pillarPalette[pillar].main};
        `,
);

const subMetaLinksList = css`
    list-style: none;
`;

const subMetaKeywordLinksList = css`
    padding-bottom: 12px;
    margin-bottom: 6px;
    border-bottom: 1px solid ${palette.neutral[86]};
`;

const subMetaLinksListItem = css`
    margin-right: 5px;
    display: inline-block;
    a {
        position: relative;
        display: block;
        padding-right: 5px;
        text-decoration: none;
    }
    a::after {
        content: '/';
        position: absolute;
        pointer-events: none;
        top: 0;
        right: -3px;
        color: ${palette.neutral[86]};
    }
    a:hover {
        text-decoration: underline;
    }
`;

const subMetaLink = css`
    text-decoration: none;
    :hover {
        text-decoration: underline;
    }
`;

const subMetaSectionLink = css`
    ${headline.xxxsmall()};
`;

const subMetaKeywordLink = css`
    ${textSans.small()};
`;

const hideSlash = css`
    a::after {
        content: '';
    }
`;

export const SubMetaLinksList: React.FC<{
    links: SimpleLinkType[];
    isSectionLinkList: boolean;
    pillar: Pillar;
}> = ({ links, isSectionLinkList, pillar }) => (
    <ul
        className={cx(subMetaLinksList, [
            !isSectionLinkList && subMetaKeywordLinksList,
        ])}
    >
        {links.map((link, i) => (
            <li
                className={cx(
                    subMetaLinksListItem,
                    [
                        isSectionLinkList
                            ? subMetaSectionLink
                            : subMetaKeywordLink,
                    ],
                    {
                        [hideSlash]: i === links.length - 1,
                    },
                )}
                key={link.url}
            >
                <a
                    className={cx(subMetaLink, pillarColours[pillar])}
                    href={link.url}
                >
                    {link.title}
                </a>
            </li>
        ))}
    </ul>
);
