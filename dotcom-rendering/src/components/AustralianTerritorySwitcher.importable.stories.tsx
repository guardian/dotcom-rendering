import { userEvent, within } from '@storybook/testing-library';
import { AustralianTerritorySwitcher } from './AustralianTerritorySwitcher.importable';

export default {
	component: AustralianTerritorySwitcher,
	title: 'Components/AustralianTerritorySwitcher',
};

export const Victoria = () => (
	<AustralianTerritorySwitcher targetedTerritory="AU-VIC" />
);

export const Queensland = () => (
	<AustralianTerritorySwitcher targetedTerritory="AU-QLD" />
);

/**
 * Clicks the “Not in Queensland” button so that Chromatic can capture
 * it the component in its `expanded` state.
 */
Queensland.play = ({ canvasElement }: { canvasElement: HTMLElement }) => {
	const canvas = within(canvasElement);
	userEvent.click(canvas.getByRole('button'));
};
Queensland.storyName = 'Queensland (expanded)';
