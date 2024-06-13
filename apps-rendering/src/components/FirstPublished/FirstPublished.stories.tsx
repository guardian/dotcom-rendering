// ----- Imports ----- //

import { Edition } from '@guardian/apps-rendering-api-models/edition';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';

import FirstPublished from '.';

// ----- Stories ----- //

const Default = () => (
	<FirstPublished
		firstPublished={new Date(1613763003000)}
		blockId="#block-60300f5f8f08ad21ea60071e"
		isPinnedPost={false}
		isOriginalPinnedPost={false}
		format={{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: ArticlePillar.News,
		}}
		edition={Edition.UK}
	/>
);

const PinnedPost = () => (
	<FirstPublished
		firstPublished={new Date(1613763003000)}
		blockId="#block-60300f5f8f08ad21ea60071e"
		isPinnedPost={true}
		isOriginalPinnedPost={false}
		format={{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: ArticlePillar.News,
		}}
		edition={Edition.UK}
	/>
);

const OriginalPinnedPost = () => (
	<FirstPublished
		firstPublished={new Date(1613763003000)}
		blockId="#block-60300f5f8f08ad21ea60071e"
		isPinnedPost={false}
		isOriginalPinnedPost={true}
		format={{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: ArticlePillar.News,
		}}
		edition={Edition.UK}
	/>
);

// ----- Exports ----- //

export default {
	component: FirstPublished,
	title: 'AR/FirstPublished',
};

export { Default, PinnedPost, OriginalPinnedPost };
