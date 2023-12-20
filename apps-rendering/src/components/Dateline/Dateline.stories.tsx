// ----- Imports ----- //

import { Edition } from '@guardian/apps-rendering-api-models/edition';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { some } from '../../../vendor/@guardian/types/index';
import type { FC } from 'react';
import Dateline from './';

// ----- Stories ----- //

const Default: FC = () => (
	<Dateline
		format={{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: ArticlePillar.Opinion,
		}}
		date={some(new Date('2019-12-17T03:24:00'))}
		edition={Edition.UK}
	/>
);

const LiveBlogDateline: FC = () => (
	<Dateline
		format={{
			design: ArticleDesign.LiveBlog,
			display: ArticleDisplay.Standard,
			theme: ArticlePillar.News,
		}}
		date={some(new Date('2019-12-17T03:24:00'))}
		edition={Edition.US}
	/>
);

const DeadBlogDateline: FC = () => (
	<Dateline
		format={{
			design: ArticleDesign.DeadBlog,
			display: ArticleDisplay.Standard,
			theme: ArticlePillar.Culture,
		}}
		date={some(new Date('2019-12-17T03:24:00'))}
		edition={Edition.AU}
	/>
);

// ----- Exports ----- //

export default {
	component: Dateline,
	title: 'AR/Dateline',
};

export { Default, LiveBlogDateline, DeadBlogDateline };
