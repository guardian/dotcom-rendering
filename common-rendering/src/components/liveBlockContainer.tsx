import { css } from '@emotion/react';

import { from } from '@guardian/src-foundations/mq';
import { neutral, space } from '@guardian/src-foundations';

const LEFT_MARGIN_DESKTOP = 60;
const SIDE_MARGIN = 20;
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
		<div
			id={`block-${id}`}
			css={css`
				display: inline-flex;
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
			<main>{children}</main>
		</div>
	);
};

export default LiveBlockContainer;
