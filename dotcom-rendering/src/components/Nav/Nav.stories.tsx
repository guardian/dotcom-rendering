import { Pillar } from '@guardian/libs';
import { brandBackground, brandBorder } from '@guardian/source/foundations';
import { userEvent, within } from '@storybook/test';
import { Section } from '../Section';
import { Nav } from './Nav';
import { nav } from './Nav.mock';

export default {
	component: Nav,
	title: 'Components/Nav',
};

export const StandardStory = () => {
	return (
		<Section
			fullWidth={true}
			borderColour={brandBorder.primary}
			showTopBorder={false}
			padSides={false}
			backgroundColour={brandBackground.primary}
		>
			<Nav
				selectedPillar={Pillar.News}
				nav={nav}
				subscribeUrl=""
				editionId={'UK'}
			/>
		</Section>
	);
};
StandardStory.storyName = 'News Highlighted';

export const StandardStoryTopBarHeader = () => {
	return (
		<Section
			fullWidth={true}
			borderColour={brandBorder.primary}
			showTopBorder={false}
			padSides={false}
			backgroundColour={brandBackground.primary}
		>
			<Nav
				selectedPillar={Pillar.News}
				nav={nav}
				subscribeUrl=""
				editionId={'UK'}
			/>
		</Section>
	);
};
StandardStoryTopBarHeader.storyName = 'News Highlighted';

export const OpinionStory = () => {
	return (
		<Section
			fullWidth={true}
			borderColour={brandBorder.primary}
			showTopBorder={false}
			padSides={false}
			backgroundColour={brandBackground.primary}
		>
			<Nav
				selectedPillar={Pillar.Opinion}
				nav={nav}
				subscribeUrl=""
				editionId={'UK'}
			/>
		</Section>
	);
};
OpinionStory.storyName = 'Opinion Highlighted';

export const ImmersiveStory = () => {
	return (
		<Section
			fullWidth={true}
			showSideBorders={false}
			borderColour={brandBorder.primary}
			showTopBorder={false}
			padSides={false}
			backgroundColour={brandBackground.primary}
		>
			<Nav
				selectedPillar={Pillar.News}
				displayRoundel={true}
				isImmersive={true}
				nav={nav}
				subscribeUrl=""
				editionId={'UK'}
			/>
		</Section>
	);
};
ImmersiveStory.storyName = 'Immersive';

export const ExpandedMenuStory = () => {
	return (
		<Section
			fullWidth={true}
			showSideBorders={true}
			borderColour={brandBorder.primary}
			showTopBorder={false}
			padSides={false}
			backgroundColour={brandBackground.primary}
		>
			<Nav
				selectedPillar={Pillar.News}
				displayRoundel={false}
				isImmersive={false}
				nav={nav}
				subscribeUrl=""
				editionId={'UK'}
			/>
		</Section>
	);
};

/**
 * Clicks the “More" button so that Chromatic can capture the component in its `expanded` state.
 */
ExpandedMenuStory.play = async ({
	canvasElement,
}: {
	canvasElement: HTMLElement;
}) => {
	const canvas = within(canvasElement);
	await userEvent.click(canvas.getByLabelText(/More/));
};
ExpandedMenuStory.storyName = 'ExpandedMenu';

export const ExpandedMenuWithPageSkinStory = () => {
	return (
		<Section
			fullWidth={true}
			showSideBorders={true}
			borderColour={brandBorder.primary}
			showTopBorder={false}
			padSides={false}
			backgroundColour={brandBackground.primary}
			hasPageSkin={true}
			hasPageSkinContentSelfConstrain={true}
		>
			<Nav
				selectedPillar={Pillar.News}
				displayRoundel={false}
				isImmersive={false}
				nav={nav}
				subscribeUrl=""
				editionId={'UK'}
				hasPageSkin={true}
			/>
		</Section>
	);
};

ExpandedMenuWithPageSkinStory.play = async ({
	canvasElement,
}: {
	canvasElement: HTMLElement;
}) => {
	const canvas = within(canvasElement);
	await userEvent.click(canvas.getByLabelText(/More/));
};
ExpandedMenuWithPageSkinStory.storyName = 'ExpandedMenu With PageSkin';
