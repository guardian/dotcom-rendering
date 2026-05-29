import { userEvent, within } from 'storybook/test';
import preview from '../../.storybook/preview';
import { AustralianTerritorySwitcher } from './AustralianTerritorySwitcher.island';

const meta = preview.meta({
	component: AustralianTerritorySwitcher,
	title: 'Components/Australian Territory Switcher',
});

export const Victoria = meta.story({
	args: {
		targetedTerritory: 'AU-VIC',
	},
});

export const QueenslandExpanded = meta.story({
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
});
