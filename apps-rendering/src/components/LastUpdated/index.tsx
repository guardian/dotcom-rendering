import { css } from '@emotion/react';
import { neutral, textSans12 } from '@guardian/source/foundations';

import { darkModeCss } from 'styles';

interface Props {
	lastUpdatedDisplay: string;
	lastUpdated: Date;
}

const LastUpdated = ({ lastUpdatedDisplay, lastUpdated }: Props) => (
	<div
		css={css`
			display: flex;
			align-items: flex-end;
			${textSans12};
			color: ${neutral[46]};

			${darkModeCss`
				color: ${neutral[60]};
			`}
		`}
	>
		<time dateTime={lastUpdated.toISOString()}>
			{`Updated: ${lastUpdatedDisplay}`}
		</time>
	</div>
);

export { LastUpdated };
