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

export const MoreGalleries = {
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
