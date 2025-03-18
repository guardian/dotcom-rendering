import type { Meta, StoryObj } from '@storybook/react/*';
import { FootballTableList } from './FootballTableList';

const meta = {
	title: 'Components/Football Table List',
	component: FootballTableList,
} satisfies Meta<typeof FootballTableList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
