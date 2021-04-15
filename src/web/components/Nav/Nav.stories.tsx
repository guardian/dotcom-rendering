import React from 'react';
import {
	brandBackground,
	brandBorder,
} from '@guardian/src-foundations/palette';

import { Section } from '@frontend/web/components/Section';

import { Design, Display, Pillar } from '@guardian/types';
import { nav } from './Nav.mock';
import { Nav } from './Nav';

export default {
	component: Nav,
	title: 'Components/Nav',
};

export const StandardStory = () => {
	return (
		<Section
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
		</Section>
	);
};
StandardStory.story = { name: 'News Highlighted' };

export const OpinionStory = () => {
	return (
		<Section
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
		</Section>
	);
};
OpinionStory.story = { name: 'Opinion Highlighted' };

export const ImmersiveStory = () => {
	return (
		<Section
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
		</Section>
	);
};
ImmersiveStory.story = { name: 'Immersive' };
