// ----- Imports ----- //
import { neutral } from '@guardian/src-foundations/palette';
import { Display, Pillar, toOption } from '@guardian/types';
import type { Option } from '@guardian/types';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { parse } from 'client/parser';
import { analysis, article, comment, media } from 'fixtures/item';
import { pipe } from 'lib';
import type { ReactElement } from 'react';
import { selectPillar } from 'storybookHelpers';
import Standfirst from '.';

// ----- Setup ----- //

const parser = new DOMParser();
const parseStandfirst = parse(parser);

const standfirst: Option<DocumentFragment> = pipe(
	'<p>The Mexican capital was founded by Aztecs on an island in a vast lake. No wonder water flows through so many of its unbuilt projects</p>',
	parseStandfirst,
	toOption,
);

const hasShareIcon = (): { webUrl: string } => {
	return {
		webUrl: boolean('ShareIcon', true) ? 'www.guardian.com' : '',
	};
};

// ----- Stories ----- //

const Default = (): ReactElement => (
	<Standfirst
		shareIcon
		item={{
			...article,
			standfirst,
			...hasShareIcon(),
			theme: selectPillar(Pillar.News),
		}}
	/>
);

const Showcase = (): ReactElement => (
	<Standfirst
		shareIcon
		item={{
			...article,
			standfirst,
			...hasShareIcon(),
			display: Display.Showcase,
			theme: selectPillar(Pillar.News),
		}}
	/>
);

const Comment = (): ReactElement => (
	<Standfirst
		shareIcon
		item={{
			...comment,
			standfirst,
			...hasShareIcon(),
			theme: selectPillar(Pillar.News),
		}}
	/>
);

const Analysis = (): ReactElement => (
	<Standfirst
		shareIcon
		item={{
			...analysis,
			standfirst,
			...hasShareIcon(),
			theme: selectPillar(Pillar.News),
		}}
	/>
);

const Media = (): ReactElement => (
	<div
		style={{
			backgroundColor: `${neutral[7]}`,
		}}
	>
		<Standfirst
			shareIcon
			item={{
				...media,
				standfirst,
				...hasShareIcon(),
				theme: selectPillar(Pillar.News),
			}}
		/>
	</div>
);

// ----- Exports ----- //

export default {
	component: Standfirst,
	title: 'Editions/Standfirst',
	decorators: [withKnobs],
};

export { Default, Showcase, Comment, Analysis, Media };
