// ----- Imports ----- //

import { Design, Display, Pillar } from '@guardian/types';
import { withKnobs } from '@storybook/addon-knobs';
import type { FC } from 'react';
import { selectPillar } from 'storybookHelpers';
import Bullet from './bullet';

// ----- Stories ----- //

const Default: FC = () => (
	<Bullet
		format={{
			design: Design.Article,
			display: Display.Standard,
			theme: selectPillar(Pillar.News),
		}}
		text="• Lorem ipsum"
	/>
);

// ----- Exports ----- //

export default {
	component: Bullet,
	title: 'AR/Bullet',
	decorators: [withKnobs],
};

export { Default };
