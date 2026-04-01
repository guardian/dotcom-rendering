import preview from '../../.storybook/preview';
import { galleryOnwardsTrails } from '../../fixtures/manual/onwardsTrails';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { ScrollableSmallOnwards } from './ScrollableSmallOnwards';

const meta = preview.meta({
	title: 'Components/ScrollableSmallOnwards',
	component: ScrollableSmallOnwards,
});

export const ScrollableSmallOnwardsStory = meta.story({
	args: {
		serverTime: new Date('2022-09-01T20:00:25.000Z').getTime(),
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
});
