// ----- Imports ----- //
import { ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { neutral } from '@guardian/source-foundations';
import { withKnobs } from '@storybook/addon-knobs';
import { parse } from 'client/parser';
import { analysis, article, comment, media } from 'fixtures/item';
import type { Optional } from 'optional';
import type { ReactElement } from 'react';
import { selectPillar } from 'storybookHelpers';
import Standfirst from '.';

// ----- Setup ----- //

const parser = new DOMParser();
const parseStandfirst = parse(parser);

const standfirst: Optional<DocumentFragment> = parseStandfirst(
	'<p>The Mexican capital was founded by Aztecs on an island in a vast lake. No wonder water flows through so many of its unbuilt projects</p>',
).toOptional();

// ----- Stories ----- //

const Default = (): ReactElement => (
	<Standfirst
		shareIcon
		item={{
			...article,
			standfirst,
			theme: selectPillar(ArticlePillar.News),
		}}
	/>
);

const Showcase = (): ReactElement => (
	<Standfirst
		shareIcon
		item={{
			...article,
			standfirst,
			display: ArticleDisplay.Showcase,
			theme: selectPillar(ArticlePillar.News),
		}}
	/>
);

const Comment = (): ReactElement => (
	<Standfirst
		shareIcon
		item={{
			...comment,
			standfirst,
			theme: selectPillar(ArticlePillar.News),
		}}
	/>
);

const Analysis = (): ReactElement => (
	<Standfirst
		shareIcon
		item={{
			...analysis,
			standfirst,
			theme: selectPillar(ArticlePillar.News),
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
				theme: selectPillar(ArticlePillar.News),
			}}
		/>
	</div>
);

// ----- Exports ----- //

export default {
	component: Standfirst,
	title: 'AR/Editions/Standfirst',
	decorators: [withKnobs],
};

export { Default, Showcase, Comment, Analysis, Media };
