// ----- Imports ----- //

import { Pillar, some } from '@guardian/types';
import { date, withKnobs } from '@storybook/addon-knobs';
import type { FC } from 'react';
import { selectPillar } from 'storybookHelpers';
import Dateline from './dateline';

// ----- Stories ----- //

const Default: FC = () => (
	<Dateline
		theme={selectPillar(Pillar.Opinion)}
		date={some(
			new Date(date('Publish Date', new Date('2019-12-17T03:24:00'))),
		)}
	/>
);

// ----- Exports ----- //

export default {
	component: Dateline,
	title: 'AR/Dateline',
	decorators: [withKnobs],
};

export { Default };
