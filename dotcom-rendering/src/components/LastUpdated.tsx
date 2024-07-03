import { css } from '@emotion/react';
import { palette, textSans12 } from '@guardian/source/foundations';
import { DateTime } from './DateTime';

const LastUpdated = ({ lastUpdated }: { lastUpdated: number }) => {
	return (
		<div
			css={css`
				display: flex;
				align-items: flex-end;
				${textSans12};
				color: ${palette.neutral[46]};
			`}
		>
			Updated at&nbsp;
			<DateTime
				date={new Date(lastUpdated)}
				showWeekday={false}
				showDate={false}
				showTime={true}
			/>
		</div>
	);
};

export { LastUpdated };
