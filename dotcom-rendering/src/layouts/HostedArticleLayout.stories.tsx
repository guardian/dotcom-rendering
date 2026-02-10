import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { allModes } from '../../.storybook/modes';
import { hostedArticle } from '../../fixtures/manual/hostedArticle';
import { enhanceArticleType } from '../types/article';
import { HostedArticleLayout } from './HostedArticleLayout';

const meta = {
	title: 'Layouts/HostedArticle',
	component: HostedArticleLayout,
	parameters: {
		chromatic: {
			modes: {
				'light leftCol': allModes['light leftCol'],
			},
		},
	},
} satisfies Meta<typeof HostedArticleLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Apps = {
	args: {
		content: enhanceArticleType(hostedArticle, 'Apps'),
		renderingTarget: 'Apps',
	},
	parameters: {
		config: {
			renderingTarget: 'Apps',
		},
	},
} satisfies Story;

export const Web = {
	args: {
		content: enhanceArticleType(hostedArticle, 'Web'),
		renderingTarget: 'Web',
	},
	parameters: {
		config: {
			renderingTarget: 'Web',
		},
	},
} satisfies Story;
