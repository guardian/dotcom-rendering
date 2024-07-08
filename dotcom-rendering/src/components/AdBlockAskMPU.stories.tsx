import type { Meta, StoryObj } from '@storybook/react';
import { AdBlockAskMPU as AdBlockAskMPUComponent } from './AdBlockAsk.importable';

const meta = {
	title: 'Components/Ad Block Ask MPU',
	component: AdBlockAskMPUComponent,
} satisfies Meta<typeof AdBlockAskMPUComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AdBlockAskMPU = {
	args: {
		supportButtonHref: '#',
	},
} satisfies Story;
