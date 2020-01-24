import React from 'react';
import { css } from 'emotion';
import { useApi } from '@root/src/web/components/lib/api';

const wrapperMargins = css`
    margin: 18px 0;
`;

export const SlotBodyEnd = () => {
    const endpointUrl = 'https://contributions.guardianapis.com/epic';

    const trackingParams = {};
    const { data, error } = useApi(endpointUrl, trackingParams);

    if (error) {
        window.guardian.modules.sentry.reportError(error, 'slot-body-end');
        return null;
    }

    if (data && data.html) {
        return (
            <div className={wrapperMargins}>
                {data.css && <style>{data.css}</style>}
                <div
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: data.html }}
                />
            </div>
        );
    }

    return null;
};
