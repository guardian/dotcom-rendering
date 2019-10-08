import React, { Component } from 'react';
import { css, cx } from 'emotion';
import { textSans, headline, palette } from '@guardian/src-foundations';
import {
    desktop,
    tablet,
    leftCol,
    wide,
    phablet,
    mobileLandscape,
} from '@guardian/pasteup/breakpoints';
import { screenReaderOnly } from '@guardian/pasteup/mixins';
import { Container } from '@guardian/guui';
import { BigNumber } from '@guardian/guui';
import { AsyncClientComponent } from './lib/AsyncClientComponent';
import { namedAdSlotParameters } from '@frontend/model/advertisement';
import { AdSlot, labelStyles } from '@frontend/web/components/AdSlot';
import ClockIcon from '@guardian/pasteup/icons/clock.svg';
import { QuoteIcon } from '@frontend/web/components/QuoteIcon';
import { pillarPalette } from '@frontend/lib/pillars';
import { OutbrainContainer } from '@frontend/web/components/Outbrain';

const container = css`
    padding-top: 3px;

    ${desktop} {
        padding-top: 6px;
    }
`;

const mostPopularBody = css`
    ${desktop} {
        display: flex;
        justify-content: space-between;
    }
`;

const articleContainerStyles = css`
    position: relative;
    background-color: ${palette.neutral[100]};
    padding: 0 10px;

    ${mobileLandscape} {
        padding: 0 20px;
    }
`;

const heading = css`
    ${headline({ level: 2 })};
    color: ${palette.neutral[7]};
    font-weight: 900;
    padding-right: 5px;
    padding-bottom: 4px;

    ${leftCol} {
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

    ${wide} {
        width: 220px;
    }
`;

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

    :first-of-type {
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

        :nth-of-type(6) {
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
    font-weight: 500;
    ${headline({ level: 1 })};
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

const adSlotUnspecifiedWidth = css`
    .ad-slot {
        margin: 12px auto;
        min-width: 300px;
        min-height: 274px;
        text-align: center;
    }
`;

const mostPopularAdStyle = css`
    .ad-slot--most-popular {
        width: 300px;
        margin: 12px auto;
        min-width: 300px;
        min-height: 274px;
        text-align: center;
        ${desktop} {
            margin: 0;
            width: auto;
        }
    }
    ${labelStyles};
`;

const liveKicker = (colour: string) => css`
    color: ${colour};
    font-weight: 700;

    &::after {
        content: '/';
        display: inline-block;
        font-weight: 900;
        margin: 0 4px;
    }
`;

function getColour(pillar: Pillar) {
    return pillarPalette[pillar].main;
}

const oldArticleMessage = css`
    ${textSans({ level: 1 })}
    background: ${palette.yellow.main};
    display: inline-block;
    color: ${palette.neutral[7]};
    margin: 4px 0 6px;
    padding: 3px 5px;

    svg {
        fill: currentColor;
    }

    .embolden {
        font-weight: bold;
    }
`;

const oldClockWrapper = css`
    margin-right: 3px;
`;

const AgeWarning: React.FC<{
    ageWarning?: string;
}> = ({ ageWarning }) => {
    if (!ageWarning) {
        return <></>;
    }
    return (
        <div>
            <div className={oldArticleMessage}>
                <span className={oldClockWrapper}>
                    <ClockIcon />
                </span>
                This article is more than{' '}
                <span className="embolden">{ageWarning} old</span>
            </div>
        </div>
    );
};

interface Trail {
    url: string;
    linkText: string;
    isLiveBlog: boolean;
    ageWarning: string;
    pillar: Pillar;
}

interface Tab {
    heading: string;
    trails: Trail[];
}

interface Props {
    sectionName?: string;
    config: ConfigType;
}

export class MostViewed extends Component<Props, { selectedTabIndex: number }> {
    constructor(props: Props) {
        super(props);
        this.state = {
            selectedTabIndex: 0,
        };
    }

    public tabSelected(index: number) {
        this.setState({
            selectedTabIndex: index,
        });
    }

    public render() {
        const { config } = this.props;
        return (
            <div className={`content-footer ${cx(adSlotUnspecifiedWidth)}`}>
                <OutbrainContainer config={config} />
                <Container
                    borders={true}
                    showTopBorder={true}
                    className={cx(articleContainerStyles)}
                >
                    <div
                        className={cx(container, mostPopularAdStyle)}
                        data-link-name={'most-viewed'}
                        data-component={'most-viewed'}
                    >
                        <h2 className={heading}>Most popular</h2>
                        <div className={mostPopularBody}>
                            <AsyncClientComponent f={this.fetchTrails}>
                                {({ data }) => (
                                    <div className={listContainer}>
                                        {Array.isArray(data) &&
                                            data.length > 1 && (
                                                <ul
                                                    className={tabsContainer}
                                                    role="tablist"
                                                >
                                                    {(data || []).map(
                                                        (tab, i) => (
                                                            <li
                                                                className={cx(
                                                                    listTab,
                                                                    {
                                                                        [selectedListTab]:
                                                                            i ===
                                                                            this
                                                                                .state
                                                                                .selectedTabIndex,
                                                                    },
                                                                )}
                                                                role="tab"
                                                                aria-selected={
                                                                    i ===
                                                                    this.state
                                                                        .selectedTabIndex
                                                                }
                                                                aria-controls={`tabs-popular-${i}`}
                                                                id={`tabs-popular-${i}-tab`}
                                                                key={`tabs-popular-${i}-tab`}
                                                            >
                                                                <button
                                                                    className={
                                                                        tabButton
                                                                    }
                                                                    onClick={() =>
                                                                        this.tabSelected(
                                                                            i,
                                                                        )
                                                                    }
                                                                >
                                                                    <span
                                                                        className={css`
                                                                            ${screenReaderOnly};
                                                                        `}
                                                                    >
                                                                        Most
                                                                        viewed{' '}
                                                                    </span>
                                                                    <span // tslint:disable-line:react-no-dangerous-html
                                                                        // "Across The Guardian" has a non-breaking space entity between "The" and "Guardian"
                                                                        dangerouslySetInnerHTML={{
                                                                            __html:
                                                                                tab.heading,
                                                                        }}
                                                                    />
                                                                </button>
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            )}
                                        {(data || []).map((tab, i) => (
                                            <ol
                                                className={cx(list, {
                                                    [hideList]:
                                                        i !==
                                                        this.state
                                                            .selectedTabIndex,
                                                })}
                                                id={`tabs-popular-${i}`}
                                                key={`tabs-popular-${i}`}
                                                role="tabpanel"
                                                aria-labelledby={`tabs-popular-${i}-tab`}
                                                data-link-name={tab.heading}
                                                data-link-context={`most-read/${this.props.sectionName}`}
                                            >
                                                {(tab.trails || []).map(
                                                    (trail, ii) => (
                                                        <li
                                                            className={listItem}
                                                            key={trail.url}
                                                            data-link-name={`${ii +
                                                                1} | text`}
                                                        >
                                                            <span
                                                                className={
                                                                    bigNumber
                                                                }
                                                            >
                                                                <BigNumber
                                                                    index={
                                                                        ii + 1
                                                                    }
                                                                />
                                                            </span>
                                                            <h2
                                                                className={
                                                                    headlineHeader
                                                                }
                                                            >
                                                                <a
                                                                    className={
                                                                        headlineLink
                                                                    }
                                                                    href={
                                                                        trail.url
                                                                    }
                                                                    data-link-name={
                                                                        'article'
                                                                    }
                                                                >
                                                                    {trail.isLiveBlog && (
                                                                        <span
                                                                            className={liveKicker(
                                                                                getColour(
                                                                                    trail.pillar,
                                                                                ),
                                                                            )}
                                                                        >
                                                                            Live
                                                                        </span>
                                                                    )}
                                                                    {trail.pillar ===
                                                                        'opinion' && (
                                                                        <QuoteIcon
                                                                            colour={getColour(
                                                                                trail.pillar,
                                                                            )}
                                                                        />
                                                                    )}
                                                                    {
                                                                        trail.linkText
                                                                    }
                                                                    <AgeWarning
                                                                        ageWarning={
                                                                            trail.ageWarning
                                                                        }
                                                                    />
                                                                </a>
                                                            </h2>
                                                        </li>
                                                    ),
                                                )}
                                            </ol>
                                        ))}
                                    </div>
                                )}
                            </AsyncClientComponent>
                            <AdSlot
                                asps={namedAdSlotParameters('most-popular')}
                                config={this.props.config}
                                className={''}
                            />
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    public fetchTrails: () => Promise<Tab[]> = () => {
        const sectionsWithoutPopular = ['info', 'global'];
        const hasSection =
            this.props.sectionName &&
            !sectionsWithoutPopular.includes(this.props.sectionName);
        const endpoint = `/most-read${
            hasSection ? `/${this.props.sectionName}` : ''
        }.json`;
        return new Promise((resolve, reject) => {
            fetch(`https://api.nextgen.guardianapps.co.uk${endpoint}?dcr=true`)
                .then(response => {
                    if (!response.ok) {
                        resolve([]);
                    }
                    return response.json();
                })
                .then(mostRead => {
                    if (Array.isArray(mostRead)) {
                        resolve(mostRead);
                    }
                    resolve([]);
                })
                .catch(err => {
                    window.guardian.modules.raven.reportError(
                        err,
                        {
                            feature: 'most-viewed',
                        },
                        true,
                    );

                    return resolve([]);
                });
        });
    };
}
