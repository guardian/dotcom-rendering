import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { galleryOnwardsTrails } from '../../fixtures/manual/onwardsTrails';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { ScrollableSmallOnwards } from './ScrollableSmallOnwards';

const meta = {
	title: 'Components/ScrollableSmallOnwards',
	component: ScrollableSmallOnwards,
} satisfies Meta<typeof ScrollableSmallOnwards>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ScrollableSmallOnwardsStory = {
	args: {
		discussionApiUrl:
			'https://discussion.code.dev-theguardian.com/discussion-api',
		heading: 'More on this story',
		headingUrl: 'http://localhost:9000/more-galleries',
		onwardsSource: 'related-content',
		format: {
			design: ArticleDesign.Gallery,
			theme: Pillar.News,
			display: ArticleDisplay.Standard,
		},
		trails: galleryOnwardsTrails,
	},
} satisfies Story;
