import type { Meta } from '@storybook/react';
import { VeggieBurger } from './VeggieBurger';

const meta = {
	component: VeggieBurger,
	title: 'Components/Masthead/Titlepiece/VeggieBurger',
	render: () => <VeggieBurger />,
	args: {},
} satisfies Meta<typeof VeggieBurger>;

export default meta;

export const Default = {};
