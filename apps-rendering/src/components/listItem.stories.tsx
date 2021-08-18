// ----- Imports ----- //

import { Design, Display, Pillar } from '@guardian/types';
import type { FC } from 'react';
import { selectDesign, selectPillar } from 'storybookHelpers';
import ListItem from './listItem';

// ----- Stories ----- //

const Default: FC = () => (
	<ListItem
		format={{
			design: selectDesign(Design.Article),
			display: Display.Standard,
			theme: selectPillar(Pillar.News),
		}}
	>
		A bullet point
	</ListItem>
);

// ----- Exports ----- //

export default {
	component: ListItem,
	title: 'ListItem',
};

export { Default };
