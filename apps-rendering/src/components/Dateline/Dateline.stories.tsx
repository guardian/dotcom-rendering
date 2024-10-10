// ----- Imports ----- //

import { Edition } from '@guardian/apps-rendering-api-models/edition';
import { ArticleDesign, ArticleDisplay, Pillar } from '../../articleFormat';
import { some } from '../../../vendor/@guardian/types/index';
import Dateline from './';

// ----- Stories ----- //

const Default = () => (
	<Dateline
		format={{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: Pillar.Opinion,
		}}
		date={some(new Date('2019-12-17T03:24:00'))}
		edition={Edition.UK}
	/>
);

const LiveBlogDateline = () => (
	<Dateline
		format={{
			design: ArticleDesign.LiveBlog,
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
		}}
		date={some(new Date('2019-12-17T03:24:00'))}
		edition={Edition.US}
	/>
);

const DeadBlogDateline = () => (
	<Dateline
		format={{
			design: ArticleDesign.DeadBlog,
			display: ArticleDisplay.Standard,
			theme: Pillar.Culture,
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
