import React from 'react';

import { useApi } from '@root/src/web/components/lib/api';

import { OnwardsLayout } from './OnwardsLayout';

type Props = {
    ajaxUrl: string;
    pageId: string;
    pathId: OnwardsType;
    component: React.ElementType;
};

export const Onwards = ({ ajaxUrl, pageId, pathId, component }: Props) => {
    const url = `${new URL(`${pathId}/${pageId}`, ajaxUrl)}.json`;
    const { data, error } = useApi<any>(url);

    if (error) {
        window.guardian.modules.sentry.reportError(error, 'story-package');
        return null;
    }

    console.log(JSON.stringify(data));

    if (data) {
        return <OnwardsLayout content={data} component={component} />;
    }

    return null;
};
