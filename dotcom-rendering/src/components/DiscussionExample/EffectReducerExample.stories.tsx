import type { Meta, StoryObj } from '@storybook/react';
import { EffectReducerExample } from './EffectReducerExample';

const meta: Meta<typeof EffectReducerExample> = {
	title: 'components/EffectReducerExample',
	component: EffectReducerExample,
};

export default meta;

type Story = StoryObj<typeof EffectReducerExample>;

export const Default: Story = {
	args: {},
};
