import type { Meta } from '@storybook/react';
import { trails } from '../../fixtures/manual/highlights-trails';
import { ScrollableSmallContainer } from './ScrollableSmallContainer.importable';

export default {
	title: 'ScrollableSmallContainer',
	component: ScrollableSmallContainer,
	args: {
		trails,
	},
} as Meta;

// type Story = StoryObj<typeof ScrollableSmallContainer>;

export const Default = {};
