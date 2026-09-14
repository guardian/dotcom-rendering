import preview from '../../../.storybook/preview';
import { palette } from '../../palette';
import { Refresh } from './Refresh';
import { useCountdown } from './useCountdown';

const meta = preview.meta({
	component: Refresh,
	title: 'Components/Election Trackers/Refresh',
	parameters: {
		colourSchemeBackground: {
			light: palette('--front-container-background'),
			dark: palette('--front-container-background'),
		},
	},
});

/**
 * Not used for snapshots, just for documentation purposes in storybook, to
 * demonstrate how `reset` works.
 */
export const Countdown = meta.story({
	args: {
		remaining: 20,
	},
	render: function Render(props) {
		const [remaining, reset] = useCountdown(props.remaining);

		return (
			<>
				<Refresh remaining={remaining} />
				<button onClick={reset}>Reset</button>
			</>
		);
	},
	parameters: {
		chromatic: {
			disable: true,
		},
	},
});

export const Remaining = meta.story({
	args: {
		remaining: 5,
	},
});

export const Refreshing = meta.story({
	args: {
		remaining: 0,
	},
});
