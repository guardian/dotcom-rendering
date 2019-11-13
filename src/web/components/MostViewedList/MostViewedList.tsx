import React from 'react';
import { useApi } from '@root/src/web/components/lib/api';
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
    image?: string;
    pillar: Pillar;
}

export interface TabType {
    heading: string;
    trails: TrailType[];
}

interface Props {
    limitItems?: number;
}

export const MostViewedList = ({ limitItems = 5 }: Props) => {
    const endpointUrl: string =
        'https://api.nextgen.guardianapps.co.uk/most-read-geo.json?dcr=true';
    const { data, error } = useApi<any>(endpointUrl);

    if (error) {
        window.guardian.modules.sentry.reportError(error, 'most-viewed');
        return null;
    }

    if (data) {
        return (
            <div className={wrapperStyles}>
                <GuardianLines count={4} />
                <h3 className={headingStyles}>Most viewed</h3>
                <div>
                    {(data.trails || [])
                        .slice(0, limitItems)
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
    }

    return null;
};
