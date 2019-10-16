import React from 'react';
import { desktop } from '@guardian/pasteup/breakpoints';
import { css } from 'emotion';
import { textSans } from '@guardian/src-foundations';
import { palette } from '@guardian/pasteup/palette';

export const SyndicationButton: React.FC<{
    webUrl: string;
    internalPageCode: string;
}> = ({ webUrl, internalPageCode }) => {
    const submetaSyndication = css`
        display: none;

        ${desktop} {
            ${textSans({ level: 1})};
            display: inline-block;
            float: right;
        }
        a {
            text-decoration: none;
        }
    `;

    const syndicationButton = css`
        color: ${palette.neutral[46]};
        background-color: transparent;
        border-color: ${palette.neutral[85]};
        border-radius: 62.5rem;
        border-width: 0.0625rem;
        border-style: solid;
        box-sizing: border-box;
        display: inline-block;

        &:hover,
        &:focus,
        &:active {
            border-color: ${palette.neutral[46]};
        }

        line-height: 24px;
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        padding: 0 0.5rem;
        margin-right: 8;
    `;
    return (
        <div className={submetaSyndication}>
            <ul>
                <li>
                    <a
                        data-link-name={`meta-syndication-article`}
                        href={`https://syndication.theguardian.com/automation/?url=${encodeURIComponent(
                            webUrl,
                        )}&type=article&internalpagecode=${internalPageCode}`}
                        target="_blank"
                        title="Reuse this content"
                    >
                        <span className={syndicationButton}>
                            Reuse this content
                        </span>
                    </a>
                </li>
            </ul>
        </div>
    );
};
