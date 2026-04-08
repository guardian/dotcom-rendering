import { breakpoints } from '@guardian/source/foundations';
import preview from '../../.storybook/preview';
import { galleryOnwardsTrails } from '../../fixtures/manual/onwardsTrails';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { MoreGalleries as MoreGalleriesComponent } from './MoreGalleries';

const meta = preview.meta({
	title: 'Components/MoreGalleries',
	component: MoreGalleriesComponent,
});

export const Default = meta.story({
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
	parameters: {
		chromatic: {
			viewports: [breakpoints.mobile, breakpoints.desktop],
		},
	},
});

export const WithFourCards = meta.story({
	...Default.input,
	args: {
		...Default.input.args,
		trails: galleryOnwardsTrails.slice(0, 4),
	},
});

export const WithThreeCards = meta.story({
	...Default.input,
	args: {
		...Default.input.args,
		trails: galleryOnwardsTrails.slice(0, 3),
	},
});

export const WithTwoCards = meta.story({
	...Default.input,
	args: {
		...Default.input.args,
		trails: galleryOnwardsTrails.slice(0, 2),
	},
});

export const WithOneCard = meta.story({
	...Default.input,
	args: {
		...Default.input.args,
		trails: galleryOnwardsTrails.slice(0, 1),
	},
});
