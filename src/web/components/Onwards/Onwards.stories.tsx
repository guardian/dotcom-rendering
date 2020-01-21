import React from 'react';

import { Section } from '@frontend/web/components/Section';

import { OnwardsLayout } from './OnwardsLayout';

import {
    oneTrail,
    twoTrails,
    threeTrails,
    fourTrails,
    fiveTrails,
    sixTrails,
    sevenTrails,
    eightTrails,
} from './Onwards.mocks';

/* tslint:disable */
export default {
    component: OnwardsLayout,
    title: 'Components/Onwards',
};
/* tslint:enable */

export const oneTrailStory = () => {
    return (
        <Section>
            <OnwardsLayout onwardSections={[oneTrail]} />
        </Section>
    );
};
oneTrailStory.story = { name: 'With one trail' };

export const twoTrailStory = () => {
    return (
        <Section>
            <OnwardsLayout onwardSections={[twoTrails]} />
        </Section>
    );
};
twoTrailStory.story = { name: 'With two trails' };

export const threeTrailStory = () => {
    return (
        <Section>
            <OnwardsLayout onwardSections={[threeTrails]} />
        </Section>
    );
};
threeTrailStory.story = { name: 'With three trails' };

export const fourTrailStory = () => {
    return (
        <Section>
            <OnwardsLayout onwardSections={[fourTrails]} />
        </Section>
    );
};
fourTrailStory.story = { name: 'With four trails' };

export const exactlyFiveStory = () => {
    return (
        <Section>
            <OnwardsLayout onwardSections={[fiveTrails]} />
        </Section>
    );
};
exactlyFiveStory.story = { name: 'with five trails' };

export const sixTrailStory = () => {
    return (
        <Section>
            <OnwardsLayout onwardSections={[sixTrails]} />
        </Section>
    );
};
sixTrailStory.story = { name: 'With six trails' };

export const sevenTrailStory = () => {
    return (
        <Section>
            <OnwardsLayout onwardSections={[sevenTrails]} />
        </Section>
    );
};
sevenTrailStory.story = { name: 'With seven trails' };

export const eightTrailStory = () => {
    return (
        <Section>
            <OnwardsLayout onwardSections={[eightTrails]} />
        </Section>
    );
};
eightTrailStory.story = { name: 'With eight trails' };

export const twoSections = () => {
    return (
        <Section>
            <OnwardsLayout onwardSections={[threeTrails, eightTrails]} />
        </Section>
    );
};
twoSections.story = { name: 'with two sections' };
