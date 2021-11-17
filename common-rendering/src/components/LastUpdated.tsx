import { css } from "@emotion/react";
import { neutral } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";

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
				{`Updated at ${lastUpdatedDisplay}`}
			</time>
		</div>
	);
};

export { LastUpdated };
