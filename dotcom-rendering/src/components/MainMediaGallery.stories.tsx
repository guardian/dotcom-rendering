import { gridContainerDecorator } from '../../.storybook/decorators/gridDecorators';
import preview from '../../.storybook/preview';
import { images } from '../../fixtures/generated/images';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { MainMediaGallery } from './MainMediaGallery';

const meta = preview.meta({
	title: 'Components/MainMediaGallery',
	component: MainMediaGallery,
	decorators: gridContainerDecorator,
});

export const Default = meta.story({
	args: {
		mainMedia: images[0],
		format: {
			design: ArticleDesign.Gallery,
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
		},
		renderingTarget: 'Web',
	},
});

export const PortraitImage = meta.story({
	args: {
		...Default.input.args,
		mainMedia: images[7],
	},
});
