import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { StatusMessage } from './StatusMessage';
import { error, ok } from '../../lib/result';

const meta = {
	title: 'Admin/Apps Nav Tool/Status Message',
	component: StatusMessage,
} satisfies Meta<typeof StatusMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PublicationSuccess = {
	args: {
		message: ok('Publication successful.'),
	},
} satisfies Story;

export const PublishErrorNetwork = {
	args: {
		message: error({
			kind: 'PublishError',
			details: 'NetworkError',
		}),
	},
} satisfies Story;

export const PublishErrorVersionMismatch = {
	args: {
		message: error({
			kind: 'PublishError',
			details: 'VersionMismatch',
		}),
	},
} satisfies Story;

export const PublishErrorServer = {
	args: {
		message: error({
			kind: 'PublishError',
			details: 'ServerError',
		}),
	},
} satisfies Story;

export const InsertError = {
	args: {
		message: error({
			kind: 'InsertError',
			details: 'NoIndex',
			location: [2, 1],
		}),
	},
} satisfies Story;

export const DeleteError = {
	args: {
		message: error({
			kind: 'DeleteError',
			details: 'NoSectionAtLocation',
			location: [0, 3],
		}),
	},
} satisfies Story;

export const MoveError = {
	args: {
		message: error({
			kind: 'MoveError',
			details: 'OutOfRange',
			location: [0, 3],
			distance: -1,
		}),
	},
} satisfies Story;

export const UpdateError = {
	args: {
		message: error({
			kind: 'UpdateError',
			details: 'NoSectionAtLocation',
			location: [5],
		}),
	},
} satisfies Story;

export const NoHistoryError = {
	args: {
		message: error({ kind: 'NoHistoryError' }),
	},
} satisfies Story;
