import { css } from '@emotion/react';
import { neutral, textSans } from '@guardian/source-foundations';
import type { FC } from 'react';
import { darkModeCss } from 'styles';

interface Props {
	lastUpdatedDisplay: string;
	lastUpdated: Date;
}

const LastUpdated: FC<Props> = ({ lastUpdatedDisplay, lastUpdated }: Props) => (
	<div
		css={css`
			display: flex;
			align-items: flex-end;
			${textSans.xxsmall()};
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
