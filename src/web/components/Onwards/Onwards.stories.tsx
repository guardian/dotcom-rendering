import React from 'react';

import { Section } from '@frontend/web/components/Section';

import { OnwardsLayout } from './OnwardsLayout';
import { StoryPackage } from './StoryPackage';

import { storyPackageTrails } from './Onwards.mocks';

/* tslint:disable */
export default {
    component: OnwardsLayout,
    title: 'Components/Onwards',
};
/* tslint:enable */

export const storyPackage = () => {
    return (
        <Section>
            <OnwardsLayout
                content={storyPackageTrails}
                component={StoryPackage}
            />
            ;
        </Section>
    );
};
storyPackage.story = { name: 'Story Package' };
