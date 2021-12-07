import { css } from "@emotion/react";
import { neutral, textSans } from "@guardian/source-foundations";

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
				color: ${neutral[46]};
			`}
		>
			<time dateTime={new Date(lastUpdated).toISOString()}>
				{`Updated: ${lastUpdatedDisplay}`}
			</time>
		</div>
	);
};

export { LastUpdated };
