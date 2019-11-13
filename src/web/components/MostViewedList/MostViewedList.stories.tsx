import React from 'react';
import fetchMock from 'fetch-mock';

import { Section } from '@frontend/web/components/Section';

import { MostViewedList } from './MostViewedList';
import { response } from './MostViewedList.mocks';

/* tslint:disable */
export default {
    component: MostViewedList,
    title: 'Components/MostViewedList',
};
/* tslint:enable */

export const defaultStory = () => {
    fetchMock.restore().getOnce('*', {
        status: 200,
        body: response.data,
    });

    return (
        <Section>
            <MostViewedList />;
        </Section>
    );
};
defaultStory.story = { name: 'default' };

export const limitItemsStory = () => {
    fetchMock.restore().getOnce('*', {
        status: 200,
        body: response.data,
    });

    return (
        <Section>
            <MostViewedList limitItems={8} />;
        </Section>
    );
};
defaultStory.story = { name: 'with a limit of 8 items' };
