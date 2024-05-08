import type { Meta } from '@storybook/react';
import { Titlepiece } from './Titlepiece';

const meta = {
	title: 'Components/Masthead/Titlepiece',
	component: Titlepiece,
} satisfies Meta<typeof Titlepiece>;

export default meta;

export const Default = () => <Titlepiece />;
