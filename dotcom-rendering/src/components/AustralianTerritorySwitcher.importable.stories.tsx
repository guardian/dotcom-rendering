import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import { AustralianTerritorySwitcher } from './AustralianTerritorySwitcher.importable';

const meta = {
	component: AustralianTerritorySwitcher,
	title: 'Components/Australian Territory Switcher',
} satisfies Meta<typeof AustralianTerritorySwitcher>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Victoria = {
	args: {
		targetedTerritory: 'AU-VIC',
	},
} satisfies Story;

export const QueenslandExpanded = {
	args: {
		targetedTerritory: 'AU-QLD',
	},
	/**
	 * Clicks the “Not in Queensland” button so that Chromatic can capture
	 * the component in its `expanded` state.
	 */
	play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole('button'));
	},
	name: 'Queensland, expanded',
} satisfies Story;
