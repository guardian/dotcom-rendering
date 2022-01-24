/* eslint-disable react/jsx-props-no-spreading */

import { ElementContainer } from '@frontend/web/components/ElementContainer';

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
	<ElementContainer>
		<OnwardsLayout {...linkAndDescription} />
	</ElementContainer>
);
linkAndDescriptionStory.story = { name: 'With link and description' };

export const withLongDescriptionStory = () => (
	<ElementContainer>
		<OnwardsLayout {...withLongDescription} />
	</ElementContainer>
);
withLongDescriptionStory.story = { name: 'With long description' };

export const withLinkStory = () => (
	<ElementContainer>
		<OnwardsLayout {...withLink} />
	</ElementContainer>
);
withLinkStory.story = { name: 'With link' };

export const oneTrailStory = () => (
	<ElementContainer>
		<OnwardsLayout {...oneTrail} />
	</ElementContainer>
);
oneTrailStory.story = { name: 'With one trail' };

export const twoTrailStory = () => (
	<ElementContainer>
		<OnwardsLayout {...twoTrails} />
	</ElementContainer>
);
twoTrailStory.story = { name: 'With two trails' };

export const threeTrailStory = () => (
	<ElementContainer>
		<OnwardsLayout {...threeTrails} />
	</ElementContainer>
);
threeTrailStory.story = { name: 'With three trails' };

export const fourTrailStory = () => (
	<ElementContainer>
		<OnwardsLayout {...fourTrails} />
	</ElementContainer>
);
fourTrailStory.story = { name: 'With four trails' };

export const exactlyFiveStory = () => (
	<ElementContainer>
		<OnwardsLayout {...fiveTrails} />
	</ElementContainer>
);
exactlyFiveStory.story = { name: 'with five trails' };

export const sixTrailStory = () => (
	<ElementContainer>
		<OnwardsLayout {...sixTrails} />
	</ElementContainer>
);
sixTrailStory.story = { name: 'With six trails' };

export const sevenTrailStory = () => (
	<ElementContainer>
		<OnwardsLayout {...sevenTrails} />
	</ElementContainer>
);
sevenTrailStory.story = { name: 'With seven trails' };

export const eightTrailStory = () => (
	<ElementContainer>
		<OnwardsLayout {...eightTrails} />
	</ElementContainer>
);
eightTrailStory.story = { name: 'With eight trails' };

export const labsTrailStory = () => (
	<ElementContainer>
		<OnwardsLayout {...labsTrails} />
	</ElementContainer>
);
labsTrailStory.story = { name: 'With labs trails' };
