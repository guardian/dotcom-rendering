import type { Meta, StoryObj } from '@storybook/react';
import { ListenToArticleButton as ListenToArticleButtonComponent } from './ListenToArticleButton';

const meta = {
	component: ListenToArticleButtonComponent,
	title: 'Components/Listen To Article Button',
} satisfies Meta<typeof ListenToArticleButtonComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ListenToArticleButton = {
	args: {
		onClickHandler: () => undefined,
	},
} satisfies Story;
