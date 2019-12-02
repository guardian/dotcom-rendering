import React from 'react';

import { useApi } from '@root/src/web/components/lib/api';

import { Flex } from '@frontend/web/components/Flex';
import { LeftColumn } from '@frontend/web/components/LeftColumn';

import { OnwardsTitle } from './OnwardsTitle';
import { OnwardsContainer } from './OnwardsContainer';

type Props = {
    ajaxUrl: string;
    pageId: string;
    pathId: OnwardsType;
    component: React.ElementType;
};

export const Onwards = ({
    ajaxUrl,
    pageId,
    pathId,
    component: Content,
}: Props) => {
    const url = `${new URL(`${pathId}/${pageId}`, ajaxUrl)}.json`;
    const { data, error } = useApi<any>(url);

    if (error) {
        window.guardian.modules.sentry.reportError(error, 'story-package');
        return null;
    }

    if (data) {
        return (
            <Flex>
                <LeftColumn
                    showRightBorder={false}
                    showPartialRightBorder={true}
                >
                    <OnwardsTitle title={data.heading} />
                </LeftColumn>
                <OnwardsContainer>
                    <Content content={data.trails} />
                </OnwardsContainer>
            </Flex>
        );
    }

    return null;
};
