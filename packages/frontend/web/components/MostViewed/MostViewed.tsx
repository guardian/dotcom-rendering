import React from 'react';
import { css, cx } from 'emotion';
import { headline, palette } from '@guardian/src-foundations';
import { from, between, Breakpoint } from '@guardian/src-utilities';
import { namedAdSlotParameters } from '@frontend/model/advertisement';
import { AdSlot, labelStyles } from '@frontend/web/components/AdSlot';
import { useApi } from '@frontend/web/components/lib/api';

import { MostViewedGrid } from './MostViewedGrid';

const stackBelow = (breakpoint: Breakpoint) => css`
    display: flex;
    flex-direction: column;

    ${from[breakpoint]} {
        flex-direction: row;
    }
`;

const asideWidth = css`
    ${between.leftCol.and.wide} {
        /* above 1140, below 1300 */
        flex-basis: 151px;
        flex-grow: 0;
        flex-shrink: 0;
    }

    ${from.wide} {
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

    ${from.leftCol} {
        ${headline({ level: 3 })};
        font-weight: 900;
    }

    ${from.wide} {
        font-weight: 900;
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
    .ad-slot--mostpop {
        width: 300px;
        margin: 12px auto;
        min-width: 300px;
        min-height: 274px;
        text-align: center;
        ${from.desktop} {
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
        window.guardian.modules.raven.reportError(
            error,
            {
                feature: 'most-viewed',
            },
            true,
        );
    }

    if (data) {
        return (
            <div className={`content-footer ${cx(adSlotUnspecifiedWidth)}`}>
                <div
                    className={cx(stackBelow('leftCol'), mostPopularAdStyle)}
                    data-link-name={'most-viewed'}
                    data-component={'most-viewed'}
                >
                    <section className={asideWidth}>
                        <h2 className={headingStyles}>Most popular</h2>
                    </section>
                    <section className={stackBelow('desktop')}>
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
                                asps={namedAdSlotParameters('mostpop')}
                                config={config}
                                className={''}
                            />
                        </div>
                    </section>
                </div>
            </div>
        );
    }

    return null;
};
