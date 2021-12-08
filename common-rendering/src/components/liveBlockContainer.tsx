import { css } from "@emotion/react";

import { from } from "@guardian/source-foundations";
import { neutral, space } from "@guardian/source-foundations";

const LEFT_MARGIN_DESKTOP = 60;
const SIDE_MARGIN = space[5];
const SIDE_MARGIN_MOBILE = 10;

const LiveBlockContainer = ({
	id,
	children,
	borderColour,
}: {
	id: string;
	children: React.ReactNode;
	borderColour: string;
}) => {
	return (
		<article
			id={`block-${id}`}
			key={id}
			css={css`
				padding: ${space[2]}px ${SIDE_MARGIN_MOBILE}px;
				margin-bottom: ${space[3]}px;
				background: ${neutral[100]};
				border-top: 1px solid ${borderColour};
				${from.tablet} {
					padding: ${space[2]}px ${SIDE_MARGIN}px;
					padding-left: ${LEFT_MARGIN_DESKTOP}px;
				}
			`}
		>
			{children}
		</article>
	);
};

export default LiveBlockContainer;
