// ----- Imports ----- //

import { Pillar } from '@guardian/types';
import { withKnobs } from '@storybook/addon-knobs';
import { article } from 'fixtures/item';
import type { ReactElement } from 'react';
import { selectPillar } from 'storybookHelpers';
import Standfirst from '.';

// ----- Stories ----- //

const Default = (): ReactElement => (
	<Standfirst
		item={{
			...article,
			theme: selectPillar(Pillar.News),
		}}
	/>
);

// ----- Exports ----- //

export default {
	component: Standfirst,
	title: 'Editions/Standfirst',
	decorators: [withKnobs],
};

export { Default };
