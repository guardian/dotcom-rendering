import { css } from '@emotion/react';
import { palette, textSans } from '@guardian/source-foundations';
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
				${textSans.xxsmall()};
				color: ${palette.neutral[46]};
			`}
		>
			Updated at&nbsp;
			<DateTime
				date={new Date(lastUpdated)}
				editionId={editionId}
				showDate={false}
			/>
		</div>
	);
};

export { LastUpdated };
