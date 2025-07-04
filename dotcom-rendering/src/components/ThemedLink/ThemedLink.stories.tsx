import type { Meta } from '@storybook/react';
import { ThemedLink } from './ThemedLink';

export default {
	title: 'Components/ThemedLink',
	component: ThemedLink,
	parameters: {
		layout: 'padded',
	},
} as Meta;

export const Default = () => <ThemedLink>Click me!</ThemedLink>;
Default.storyName = 'default';
