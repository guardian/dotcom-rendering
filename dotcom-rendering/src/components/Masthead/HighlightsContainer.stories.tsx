import type { Meta, StoryObj } from '@storybook/react';
import { HighlightsContainer } from './HighlightsContainer';
import { trails } from '../../../fixtures/manual/highlights-trails';
import { css } from '@emotion/react';

export default {
	title: 'Masthead/HighlightsContainer',
	component: HighlightsContainer,
	args: {
		trails: trails,
	},
} as Meta;

type Story = StoryObj<typeof HighlightsContainer>;

export const Default = {};
