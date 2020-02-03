import React from 'react';

import { Section } from '@frontend/web/components/Section';

import {
    withDescription,
    oneTrail,
    twoTrails,
    threeTrails,
    fourTrails,
    fiveTrails,
    sixTrails,
    sevenTrails,
    eightTrails,
} from '@root/fixtures/onwards.mocks';
import { OnwardsLayout } from './OnwardsLayout';

export default {
    component: OnwardsLayout,
    title: 'Components/Onwards',
};

export const withDescriptionStory = () => (
    <Section>
        <OnwardsLayout onwardSections={[withDescription]} />
    </Section>
);
withDescriptionStory.story = { name: 'With description' };

export const oneTrailStory = () => (
    <Section>
        <OnwardsLayout onwardSections={[oneTrail]} />
    </Section>
);
oneTrailStory.story = { name: 'With one trail' };

export const twoTrailStory = () => (
    <Section>
        <OnwardsLayout onwardSections={[twoTrails]} />
    </Section>
);
twoTrailStory.story = { name: 'With two trails' };

export const threeTrailStory = () => (
    <Section>
        <OnwardsLayout onwardSections={[threeTrails]} />
    </Section>
);
threeTrailStory.story = { name: 'With three trails' };

export const fourTrailStory = () => (
    <Section>
        <OnwardsLayout onwardSections={[fourTrails]} />
    </Section>
);
fourTrailStory.story = { name: 'With four trails' };

export const exactlyFiveStory = () => (
    <Section>
        <OnwardsLayout onwardSections={[fiveTrails]} />
    </Section>
);
exactlyFiveStory.story = { name: 'with five trails' };

export const sixTrailStory = () => (
    <Section>
        <OnwardsLayout onwardSections={[sixTrails]} />
    </Section>
);
sixTrailStory.story = { name: 'With six trails' };

export const sevenTrailStory = () => (
    <Section>
        <OnwardsLayout onwardSections={[sevenTrails]} />
    </Section>
);
sevenTrailStory.story = { name: 'With seven trails' };

export const eightTrailStory = () => (
    <Section>
        <OnwardsLayout onwardSections={[eightTrails]} />
    </Section>
);
eightTrailStory.story = { name: 'With eight trails' };

export const twoSections = () => (
    <Section>
        <OnwardsLayout onwardSections={[threeTrails, eightTrails]} />
    </Section>
);
twoSections.story = { name: 'with two sections' };
