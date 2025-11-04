import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { parse } from 'valibot';
import { ukNav } from '../../fixtures/manual/appsNav/uk';
import { AppsNavSchema, type AppsNav } from './appsNav';
import { AppsNavTool } from './AppsNavTool';
import { fn } from 'storybook/test';

const meta = {
	title: 'Admin/Apps Nav Tool',
	component: AppsNavTool,
} satisfies Meta<typeof AppsNavTool>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		ukNav: parse(AppsNavSchema, ukNav),
		guardianBaseUrl: 'https://www.theguardian.com',
		publish: fn((_data: AppsNav) => Promise.resolve(true)),
	},
} satisfies Story;

export const AddSectionForm = {
	...Default,
	play: ({ canvas, userEvent }) => {
		const addSection = canvas.getByRole('button', { name: 'Add Section' });

		userEvent.click(addSection);
	},
} satisfies Story;

export const EditSectionForm = {
	...Default,
	play: ({ canvas, userEvent }) => {
		// ! is used here to make sure we get an error in storybook if this
		// can't be found.
		const addSection = canvas.getAllByRole('button', { name: 'Edit' })[0]!;

		userEvent.click(addSection);
	},
} satisfies Story;
