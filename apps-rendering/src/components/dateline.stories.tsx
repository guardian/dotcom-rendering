// ----- Imports ----- //

import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { some } from '@guardian/types';
import { date, withKnobs } from '@storybook/addon-knobs';
import type { FC } from 'react';
import { selectPillar } from 'storybookHelpers';
import Dateline from './dateline';

// ----- Stories ----- //

const Default: FC = () => (
	<Dateline
		format={{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: selectPillar(ArticlePillar.Opinion),
		}}
		date={some(
			new Date(date('Publish Date', new Date('2019-12-17T03:24:00'))),
		)}
	/>
);

const LiveBlogDateline: FC = () => (
	<Dateline
		format={{
			design: ArticleDesign.LiveBlog,
			display: ArticleDisplay.Standard,
			theme: selectPillar(ArticlePillar.News),
		}}
		date={some(
			new Date(date('Publish Date', new Date('2019-12-17T03:24:00'))),
		)}
	/>
);

const DeadBlogDateline: FC = () => (
	<Dateline
		format={{
			design: ArticleDesign.DeadBlog,
			display: ArticleDisplay.Standard,
			theme: selectPillar(ArticlePillar.Culture),
		}}
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

export { Default, LiveBlogDateline, DeadBlogDateline };
