import preview from '../../.storybook/preview';
import { FirstPublished } from './FirstPublished';

const meta = preview.meta({
	component: FirstPublished,
	title: 'Components/FirstPublished',
});

export const Default = meta.story(() => (
	<FirstPublished
		firstPublished={1613763003000}
		blockId="#block-60300f5f8f08ad21ea60071e"
		isPinnedPost={false}
		isOriginalPinnedPost={false}
	/>
));

export const WithFirstPublishedDisplay = meta.story(() => (
	<FirstPublished
		firstPublished={1613763003000}
		firstPublishedDisplay={'99:99'}
		blockId="#block-60300f5f8f08ad21ea60071e"
		isPinnedPost={false}
		isOriginalPinnedPost={false}
	/>
));

export const PinnedPost = meta.story(() => (
	<FirstPublished
		firstPublished={1613763003000}
		blockId="#block-60300f5f8f08ad21ea60071e"
		isPinnedPost={true}
		isOriginalPinnedPost={false}
	/>
));

export const OriginalPinnedPost = meta.story(() => (
	<FirstPublished
		firstPublished={1613763003000}
		blockId="#block-60300f5f8f08ad21ea60071e"
		isPinnedPost={false}
		isOriginalPinnedPost={true}
	/>
));
