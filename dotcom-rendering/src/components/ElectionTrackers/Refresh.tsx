import {
	space,
	textSans14Object,
	textSansBold14Object,
} from '@guardian/source/foundations';
import { palette } from '../../palette';
import { PulsingDot } from '../PulsingDot.island';

type Props = {
	/**
	 * The number of seconds remaining until refresh.
	 */
	remaining: number;
};

export const Refresh = (props: Props) => {
	const refreshing =
		props.remaining === 0
			? 'refreshing...'
			: `next refresh in ${props.remaining}s`;

	return (
		<p
			css={{
				...textSans14Object,
				paddingBottom: space[3],
				color: palette('--election-tracker-refresh'),
			}}
			role="timer"
		>
			<PulsingDot />
			<b css={textSansBold14Object}>LIVE</b> {refreshing}
		</p>
	);
};
