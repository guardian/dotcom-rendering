import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { AppsAudioPlayButton as AppsAudioPlayButtonComponent } from './AppsAudioPlayButton';

const meta = {
	component: AppsAudioPlayButtonComponent,
	title: 'Components/Apps Audio Play Button',
} satisfies Meta<typeof AppsAudioPlayButtonComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithDuration: Story = {
	args: {
		onClickHandler: () => undefined,
		audioDuration: '26:00',
	},
};

export const NoDuration: Story = {
	args: {
		onClickHandler: () => undefined,
		audioDuration: undefined,
	},
};
