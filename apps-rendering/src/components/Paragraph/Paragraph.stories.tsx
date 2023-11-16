// ----- Imports ----- //

import {
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import type { FC } from 'react';
import Paragraph from './';

// ----- Stories ----- //

const standard = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: ArticlePillar.News,
};

const labs = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: ArticleSpecial.Labs,
};

const Default: FC = () => (
	<Paragraph format={standard} showDropCap={false} isEditions={false}>
		Ever since Mexico City was founded on an island in the lake of Texcoco
		its inhabitants have dreamed of water: containing it, draining it and
		now retaining it.
	</Paragraph>
);

const Dropcap: FC = () => (
	<Paragraph format={standard} showDropCap={true} isEditions={false}>
		Ever since Mexico City was founded on an island in the lake of Texcoco
		its inhabitants have dreamed of water: containing it, draining it and
		now retaining it. Ever since Mexico City was founded on an island in the
		lake of Texcoco its inhabitants have dreamed of water: containing it,
		draining it and now retaining it. Ever since Mexico City was founded on
		an island in the lake of Texcoco its inhabitants have dreamed of water:
		containing it, draining it and now retaining it.
	</Paragraph>
);

const Labs: FC = () => (
	<Paragraph format={labs} showDropCap={false} isEditions={false}>
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

export { Default, Dropcap, Labs };
