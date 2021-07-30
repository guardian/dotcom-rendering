import {
	brandBackground,
	brandBorder,
} from '@guardian/src-foundations/palette';

import { ElementContainer } from '@frontend/web/components/ElementContainer';

import { Design, Display, Pillar } from '@guardian/types';
import { nav } from './Nav.mock';
import { Nav } from './Nav';

export default {
	component: Nav,
	title: 'Components/Nav',
};

export const StandardStory = () => {
	return (
		<ElementContainer
			showSideBorders={true}
			borderColour={brandBorder.primary}
			showTopBorder={false}
			padded={false}
			backgroundColour={brandBackground.primary}
		>
			<Nav
				format={{
					theme: Pillar.News,
					display: Display.Standard,
					design: Design.Article,
				}}
				nav={nav}
				subscribeUrl=""
				edition="UK"
			/>
		</ElementContainer>
	);
};
StandardStory.story = { name: 'News Highlighted' };

export const OpinionStory = () => {
	return (
		<ElementContainer
			showSideBorders={true}
			borderColour={brandBorder.primary}
			showTopBorder={false}
			padded={false}
			backgroundColour={brandBackground.primary}
		>
			<Nav
				format={{
					theme: Pillar.Opinion,
					display: Display.Standard,
					design: Design.Article,
				}}
				nav={nav}
				subscribeUrl=""
				edition="UK"
			/>
		</ElementContainer>
	);
};
OpinionStory.story = { name: 'Opinion Highlighted' };

export const ImmersiveStory = () => {
	return (
		<ElementContainer
			showSideBorders={false}
			borderColour={brandBorder.primary}
			showTopBorder={false}
			padded={false}
			backgroundColour={brandBackground.primary}
		>
			<Nav
				format={{
					theme: Pillar.News,
					display: Display.Immersive,
					design: Design.Article,
				}}
				nav={nav}
				subscribeUrl=""
				edition="UK"
			/>
		</ElementContainer>
	);
};
ImmersiveStory.story = { name: 'Immersive' };
