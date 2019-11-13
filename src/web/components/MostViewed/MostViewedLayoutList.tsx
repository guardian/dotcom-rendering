import React from 'react';
import { GuardianLines } from '@root/src/web/components/GuardianLines';
import { css } from 'emotion';
import { textSans } from '@guardian/src-foundations/typography';
import { MostViewedListItem } from './MostViewedListItem';

const wrapperStyles = css`
    margin-top: 24px;
`;

const headingStyles = css`
    ${textSans.medium({ fontWeight: 'bold' })}
    margin-bottom: 8px;
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
    data: TabType;
    config: ConfigType;
    sectionName?: string;
    pillar: Pillar;
}

export const MostViewedLayoutList = ({
    data,
    config,
    sectionName,
    pillar,
}: Props) => (
    <div className={wrapperStyles}>
        <GuardianLines count={4} />
        <h3 className={headingStyles}>Most viewed</h3>
        <div>
            {(data.trails || [])
                .slice(0, 5)
                .map((trail: TrailType, ii: number) => (
                    <MostViewedListItem
                        key={trail.url}
                        trail={trail}
                        position={ii + 1}
                    />
                ))}
        </div>
    </div>
);
