import { css } from '@emotion/react';
import { palette, textSans } from '@guardian/source-foundations';

const LastUpdated = ({
	lastUpdatedDisplay,
	lastUpdated,
}: {
	lastUpdatedDisplay: string;
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
			<time
				dateTime={new Date(lastUpdated).toISOString()}
				title={`Last updated ${new Date(lastUpdated).toLocaleDateString(
					'en-GB',
					{
						hour: '2-digit',
						minute: '2-digit',
						weekday: 'long',
						year: 'numeric',
						month: 'long',
						day: 'numeric',
						timeZoneName: 'long',
					},
				)}`}
			>
				{`Updated at ${lastUpdatedDisplay}`}
			</time>
		</div>
	);
};

export { LastUpdated };
