/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { Section } from '@frontend/web/components/Section';

import {
	linkAndDescription,
	withLongDescription,
	withLink,
	oneTrail,
	twoTrails,
	threeTrails,
	fourTrails,
	fiveTrails,
	sixTrails,
	sevenTrails,
	eightTrails,
	labsTrails,
} from './Onwards.mocks';
import { OnwardsLayout } from './OnwardsLayout';

export default {
	component: OnwardsLayout,
	title: 'Components/Onwards',
};

export const linkAndDescriptionStory = () => (
	<Section>
		<OnwardsLayout {...linkAndDescription} />
	</Section>
);
linkAndDescriptionStory.story = { name: 'With link and description' };

export const withLongDescriptionStory = () => (
	<Section>
		<OnwardsLayout {...withLongDescription} />
	</Section>
);
withLongDescriptionStory.story = { name: 'With long description' };

export const withLinkStory = () => (
	<Section>
		<OnwardsLayout {...withLink} />
	</Section>
);
withLinkStory.story = { name: 'With link' };

export const oneTrailStory = () => (
	<Section>
		<OnwardsLayout {...oneTrail} />
	</Section>
);
oneTrailStory.story = { name: 'With one trail' };

export const twoTrailStory = () => (
	<Section>
		<OnwardsLayout {...twoTrails} />
	</Section>
);
twoTrailStory.story = { name: 'With two trails' };

export const threeTrailStory = () => (
	<Section>
		<OnwardsLayout {...threeTrails} />
	</Section>
);
threeTrailStory.story = { name: 'With three trails' };

export const fourTrailStory = () => (
	<Section>
		<OnwardsLayout {...fourTrails} />
	</Section>
);
fourTrailStory.story = { name: 'With four trails' };

export const exactlyFiveStory = () => (
	<Section>
		<OnwardsLayout {...fiveTrails} />
	</Section>
);
exactlyFiveStory.story = { name: 'with five trails' };

export const sixTrailStory = () => (
	<Section>
		<OnwardsLayout {...sixTrails} />
	</Section>
);
sixTrailStory.story = { name: 'With six trails' };

export const sevenTrailStory = () => (
	<Section>
		<OnwardsLayout {...sevenTrails} />
	</Section>
);
sevenTrailStory.story = { name: 'With seven trails' };

export const eightTrailStory = () => (
	<Section>
		<OnwardsLayout {...eightTrails} />
	</Section>
);
eightTrailStory.story = { name: 'With eight trails' };

export const labsTrailStory = () => (
	<Section>
		<OnwardsLayout {...labsTrails} />
	</Section>
);
labsTrailStory.story = { name: 'With labs trails' };
