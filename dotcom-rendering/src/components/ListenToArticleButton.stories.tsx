import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ListenToArticleButton as ListenToArticleButtonComponent } from './ListenToArticleButton';

const meta = {
	component: ListenToArticleButtonComponent,
	title: 'Components/Listen To Article Button',
} satisfies Meta<typeof ListenToArticleButtonComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ListenToArticleWithDurationButton = {
	args: {
		onClickHandler: () => undefined,
		audioDuration: '3:02',
	},
} satisfies Story;

export const ListenToArticleNoDurationButton = {
	args: {
		onClickHandler: () => undefined,
		audioDuration: undefined,
	},
} satisfies Story;
