import { Topic } from '@guardian/bridget';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import type { NotificationsClient } from '../lib/bridgetApi';
import { NotificationsToggle as NotificationsToggleComponent } from './NotificationsToggle';

const meta = {
	component: NotificationsToggleComponent,
} satisfies Meta<typeof NotificationsToggleComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockNotificationsClient: NotificationsClient = (() => {
	let following = false;

	return {
		follow: fn(() => {
			following = true;
			return Promise.resolve(true);
		}),

		unfollow: fn(() => {
			following = false;
			return Promise.resolve(true);
		}),

		isFollowing: fn(() => {
			return Promise.resolve(following);
		}),
	};
})();

export const NotificationsToggle = {
	args: {
		displayName: 'A notification',
		id: 'a-notification-id',
		notificationType: 'content',
		notificationsClient: mockNotificationsClient,
	},
	play: async ({ args, step, canvasElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button');
		const expectedTopic = new Topic({
			displayName: args.displayName,
			id: args.id,
			type: args.notificationType,
		});

		await expect(button).toHaveTextContent('Notifications off');

		await step('isFollowing is called', async () => {
			await waitFor(() =>
				expect(
					mockNotificationsClient.isFollowing,
				).toHaveBeenCalledWith(expectedTopic),
			);
		});

		await step('follow is called when button is clicked', async () => {
			await userEvent.click(button);
			await waitFor(async () => {
				await expect(
					mockNotificationsClient.follow,
				).toHaveBeenCalledWith(expectedTopic);
				await expect(button).toHaveTextContent('Notifications on');
			});
		});

		await step('unfollow is called when button is clicked', async () => {
			await userEvent.click(button);
			await waitFor(async () => {
				await expect(
					mockNotificationsClient.unfollow,
				).toHaveBeenCalledWith(expectedTopic);
				await expect(button).toHaveTextContent('Notifications off');
			});
		});
	},
} satisfies Story;
