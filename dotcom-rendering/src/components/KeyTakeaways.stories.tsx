import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import type { Meta, StoryObj } from '@storybook/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import type { TextBlockElement } from '../types/content';
import { KeyTakeaways } from './KeyTakeaways';
import { getAllThemes } from '../lib/format';
import { images } from '../../fixtures/generated/images';

const meta: Meta<typeof KeyTakeaways> = {
	component: KeyTakeaways,
	title: 'Components/KeyTakeaways',
};

export default meta;

type Story = StoryObj<typeof KeyTakeaways>;

const html =
	'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesquepharetra libero nec varius feugiat. Nulla commodo sagittis erat amalesuada. Ut iaculis interdum eros, et tristique ex. In veldignissim arcu. Nulla nisi urna, laoreet a aliquam at, viverra eueros. Proin imperdiet pellentesque turpis sed luctus. Donecdignissim lacus in risus fermentum maximus eu vel justo. Duis nontortor ac elit dapibus imperdiet ut at risus. Etiam pretium, odioeget accumsan venenatis, tortor mi aliquet nisl, vel ullamcorperneque nulla vel elit. Etiam porta mauris nec sagittis luctus.</p>';

const testTextElement: TextBlockElement = {
	_type: 'model.dotcomrendering.pageElements.TextBlockElement',
	elementId: 'test-text-element-id-1',
	dropCap: false,
	html,
};

export const Default: Story = {
	args: {
		keyTakeaways: [
			{
				title: 'The first key takeaway',
				body: [testTextElement],
			},
			{
				title: 'The second key takeaway',
				body: [testTextElement],
			},
		],
	},
	decorators: [
		splitTheme(
			getAllThemes({
				design: ArticleDesign.Standard,
				display: ArticleDisplay.Standard,
			}),
		),
	],
};

export const Images: Story = {
	args: {
		keyTakeaways: [
			{
				title: 'The first key takeaway',
				body: [testTextElement, ...images.slice(0, 2)],
			},
			{
				title: 'The second key takeaway',
				body: [testTextElement, ...images.slice(2, 3)],
			},
		],
	},
	decorators: [
		splitTheme(
			[
				{
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
					theme: Pillar.Culture,
				},
			],
			{ orientation: 'vertical' },
		),
	],
};
