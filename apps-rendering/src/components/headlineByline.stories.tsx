// ----- Imports ----- //
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import type { FC } from 'react';
import { mockBylineHtml } from './byline.stories';
import HeadlineByline from './headlineByline';

// ----- Stories ----- //

const Default: FC = () => (
	<HeadlineByline
		format={{
			theme: ArticlePillar.News,
			design: ArticleDesign.Interview,
			display: ArticleDisplay.Standard,
		}}
		bylineHtml={mockBylineHtml()}
	/>
);

// ----- Exports ----- //

export default {
	component: HeadlineByline,
	title: 'AR/HeadlineByline',
};

export { Default };
