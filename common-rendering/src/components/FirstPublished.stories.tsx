// ----- Imports ----- //

import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import type { FC } from 'react';

import { FirstPublished } from './FirstPublished';

// ----- Stories ----- //

const Default: FC = () => (
	<FirstPublished
		supportsDarkMode={true}
		firstPublished={1613763003000}
		blockId="#block-60300f5f8f08ad21ea60071e"
		isPinnedPost={false}
		isOriginalPinnedPost={false}
		format={{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: ArticlePillar.News,
		}}
	/>
);

const WithFirstPublishedDisplay: FC = () => (
	<FirstPublished
		supportsDarkMode={true}
		firstPublished={1613763003000}
		firstPublishedDisplay={'99:99'}
		blockId="#block-60300f5f8f08ad21ea60071e"
		isPinnedPost={false}
		isOriginalPinnedPost={false}
		format={{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: ArticlePillar.News,
		}}
	/>
);

const PinnedPost: FC = () => (
	<FirstPublished
		supportsDarkMode={true}
		firstPublished={1613763003000}
		blockId="#block-60300f5f8f08ad21ea60071e"
		isPinnedPost={true}
		isOriginalPinnedPost={false}
		format={{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: ArticlePillar.News,
		}}
	/>
);

const OriginalPinnedPost: FC = () => (
	<FirstPublished
		supportsDarkMode={true}
		firstPublished={1613763003000}
		blockId="#block-60300f5f8f08ad21ea60071e"
		isPinnedPost={false}
		isOriginalPinnedPost={true}
		format={{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: ArticlePillar.News,
		}}
	/>
);

// ----- Exports ----- //

export default {
	component: FirstPublished,
	title: 'Common/Components/FirstPublished',
};

export { Default, WithFirstPublishedDisplay, PinnedPost, OriginalPinnedPost };
