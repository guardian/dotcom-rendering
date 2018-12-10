import React from 'react';
import { css } from 'react-emotion';
import { pillarPalette } from '@frontend/lib/pillars';
import { serif, sans } from '@guardian/pasteup/fonts';
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
    margin-bottom: 6px;

    margin-top: 0.75rem;
`;

const linkStyle = (pillar: Pillar) => css`
    position: relative;
    padding-left: 0.3rem;
    padding-right: 0.35rem;
    text-decoration: none;
    color: ${pillarPalette[pillar].main};
    font-family: ${serif.body};
    font-size: 15px;
    line-height: 1.5rem;

    :after {
        content: '/';
        font-size: 1em;
        position: absolute;
        pointer-events: none;
        top: 0;
        right: -0.19em;
        color: #767676;
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
    margin-left: -0.35rem;
    padding-top: 0.375rem;
    padding-bottom: 0.75rem;
    border-bottom: 0.0625rem solid #dcdcdc;
    margin-bottom: 0.375rem;
`;

const sectionLinkStyle = (pillar: Pillar) => css`
    position: relative;
    padding-left: 0.3rem;
    padding-right: 0.35rem;
    text-decoration: none;
    color: ${pillarPalette[pillar].main};
    font-family: ${serif.body};
    font-size: 16px;
    line-height: 1.375rem;

    :after {
        content: '/';
        font-size: 1em;
        position: absolute;
        pointer-events: none;
        top: 0;
        right: -0.19em;
        color: #767676;
    }
`;

const sectionListStyle = css`
    display: block;
    margin-left: -0.35rem;
`;

const labelStyle = css`
    font-size: 0.75rem;
    line-height: 1rem;
    color: #767676;
    display: block;
    margin-bottom: -0.1875rem;
`;

const siteLinkStyle = css`
    font-size: 0.8125rem;
    font-weight: bold;
    text-decoration: none;
    color: ${palette.neutral[7]};
    font-family: ${sans.body};
    line-height: 2.25rem;
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
