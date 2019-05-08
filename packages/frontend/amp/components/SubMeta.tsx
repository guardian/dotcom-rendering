import React from 'react';
import { css, cx } from 'emotion';
import { pillarPalette } from '@frontend/lib/pillars';
import { textSans } from '@guardian/pasteup/typography';
import { palette } from '@guardian/pasteup/palette';
import { ShareIcons } from '@frontend/amp/components/ShareIcons';
import CommentIcon from '@guardian/pasteup/icons/comment.svg';
import { composeLabsCSS } from '@frontend/amp/lib/compose-labs-css';

const guardianLines = css`
    background-image: repeating-linear-gradient(
        to bottom,
        ${palette.neutral[86]},
        ${palette.neutral[86]} 1px,
        transparent 1px,
        transparent 4px
    );
    background-repeat: repeat-x;
    background-position: top;
    background-size: 1px 13px;
    padding-top: 18px;
    margin-top: 12px;
`;

// Labs paid content only
const guardianLinesLabs = css`
    background-image: repeating-linear-gradient(
        to bottom,
        ${palette.neutral[60]},
        ${palette.neutral[60]} 1px,
        transparent 1px,
        transparent 4px
    );
`;

const linkStyle = (pillar: Pillar) => css`
    position: relative;
    padding-left: 5px;
    padding-right: 6px;
    text-decoration: none;
    color: ${pillarPalette[pillar].dark};
    ${textSans(4)};
    :after {
        content: '/';
        ${textSans(5)};
        position: absolute;
        pointer-events: none;
        top: 0;
        right: -3px;
        color: ${palette.neutral[46]};
    }
`;

const itemStyle = css`
    display: inline-block;

    :last-of-type > a::after {
        content: '';
    }
`;

const keywordListStyle = css`
    display: block;
    margin-left: -6px;
    padding-top: 6px;
    padding-bottom: 12px;
    border-bottom: 1px solid ${palette.neutral[86]};
    margin-bottom: 6px;
`;

// Labs paid content only
const keywordListStyleLabs = css`
    border-bottom: 1px solid ${palette.neutral[60]};
`;

const sectionLinkStyle = (pillar: Pillar) => css`
    position: relative;
    padding-left: 5px;
    padding-right: 6px;
    text-decoration: none;
    color: ${pillarPalette[pillar].dark};
    ${textSans(5)};
    :after {
        content: '/';
        ${textSans(8)};
        position: absolute;
        pointer-events: none;
        top: 0;
        right: -3px;
        color: ${palette.neutral[46]};
    }
`;

const sectionListStyle = css`
    display: block;
    margin-left: -6px;
`;

const labelStyle = css`
    ${textSans(1)};
    color: ${palette.neutral[46]};
    display: block;
    margin-bottom: -3px;
`;

const siteLinks = css`
    display: flex;
    justify-content: space-between;
`;

const siteLinkStyle = css`
    ${textSans(2)};
    font-weight: bold;
    text-decoration: none;
    color: ${palette.neutral[7]};
    line-height: 36px;
    text-align: right;
`;

const commentIcon = css`
    vertical-align: middle;
    margin-bottom: -5px;
`;

const shareIcons = css`
    padding-bottom: 30px;
`;

export const SubMeta: React.FC<{
    pillar: Pillar;
    sections: SimpleLinkType[];
    keywords: SimpleLinkType[];
    sharingURLs: {
        [K in SharePlatform]?: {
            url: string;
            userMessage: string;
        }
    };
    pageID: string;
    isCommentable: boolean;
    guardianBaseURL: string;
}> = ({
    pillar,
    sections,
    keywords,
    sharingURLs,
    pageID,
    isCommentable,
    guardianBaseURL,
}) => {
    const sectionListItems = sections.map(link => (
        <li className={itemStyle} key={link.url}>
            <a
                className={sectionLinkStyle(pillar)}
                href={`${guardianBaseURL}${link.url}`}
            >
                {link.title}
            </a>
        </li>
    ));

    const keywordListItems = keywords.map(link => (
        <li className={itemStyle} key={link.url}>
            <a
                className={linkStyle(pillar)}
                href={`${guardianBaseURL}${link.url}`}
            >
                {link.title}
            </a>
        </li>
    ));

    return (
        <>
            <div
                className={composeLabsCSS(
                    pillar,
                    guardianLines,
                    guardianLinesLabs,
                )}
            >
                <span className={labelStyle}>Topics</span>
                <ul className={sectionListStyle}>{sectionListItems}</ul>
                <ul
                    className={composeLabsCSS(
                        pillar,
                        keywordListStyle,
                        keywordListStyleLabs,
                    )}
                >
                    {keywordListItems}
                </ul>
            </div>
            <ShareIcons
                className={shareIcons}
                sharingUrls={sharingURLs}
                pillar={pillar}
                displayIcons={[
                    'facebook',
                    'twitter',
                    'email',
                    'linkedIn',
                    'pinterest',
                    'whatsApp',
                    'messenger',
                ]}
            />
            {/* TODO link to actual (non-AMP) site here. Also handle comment count behaviour. */}
            <div className={cx(guardianLines, siteLinks)}>
                {isCommentable && (
                    <a
                        className={siteLinkStyle}
                        href={`${guardianBaseURL}/${pageID}#comments`}
                    >
                        <CommentIcon className={commentIcon} /> View comments
                    </a>
                )}
                <a
                    className={siteLinkStyle}
                    href={`${guardianBaseURL}/${pageID}`}
                >
                    View on theguardian.com
                </a>
            </div>
        </>
    );
};
