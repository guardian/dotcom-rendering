import React from 'react';
import { css } from 'emotion';
import { pillarPalette } from '@frontend/lib/pillars';
import { serif, sans } from '@guardian/pasteup/typography';
import { palette } from '@guardian/pasteup/palette';
import { ShareIcons } from '@frontend/amp/components/ShareIcons';

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

const linkStyle = (pillar: Pillar) => css`
    position: relative;
    padding-left: 5px;
    padding-right: 6px;
    text-decoration: none;
    color: ${pillarPalette[pillar].main};
    font-family: ${serif.body};
    font-size: 15px;
    line-height: 24px;

    :after {
        content: '/';
        font-size: 16px;
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

const sectionLinkStyle = (pillar: Pillar) => css`
    position: relative;
    padding-left: 5px;
    padding-right: 6px;
    text-decoration: none;
    color: ${pillarPalette[pillar].main};
    font-family: ${serif.body};
    font-size: 16px;
    line-height: 22px;

    :after {
        content: '/';
        font-size: 16px;
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
    font-size: 12px;
    line-height: 16px;
    color: ${palette.neutral[46]};
    display: block;
    margin-bottom: -3px;
    font-family: ${sans.body};
`;

const siteLinkStyle = css`
    font-size: 13px;
    font-weight: bold;
    text-decoration: none;
    color: ${palette.neutral[7]};
    font-family: ${sans.body};
    line-height: 36px;
`;

const Submeta: React.SFC<{
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
}> = ({ pillar, sections, keywords, sharingURLs, pageID }) => {
    const sectionListItems = sections.map(link => (
        <li className={itemStyle} key={link.url}>
            <a
                className={sectionLinkStyle(pillar)}
                href={`https://www.theguardian.com/${link.url}`}
            >
                {link.title}
            </a>
        </li>
    ));

    const keywordListItems = keywords.map(link => (
        <li className={itemStyle} key={link.url}>
            <a
                className={linkStyle(pillar)}
                href={`https://www.theguardian.com/${link.url}`}
            >
                {link.title}
            </a>
        </li>
    ));

    return (
        <>
            <div className={guardianLines}>
                <span className={labelStyle}>Topics</span>
                <ul className={sectionListStyle}>{sectionListItems}</ul>
                <ul className={keywordListStyle}>{keywordListItems}</ul>
            </div>
            <ShareIcons
                sharingUrls={sharingURLs}
                pillar={pillar}
                displayIcons={[
                    'facebook',
                    'twitter',
                    'email',
                    'linkedIn',
                    'pinterest',
                    'googlePlus',
                    'whatsApp',
                    'messenger',
                ]}
            />
            {/* TODO link to actual (non-AMP) site here. Also handle comment count behaviour. */}
            <div className={guardianLines}>
                <a className={siteLinkStyle} href={`/${pageID}`}>
                    View on theguardian.com
                </a>
            </div>
        </>
    );
};

export default Submeta;
