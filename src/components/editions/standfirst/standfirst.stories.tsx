// ----- Imports ----- //

import { Display, Pillar, toOption} from '@guardian/types';
import type { Option } from '@guardian/types';
import { withKnobs } from '@storybook/addon-knobs';
import { parse } from 'client/parser';
import { article, analysis, comment, media } from 'fixtures/item';
import { pipe2 } from 'lib';
import type { ReactElement } from 'react';
import { selectPillar } from 'storybookHelpers';
import Standfirst from '.';

// ----- Setup ----- //

const parser = new DOMParser();
const parseStandfirst = parse(parser);

const standfirst: Option<DocumentFragment> = pipe2(
	'<p>The Mexican capital was founded by Aztecs on an island in a vast lake. No wonder water flows through so many of its unbuilt projects</p>',
	parseStandfirst,
	toOption,
);

// ----- Stories ----- //

const Default = (): ReactElement => (
	<Standfirst
		item={{
			...article,
			standfirst,
			theme: selectPillar(Pillar.News),
		}}
	/>
);

const Showcase = (): ReactElement => (
	<Standfirst
		item={{
			...article,
			standfirst,
			display: Display.Showcase,
			theme: selectPillar(Pillar.News),
		}}
	/>
);

const Comment = (): ReactElement => (
	<Standfirst
		item={{
			...comment,
			standfirst,
			theme: selectPillar(Pillar.News),
		}}
	/>
);

const Analysis = (): ReactElement => (
	<Standfirst
		item={{
			...analysis,
			standfirst,
			theme: selectPillar(Pillar.News),
		}}
	/>
);


const Media = (): ReactElement => (
	<Standfirst
		item={{
			...media,
			standfirst,
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

export { Default, Showcase, Comment, Analysis, Media};
