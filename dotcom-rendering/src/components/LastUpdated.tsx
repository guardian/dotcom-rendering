import { css } from '@emotion/react';
import { palette, textSans } from '@guardian/source-foundations';
import { RelativeTime } from './RelativeTime.importable';

const LastUpdated = ({ lastUpdated }: { lastUpdated: number }) => {
	return (
		<div
			css={css`
				display: flex;
				align-items: flex-end;
				${textSans.xxsmall()};
				color: ${palette.neutral[46]};
			`}
		>
			Updated <RelativeTime then={lastUpdated}></RelativeTime>
		</div>
	);
};

export { LastUpdated };
