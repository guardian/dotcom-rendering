import preview from '../../.storybook/preview';
import { TagPageHeader } from './TagPageHeader';

const meta = preview.meta({
	component: TagPageHeader,
	title: 'Components/TagPageHeader',
});

export const Default = meta.story({
	args: {
		title: 'Example title',
		description: `<p>And a much longer description with lots of text, other thoughts and musings`,
	},
});

export const WithLink = meta.story({
	args: {
		title: 'Example title',
		description: `<p>And a much longer description with lots of text, other thoughts and musings <a href="#">and a link</a></p>`,
	},
});

export const WithLinkAndImage = meta.story({
	args: {
		title: 'Example title',
		description: `<p>And a much longer description with lots of text, other thoughts and musings <a href="#">and a link</a></p>`,
		image: {
			kind: 'byline',
			url: 'https://uploads.guim.co.uk/2023/02/17/Josh_Halliday.jpg',
		},
	},
});

export const WithFootballCrest = meta.story({
	args: {
		title: 'Aston Villa',
		description: `<p>And a much longer description with lots of text, other thoughts and musings <a href="#">and a link</a></p>`,
		image: {
			kind: 'footballCrest',
			teamId: '2',
		},
	},
});
