import { css } from "@emotion/react";
import { neutral, textSans } from "@guardian/source-foundations";

const LastUpdated = ({
	lastUpdatedDisplay,
	lastUpdated,
}: {
	lastUpdatedDisplay: string;
	lastUpdated: Date;
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
			<time
				className="js-last-updated-time"
				data-last-updated={lastUpdated.toISOString()}
				dateTime={lastUpdated.toISOString()}
			>
				{`Updated: ${lastUpdatedDisplay}`}
			</time>
		</div>
	);
};

export { LastUpdated };
