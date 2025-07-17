/**
 * @file ThemedLink.stories.tsx
 * This file was migrated from:
 * https://github.com/guardian/gateway/blob/b980d008f91bd1abb108e50de9cdd1c364f37f4d/src/client/components/ThemedLink.stories.tsx
 */
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
