import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { galleryOnwardsTrails } from '../../fixtures/manual/onwardsTrails';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { MoreGalleries as MoreGalleriesComponent } from './MoreGalleries';

const meta = {
	title: 'Components/MoreGalleries',
	component: MoreGalleriesComponent,
} satisfies Meta<typeof MoreGalleriesComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		discussionApiUrl: 'https://discussion.theguardian.com/discussion-api',
		guardianBaseUrl: 'https://www.theguardian.com',
		trails: galleryOnwardsTrails,
		format: {
			design: ArticleDesign.Gallery,
			display: ArticleDisplay.Standard,
			theme: Pillar.Culture,
		},
	},
} satisfies Story;

export const WithFourCards = {
	...Default,
	args: {
		...Default.args,
		trails: galleryOnwardsTrails.slice(0, 4),
	},
} satisfies Story;

export const WithThreeCards = {
	...Default,
	args: {
		...Default.args,
		trails: galleryOnwardsTrails.slice(0, 3),
	},
} satisfies Story;

export const WithTwoCards = {
	...Default,
	args: {
		...Default.args,
		trails: galleryOnwardsTrails.slice(0, 2),
	},
} satisfies Story;

export const WithOneCard = {
	...Default,
	args: {
		...Default.args,
		trails: galleryOnwardsTrails.slice(0, 1),
	},
} satisfies Story;
