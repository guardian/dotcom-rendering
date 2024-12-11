import type { Meta } from '@storybook/react';
import { ShowHideButton } from './ShowHideButton.importable';

const meta = {
	title: 'Components/ShowHideButton',
	component: ShowHideButton,
	args: {
		sectionId: 'sectionId',
	},
} satisfies Meta<typeof ShowHideButton>;

export default meta;

export const Default = {};
