import type { Meta } from '@storybook/react';
import { BurgerMenu } from './BurgerMenu';

const meta = {
	component: BurgerMenu,
	title: 'Components/Masthead/Titlepiece/BurgerMenu',
	render: () => <BurgerMenu />,
	args: {},
} satisfies Meta<typeof BurgerMenu>;

export default meta;

export const Default = {};
