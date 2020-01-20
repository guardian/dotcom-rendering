import React from 'react';

import { Section } from '@frontend/web/components/Section';

import { OnwardsLayout } from './OnwardsLayout';

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
            <OnwardsLayout onwardSections={[storyPackageTrails]} />
        </Section>
    );
};
storyPackage.story = { name: 'Story Package' };

export const twoSections = () => {
    return (
        <Section>
            <OnwardsLayout
                onwardSections={[storyPackageTrails, storyPackageTrails]}
            />
        </Section>
    );
};
twoSections.story = { name: 'with two sections' };
