import { css } from "@emotion/react";
import { neutral, textSans } from "@guardian/source-foundations";

const LastUpdated = ({
	lastUpdatedDisplay,
	lastUpdated,
	relativeFormat,
}: {
	lastUpdatedDisplay: string;
	lastUpdated: Date;
	relativeFormat: "local" | "edition";
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
				data-relativeformat={relativeFormat}
				dateTime={lastUpdated.toISOString()}
			>
				{`Updated: ${lastUpdatedDisplay}`}
			</time>
		</div>
	);
};

export { LastUpdated };
