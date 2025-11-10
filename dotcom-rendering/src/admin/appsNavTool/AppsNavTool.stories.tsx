import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn, within } from 'storybook/test';
import { parse } from 'valibot';
import { auNav } from '../../../fixtures/manual/appsNav/au';
import { ukNav } from '../../../fixtures/manual/appsNav/uk';
import { error, ok } from '../../lib/result';
import { AppsNavSchema } from './appsNav';
import type { PublishResult } from './AppsNavTool';
import { AppsNavTool } from './AppsNavTool';

const meta = {
	title: 'Admin/Apps Nav Tool',
	component: AppsNavTool,
} satisfies Meta<typeof AppsNavTool>;

export default meta;

type Story = StoryObj<typeof meta>;

export const UKNav = {
	args: {
		nav: parse(AppsNavSchema, ukNav),
		editionId: 'UK',
		guardianBaseUrl: 'https://www.theguardian.com',
		publish: fn(() => Promise.resolve<PublishResult>(ok(true))),
	},
} satisfies Story;

export const AUNav = {
	args: {
		...UKNav.args,
		nav: parse(AppsNavSchema, auNav),
		editionId: 'AU',
	},
};

export const AddSectionForm = {
	...UKNav,
	play: async ({ canvas, userEvent }) => {
		const addSection = canvas.getByRole('button', { name: 'Add Section' });

		await userEvent.click(addSection);
	},
} satisfies Story;

export const EditSectionForm = {
	...UKNav,
	play: async ({ canvas, userEvent }) => {
		// ! is used here to make sure we get an error in storybook if this
		// can't be found.
		const addSection = canvas.getAllByRole('button', { name: 'Edit' })[0]!;

		await userEvent.click(addSection);
	},
} satisfies Story;

export const PublishConfirm = {
	...UKNav,
	play: async ({ canvas, userEvent, step }) => {
		await step('Delete the first section', async () => {
			// ! is used here to make sure we get an error in storybook if this
			// can't be found.
			const deleteSection = canvas.getAllByRole('button', {
				name: 'Delete',
			})[0]!;
			await userEvent.click(deleteSection);
		});

		await step('Move the sixth section up', async () => {
			const moveSectionUp = canvas.getAllByRole('button', {
				name: 'Move Up',
			})[5]!;
			await userEvent.click(moveSectionUp);
		});

		await step('Move the first section down', async () => {
			const moveSectionDown = canvas.getAllByRole('button', {
				name: 'Move Down',
			})[0]!;
			await userEvent.click(moveSectionDown);
		});

		await step('Edit the fourth section', async () => {
			const editSection = canvas.getAllByRole('button', {
				name: 'Edit',
			})[3]!;
			await userEvent.click(editSection);

			const editDialog = canvas.getAllByRole('dialog', {
				hidden: true,
			})[1]!;

			const titleInput = within(editDialog).getByLabelText('Title', {
				selector: 'input',
			});
			await userEvent.type(titleInput, 'US Money');

			const urlInput = within(editDialog).getByLabelText('Dotcom Link', {
				selector: 'input',
			});
			await userEvent.type(urlInput, 'us/money');

			const submit = within(editDialog).getByRole('button', {
				name: 'Submit',
			});
			await userEvent.click(submit);
		});

		await step('Add a new section', async () => {
			const addSection = canvas.getByRole('button', {
				name: 'Add Section',
			});
			await userEvent.click(addSection);

			const insertDialog = canvas.getAllByRole('dialog', {
				hidden: true,
			})[0]!;

			const titleInput = within(insertDialog).getByLabelText('Title', {
				selector: 'input',
			});
			await userEvent.type(titleInput, 'Classical');

			const urlInput = within(insertDialog).getByLabelText(
				'Dotcom Link',
				{
					selector: 'input',
				},
			);
			await userEvent.type(
				urlInput,
				'https://www.theguardian.com/music/classical-music-and-opera',
			);

			const submit = within(insertDialog).getByRole('button', {
				name: 'Submit',
			});
			await userEvent.click(submit);
		});

		const publish = canvas.getByRole('button', { name: 'Publish' });
		await userEvent.click(publish);
	},
} satisfies Story;

export const PublishError = {
	args: {
		...UKNav.args,
		publish: fn(() =>
			Promise.resolve<PublishResult>(error('NetworkError')),
		),
	},
	play: async ({ canvas, userEvent }) => {
		// ! is used here to make sure we get an error in storybook if this
		// can't be found.
		const addSection = canvas.getAllByRole('button', {
			name: 'Move Down',
		})[0]!;
		await userEvent.click(addSection);

		const publish = canvas.getByRole('button', { name: 'Publish' });
		await userEvent.click(publish);

		const confirmPublish = canvas.getAllByRole('button', {
			name: 'Publish',
		})[1]!;
		await userEvent.click(confirmPublish);
	},
} satisfies Story;
