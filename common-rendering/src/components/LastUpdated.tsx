import { css } from "@emotion/react";
import { neutral, textSans } from "@guardian/source-foundations";

const LastUpdated = ({
	lastUpdatedDisplay,
	lastUpdated,
	localFormat,
}: {
	lastUpdatedDisplay: string;
	lastUpdated: Date;
	localFormat: boolean;
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
				data-localFormat={localFormat}
				dateTime={lastUpdated.toISOString()}
			>
				{`Updated: ${lastUpdatedDisplay}`}
			</time>
		</div>
	);
};

export { LastUpdated };
