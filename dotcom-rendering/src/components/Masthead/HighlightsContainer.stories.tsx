import type { Meta } from '@storybook/react';
import { HighlightsContainer } from './HighlightsContainer';
import { trails } from '../../../fixtures/manual/highlights-trails';

export default {
	title: 'Masthead/HighlightsContainer',
	component: HighlightsContainer,
	args: {
		trails: trails,
	},
} as Meta;

export const Default = {};
