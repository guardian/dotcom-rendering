import { FirstPublished } from './FirstPublished';

export default {
	component: FirstPublished,
	title: 'Components/FirstPublished',
};

export const Default = () => (
	<FirstPublished
		firstPublished={1613763003000}
		blockId="#block-60300f5f8f08ad21ea60071e"
		isPinnedPost={false}
		isOriginalPinnedPost={false}
	/>
);

export const WithFirstPublishedDisplay = () => (
	<FirstPublished
		firstPublished={1613763003000}
		firstPublishedDisplay={'99:99'}
		blockId="#block-60300f5f8f08ad21ea60071e"
		isPinnedPost={false}
		isOriginalPinnedPost={false}
	/>
);

export const PinnedPost = () => (
	<FirstPublished
		firstPublished={1613763003000}
		blockId="#block-60300f5f8f08ad21ea60071e"
		isPinnedPost={true}
		isOriginalPinnedPost={false}
	/>
);

export const OriginalPinnedPost = () => (
	<FirstPublished
		firstPublished={1613763003000}
		blockId="#block-60300f5f8f08ad21ea60071e"
		isPinnedPost={false}
		isOriginalPinnedPost={true}
	/>
);
