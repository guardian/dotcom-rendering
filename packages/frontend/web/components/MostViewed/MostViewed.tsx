import React from 'react';
import { css, cx } from 'emotion';
import {
    desktop,
    leftCol,
    wide,
    mobileLandscape,
    from,
    headline,
    palette,
} from '@guardian/src-foundations';
import { Container } from '@guardian/guui';
import { namedAdSlotParameters } from '@frontend/model/advertisement';
import { AdSlot, labelStyles } from '@frontend/web/components/AdSlot';
import { OutbrainContainer } from '@frontend/web/components/Outbrain';
import { reportError } from '@frontend/web/browser/sentry/sentry';
import { useApi } from '@frontend/web/components/lib/api';

import { MostViewedGrid } from './MostViewedGrid';

const stackBelow = (breakpoint: string) => css`
    display: flex;
    flex-direction: column;

    ${breakpoint} {
        flex-direction: row;
    }
`;

const asideWidth = css`
    ${from.leftCol.until.wide} {
        /* above 1140, below 1300 */
        flex-basis: 151px;
        flex-grow: 0;
        flex-shrink: 0;
    }

    ${wide} {
        /* above 1300 */
        flex-basis: 230px;
        flex-grow: 0;
        flex-shrink: 0;
    }
`;

const headingStyles = css`
    ${headline({ level: 3 })};
    color: ${palette.neutral[7]};
    font-weight: 900;
    padding-right: 5px;
    padding-bottom: 14px;
    padding-top: 3px;

    ${leftCol} {
        ${headline({ level: 3 })};
        font-weight: 900;
    }

    ${wide} {
        font-weight: 900;
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

export interface TrailType {
    url: string;
    linkText: string;
    isLiveBlog: boolean;
    ageWarning: string;
    pillar: Pillar;
}

export interface TabType {
    heading: string;
    trails: TrailType[];
}

interface Props {
    sectionName?: string;
    config: ConfigType;
    pillar: Pillar;
}

function buildSectionUrl(sectionName?: string) {
    const sectionsWithoutPopular = ['info', 'global'];
    const hasSection =
        sectionName && !sectionsWithoutPopular.includes(sectionName);
    const endpoint = `/most-read${hasSection ? `/${sectionName}` : ''}.json`;

    return `https://api.nextgen.guardianapps.co.uk${endpoint}?dcr=true`;
}

export const MostViewed = ({ config, sectionName, pillar }: Props) => {
    const url = buildSectionUrl(sectionName);
    const { data, error } = useApi<TabType[]>(url);

    if (error) {
        reportError(error, 'most-viewed');
    }

    if (data) {
        return (
            <div className={`content-footer ${cx(adSlotUnspecifiedWidth)}`}>
                <OutbrainContainer config={config} />
                <Container
                    borders={true}
                    showTopBorder={true}
                    className={cx(articleContainerStyles)}
                >
                    <div
                        className={cx(stackBelow(leftCol), mostPopularAdStyle)}
                        data-link-name={'most-viewed'}
                        data-component={'most-viewed'}
                    >
                        <section className={asideWidth}>
                            <h2 className={headingStyles}>Most popular</h2>
                        </section>
                        <section className={stackBelow(desktop)}>
                            <MostViewedGrid
                                data={data}
                                sectionName={sectionName}
                                pillar={pillar}
                            />
                            <div
                                className={css`
                                    margin: 0.375rem 0 0 0.625rem;
                                `}
                            >
                                <AdSlot
                                    asps={namedAdSlotParameters('most-popular')}
                                    config={config}
                                    className={''}
                                />
                            </div>
                        </section>
                    </div>
                </Container>
            </div>
        );
    }

    return null;
};
