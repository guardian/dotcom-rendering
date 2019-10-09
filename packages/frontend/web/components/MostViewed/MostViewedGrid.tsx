import React, { useState } from 'react';
import { css, cx } from 'emotion';
import { headline, palette } from '@guardian/src-foundations';
import { tablet, leftCol, wide, phablet } from '@guardian/pasteup/breakpoints';
import { screenReaderOnly } from '@guardian/pasteup/mixins';

import { TabType, TrailType } from './MostViewed';
import { MostViewedItem } from './MostViewedItem';

const listContainer = css`
    max-width: 460px;

    ${leftCol} {
        margin-left: 160px;
    }

    ${wide} {
        margin-left: 230px;
    }
`;

const list = css`
    margin-top: 12px;

    ${tablet} {
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

const tabsContainer = css`
    border-bottom: 1px solid ${palette.neutral[86]};

    &::after {
        content: '';
        display: block;
        clear: left;

        ${tablet} {
            display: none;
        }
    }

    ${tablet} {
        border-bottom: 0;
    }
`;

const listTab = css`
    width: 50%;
    float: left;
    border-top: 3px solid ${palette.neutral[93]};
    background-color: ${palette.neutral[93]};

    ${phablet} {
        width: 230px;
    }
`;

const selectedListTab = css`
    background-color: ${palette.neutral[100]};
`;

const tabButton = css`
    ${headline({ level: 1 })};
    margin: 0;
    border: 0;
    background: transparent;
    padding-left: 10px;
    padding-right: 6px;
    padding-top: 4px;
    text-align: left;
    text-decoration: none;
    font-weight: 600;
    min-height: 36px;
    display: block;
    width: 100%;

    &:hover {
        cursor: pointer;
    }
`;

type Props = {
    data: TabType[];
    sectionName?: string;
};

export const MostViewedGrid = ({ data, sectionName }: Props) => {
    const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

    return (
        <div className={listContainer}>
            {Array.isArray(data) && data.length > 1 && (
                <ul className={tabsContainer} role="tablist">
                    {(data || []).map((tab: TabType, i: number) => (
                        <li
                            className={cx(listTab, {
                                [selectedListTab]: i === selectedTabIndex,
                            })}
                            role="tab"
                            aria-selected={i === selectedTabIndex}
                            aria-controls={`tabs-popular-${i}`}
                            id={`tabs-popular-${i}-tab`}
                            key={`tabs-popular-${i}-tab`}
                        >
                            <button
                                className={tabButton}
                                onClick={() => setSelectedTabIndex(i)}
                            >
                                <span
                                    className={css`
                                        ${screenReaderOnly};
                                    `}
                                >
                                    Most viewed{' '}
                                </span>
                                <span // tslint:disable-line:react-no-dangerous-html
                                    // "Across The Guardian" has a non-breaking space entity between "The" and "Guardian"
                                    dangerouslySetInnerHTML={{
                                        __html: tab.heading,
                                    }}
                                />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            {(data || []).map((tab: TabType, i: number) => (
                <ol
                    className={cx(list, {
                        [hideList]: i !== selectedTabIndex,
                    })}
                    id={`tabs-popular-${i}`}
                    key={`tabs-popular-${i}`}
                    role="tabpanel"
                    aria-labelledby={`tabs-popular-${i}-tab`}
                    data-link-name={tab.heading}
                    data-testid={tab.heading}
                    data-link-context={`most-read/${sectionName}`}
                >
                    {(tab.trails || []).map((trail: TrailType, ii: number) => (
                        <MostViewedItem
                            key={trail.url}
                            trail={trail}
                            position={ii + 1}
                        />
                    ))}
                </ol>
            ))}
        </div>
    );
};
