import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { from, palette, textSans15 } from '@guardian/source/foundations';
import { formatTime } from '../../../lib/formatTime';

const timeCSS = css`
	padding-top: 4px;
	display: flex;
	align-items: center;
	justify-content: center;
	${textSans15};
	color: ${palette.neutral[86]};
	background-color: ${palette.neutral[20]};
	z-index: 1;

	${from.leftCol} {
		padding-top: 0;
	}
`;

export const CurrentTime = ({ currentTime }: { currentTime: number }) => (
	<time
		aria-label="Current playing time"
		css={[
			timeCSS,
			css`
				grid-area: current-time;
				justify-content: flex-start;
				padding-left: 10px;
			`,
		]}
	>
		{formatTime(currentTime)}
	</time>
);

export const Duration = ({ duration }: { duration?: number }) => (
	<time
		aria-label="Total playing time"
		css={[
			timeCSS,
			css`
				grid-area: duration;
				justify-content: flex-end;
				padding-right: 10px;
			`,
		]}
	>
		{formatTime(isUndefined(duration) || isNaN(duration) ? 0 : duration)}
	</time>
);
