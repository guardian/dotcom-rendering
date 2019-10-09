import React from 'react';
import { css, cx } from 'emotion';
import { headline, palette } from '@guardian/src-foundations';
import {
    desktop,
    leftCol,
    wide,
    mobileLandscape,
} from '@guardian/pasteup/breakpoints';
import { Container } from '@guardian/guui';
import { namedAdSlotParameters } from '@frontend/model/advertisement';
import { AdSlot, labelStyles } from '@frontend/web/components/AdSlot';
import { OutbrainContainer } from '@frontend/web/components/Outbrain';
import { useApi } from '@frontend/web/components/lib/api';

import { MostViewedGrid } from './MostViewedGrid';

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
    sectionName: string;
    config: ConfigType;
}

function buildSectionUrl(sectionName?: string) {
    const sectionsWithoutPopular = ['info', 'global'];
    const hasSection =
        sectionName && !sectionsWithoutPopular.includes(sectionName);
    const endpoint = `/most-read${hasSection ? `/${sectionName}` : ''}.json`;

    return `https://api.nextgen.guardianapps.co.uk${endpoint}?dcr=true`;
}

export const MostViewed = ({ config, sectionName }: Props) => {
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
                <OutbrainContainer config={config} />
                <Container
                    borders={true}
                    className={cx(articleContainerStyles)}
                >
                    <div
                        className={cx(container, mostPopularAdStyle)}
                        data-link-name={'most-viewed'}
                        data-component={'most-viewed'}
                    >
                        <h2 className={heading}>Most popular</h2>
                        <div className={mostPopularBody}>
                            <MostViewedGrid
                                data={data}
                                sectionName={sectionName}
                            />
                            <AdSlot
                                asps={namedAdSlotParameters('most-popular')}
                                config={config}
                                className={''}
                            />
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return null;
};
