// ----- Imports ----- //

import { Design, Display, Pillar, Special } from '@guardian/types';
import type { FC } from 'react';
import Paragraph from './paragraph';

// ----- Stories ----- //

const standard = {
	design: Design.Article,
	display: Display.Standard,
	theme: Pillar.News,
};

const labs = {
	design: Design.Article,
	display: Display.Standard,
	theme: Special.Labs,
};

const Default: FC = () => (
	<Paragraph format={standard}>
		Ever since Mexico City was founded on an island in the lake of Texcoco
		its inhabitants have dreamed of water: containing it, draining it and
		now retaining it.
	</Paragraph>
);

const Labs: FC = () => (
	<Paragraph format={labs}>
		Ever since Mexico City was founded on an island in the lake of Texcoco
		its inhabitants have dreamed of water: containing it, draining it and
		now retaining it.
	</Paragraph>
);

// ----- Exports ----- //

export default {
	component: Paragraph,
	title: 'AR/Paragraph',
};

export { Default, Labs };
