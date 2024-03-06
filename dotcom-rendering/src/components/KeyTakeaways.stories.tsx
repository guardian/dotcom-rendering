import { Meta, StoryObj } from '@storybook/react';
import { KeyTakeaways } from './KeyTakeaways';
import { TextBlockElement } from '../types/content';

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
				title: 'my first key takeaway',
				body: [testTextElement],
			},
		],
	},
};
