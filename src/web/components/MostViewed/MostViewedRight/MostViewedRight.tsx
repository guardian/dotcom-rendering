import React from 'react';
import { useApi } from '@root/src/web/components/lib/api';
import { GuardianLines } from '@root/src/web/components/GuardianLines';
import { css } from 'emotion';
import { textSans } from '@guardian/src-foundations/typography';
import { MostViewedRightItem } from './MostViewedRightItem';

const wrapperStyles = css`
    margin-top: 24px;
`;

const headingStyles = css`
    ${textSans.medium({ fontWeight: 'bold' })}
    margin-bottom: 8px;
`;

interface Props {
    limitItems?: number;
}

export const MostViewedRight = ({ limitItems = 5 }: Props) => {
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
                <h3 className={headingStyles}>most viewed</h3>
                <div>
                    {(data.trails || [])
                        .slice(0, limitItems)
                        .map((trail: TrailType, ii: number) => (
                            <MostViewedRightItem
                                key={trail.url}
                                trail={trail}
                            />
                        ))}
                </div>
            </div>
        );
    }

    return null;
};
