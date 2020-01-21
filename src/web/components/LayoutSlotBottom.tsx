import React from 'react';
import { css } from 'emotion';
import { useApi } from '@root/src/web/components/lib/api';

const wrapperMargins = css`
    margin: 18px 0;
`;

export const LayoutSlotBottom = () => {
    const endpointUrl =
        'https://zsxulafpt1.execute-api.eu-west-1.amazonaws.com/prod';
    const { data, error } = useApi(endpointUrl);

    if (error) {
        window.guardian.modules.sentry.reportError(error, 'layout-slot-bottom');
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
