import type { Meta } from '@storybook/react';
import { trails } from '../../../fixtures/manual/highlights-trails';
import { HighlightsContainer } from '../HighlightsContainer.importable';

export default {
	title: 'Masthead/HighlightsContainer',
	component: HighlightsContainer,
	args: {
		trails,
	},
} as Meta;

export const Default = {};
