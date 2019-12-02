import React from 'react';

import { useApi } from '@root/src/web/components/lib/api';

import { Flex } from '@frontend/web/components/Flex';
import { ArticleLeft } from '@frontend/web/components/ArticleLeft';

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
    const url = `${ajaxUrl}/${pathId}/${pageId}.json`;
    const { data, error } = useApi<any>(url);

    if (error) {
        window.guardian.modules.sentry.reportError(error, 'story-package');
        return null;
    }

    console.log('data', data);

    if (data) {
        return (
            <Flex>
                <ArticleLeft showRightBorder={false}>
                    <OnwardsTitle title={data.heading} />
                </ArticleLeft>
                <OnwardsContainer>
                    <Content content={data.trails} />
                </OnwardsContainer>
            </Flex>
        );
    }

    return null;
};
