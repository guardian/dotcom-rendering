import React from 'react';
import { css, cx } from 'react-emotion';
import { serif } from '@guardian/pasteup/fonts';
import { palette } from '@guardian/pasteup/palette';
import {
    desktop,
    mobileLandscape,
    tablet,
    leftCol,
} from '@guardian/pasteup/breakpoints';
import { BigNumber } from '@guardian/guui';
import { AsyncClientComponent } from './lib/AsyncClientComponent';

const container = css`
    border-top: 1px solid ${palette.neutral[86]};
    padding-top: 3px;

    ${desktop} {
        padding-top: 6px;
    }
`;

const heading = css`
    font-family: ${serif.headline};
    color: ${palette.neutral[7]};
    font-size: 24px;
    font-weight: 900;
    line-height: 1;
    padding-right: 5px;
    padding-bottom: 4px;

    ${leftCol} {
        font-size: 20px;
        line-height: 1.2;
        width: 140px;
        position: relative;

        :after {
            content: '';
            display: block;
            position: absolute;
            height: 30px;
            width: 1px;
            background-color: ${palette.neutral[86]};
            right: -11px;
            top: -6px;
        }
    }

    ${leftCol} {
        width: 220px;
    }
`;

const listContainer = css`
    ${leftCol} {
        margin-left: 160px;
    }

    ${leftCol} {
        margin-left: 240px;
    }
`;

const list = css`
    margin-top: 12px;

    ${desktop} {
        border-top: 1px solid ${palette.neutral[86]};
        width: 620px;
        min-height: 300px;
        column-width: 300px;
        column-gap: 20px;
        column-fill: balance;
        column-count: 2;
    }
`;

const hideList = css`
    display: none;
`;

const listItem = css`
    position: relative;
    box-sizing: border-box;
    padding-top: 4px;
    padding-bottom: 24px;

    &:before {
        position: absolute;
        top: 0;
        right: 10px;
        left: 0;
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background-color: ${palette.neutral[86]};
    }

    :first-child {
        &:before {
            display: none;
        }
    }

    &:after {
        content: '';
        display: block;
        clear: both;
    }

    ${tablet} {
        padding-top: 3px;
        padding-bottom: 0;
        min-height: 72px;
    }

    ${desktop} {
        height: 100%;
        display: inline-block;
        width: 100%;

        :nth-child(6) {
            &:before {
                display: none;
            }
        }
    }
`;

const bigNumber = css`
    float: left;
    margin-top: 3px;
    fill: ${palette.neutral[7]};
`;

const headlineHeader = css`
    margin-top: -4px;
    margin-left: 70px;
    padding-top: 2px;
    padding-bottom: 2px;
    word-wrap: break-word;
    overflow: hidden;
`;

const headlineLink = css`
    text-decoration: none;
    color: ${palette.neutral[7]};
    font-family: ${serif.headline};
    font-size: 16px;
    line-height: 1.2;
    font-weight: 500;
`;

const tabsContainer = css`
    max-width: 460px;
`;

const listTab = css`
    width: 230px;
    float: left;
    border-top: 3px solid #ededed;
`;

const tabLink = css`
    padding-left: 10px;
    padding-right: 6px;
    padding-top: 4px;
    text-align: left;
    text-decoration: none;
    line-height: 20px;
    font-size: 16px;
    font-family: ${serif.headline};
    font-weight: 600;
    min-height: 36px;
    display: block;
    background-color: #ededed;
`;

interface Trail {
    url: string;
    linkText: string;
}

interface Tab {
    heading: string;
    trails: Trail[];
}

export const MostViewed: React.SFC<{
    sectionName: string;
}> = ({ sectionName }) => {
    const fetchTrails: () => Promise<Tab[]> = () => {
        const sectionsWithoutPopular = ['info', 'global'];
        const hasSection =
            sectionName && !sectionsWithoutPopular.includes(sectionName);
        const endpoint = `/most-read${
            hasSection ? `/${sectionName}` : ''
        }.json`;

        return new Promise((resolve, reject) => {
            fetch(`https://api.nextgen.guardianapps.co.uk${endpoint}?guui`)
                .then(response => {
                    if (!response.ok) {
                        resolve([]);
                    }
                    return response.json();
                })
                .then(mostRead => {
                    console.log('mostRead --->', mostRead);

                    if (Array.isArray(mostRead)) {
                        resolve(mostRead);
                    }

                    resolve([]);
                })
                .catch(_ => resolve([]));
        });
    };

    return (
        <div className={container}>
            <h2 className={heading}>Most Viewed</h2>
            <AsyncClientComponent f={fetchTrails}>
                {({ data }) => (
                    <div className={listContainer}>
                        {Array.isArray(data) &&
                            data.length > 1 && (
                                <ol className={tabsContainer}>
                                    {(data || []).map((tab, i) => (
                                        <li className={listTab}>
                                            <a className={tabLink}>{tab.heading}</a>
                                        </li>
                                    ))}
                                </ol>
                            )}
                        {(data || []).map((tab, i) => (
                            <ul className={cx(list, { [hideList]: i > 0 })}>
                                {(tab.trails || []).map((trail, i) => (
                                    <li className={listItem} key={trail.url}>
                                        <span className={bigNumber}>
                                            <BigNumber index={i + 1} />
                                        </span>
                                        <h2 className={headlineHeader}>
                                            <a
                                                className={headlineLink}
                                                href={trail.url}
                                            >
                                                {trail.linkText}
                                            </a>
                                        </h2>
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </div>
                )}
            </AsyncClientComponent>
        </div>
    );
};
