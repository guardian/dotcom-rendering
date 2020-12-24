import React from 'react';
import { css } from 'emotion';

import { neutral, text, border } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';

export const SyndicationButton: React.FC<{
    webUrl: string;
    internalPageCode: string;
}> = ({ webUrl, internalPageCode }) => {
    const submetaSyndication = css`
        display: none;

        ${from.desktop} {
            ${textSans.xsmall()};
            display: inline-block;
            float: right;
        }
        a {
            text-decoration: none;
        }
    `;

    const syndicationButton = css`
        color: ${text.supporting};
        background-color: transparent;
        border-color: ${border.secondary};
        border-radius: 62.5rem;
        border-width: 0.0625rem;
        border-style: solid;
        box-sizing: border-box;
        display: inline-block;

        &:hover,
        &:focus,
        &:active {
            border-color: ${neutral[46]};
        }

        line-height: 24px;
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        padding: 0 0.5rem;
    `;
    return (
        <div className={submetaSyndication}>
            <ul>
                <li>
                    <a
                        data-link-name="meta-syndication-article"
                        href={`https://syndication.theguardian.com/automation/?url=${encodeURIComponent(
                            webUrl,
                        )}&type=article&internalpagecode=${internalPageCode}`}
                        target="_blank"
                        rel="noopener"
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
