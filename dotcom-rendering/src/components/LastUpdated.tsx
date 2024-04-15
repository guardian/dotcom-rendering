import { css } from '@emotion/react';
import { palette, textSans12 } from '@guardian/source-foundations';
import type { EditionId } from '../lib/edition';
import { DateTime } from './DateTime';

const LastUpdated = ({
	editionId,
	lastUpdated,
}: {
	editionId: EditionId;
	lastUpdated: number;
}) => {
	return (
		<div
			css={css`
				display: flex;
				align-items: flex-end;
				${textSans12};
				color: ${palette.neutral[46]};
			`}
		>
			Updated at
			<DateTime
				date={new Date(lastUpdated)}
				editionId={editionId}
				showWeekday={false}
				showDate={false}
				showTime={true}
			/>
		</div>
	);
};

export { LastUpdated };
