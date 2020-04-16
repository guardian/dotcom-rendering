import React from 'react';
import { css } from 'emotion';

import { useApi } from '@root/src/web/lib/api';
import { Lines } from '@guardian/src-ed-lines';
import { headline } from '@guardian/src-foundations/typography';
import { linesCssOverwrite } from '@root/src/web/lib/linesCssOverwrite';

import { MostViewedRightItem } from './MostViewedRightItem';

const wrapperStyles = css`
    margin-top: 24px;
    margin-bottom: 24px;
`;

const headingStyles = css`
    ${headline.xxxsmall({ fontWeight: 'bold' })}
    margin-bottom: 8px;
`;

interface Props {
    pillar: Pillar;
    limitItems?: number;
}

export const MostViewedRight = ({ pillar, limitItems = 5 }: Props) => {
    const endpointUrl: string =
        'https://api.nextgen.guardianapps.co.uk/most-read-geo.json?dcr=true';
    const { data, error } = useApi<any>(endpointUrl);

    if (error) {
        window.guardian.modules.sentry.reportError(error, 'most-viewed-right');
        return null;
    }

    if (data) {
        // Look I don't know why data-component is geo-most-popular either, but it is, ok? Ok.
        return (
            <div className={wrapperStyles} data-component="geo-most-popular">
                <div className={linesCssOverwrite(pillar)}>
                    <Lines count={4} />
                </div>
                <h3 className={headingStyles}>most viewed</h3>
                <ul data-link-name="Right hand most popular geo GB">
                    {(data.trails || [])
                        .slice(0, limitItems)
                        .map(
                            (trail: TrailType, mostViewedItemIndex: number) => (
                                <MostViewedRightItem
                                    key={trail.url}
                                    trail={trail}
                                    mostViewedItemIndex={mostViewedItemIndex}
                                />
                            ),
                        )}
                </ul>
            </div>
        );
    }

    return null;
};
