import { css } from '@emotion/react';
import { border } from '@guardian/src-foundations/palette';
import { from, between, until } from '@guardian/src-foundations/mq';

const leftWidth = (size: LeftColSize) => {
	switch (size) {
		case 'wide': {
			return css`
				padding-right: 10px;
				${until.desktop} {
					/* below 980 */
					display: none;
				}

				${from.desktop} {
					/* above 1300 */
					flex-basis: 320px;
					flex-grow: 0;
					flex-shrink: 0;
				}
			`;
		}
		case 'compact':
		default: {
			return css`
				padding-right: 10px;
				${until.leftCol} {
					/* below 1140 */
					display: none;
				}

				${between.leftCol.and.wide} {
					/* above 1140, below 1300 */
					flex-basis: 151px;
					flex-grow: 0;
					flex-shrink: 0;
				}

				${from.wide} {
					/* above 1300 */
					flex-basis: 230px;
					flex-grow: 0;
					flex-shrink: 0;
				}
			`;
		}
	}
};

const positionRelative = css`
	position: relative;
`;

const partialRightBorder = (colour: string) => css`
	:before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		height: 30px;
		width: 1px;
		background: ${colour};
	}
`;

const rightBorder = (colour: string) => css`
	border-right: 1px solid ${colour};
`;

type Props = {
	children: React.ReactNode;
	showRightBorder?: boolean;
	showPartialRightBorder?: boolean;
	borderColour?: string;
	size?: LeftColSize;
};

export const LeftColumn = ({
	children,
	showRightBorder = true,
	borderColour = border.secondary,
	showPartialRightBorder = false,
	size = 'compact',
}: Props) => {
	// Make sure we can never have both borders at the same time
	const shouldShowPartialBorder = showRightBorder
		? false
		: showPartialRightBorder;

	return (
		<section
			css={[
				positionRelative,
				leftWidth(size),
				showRightBorder && rightBorder(borderColour),
			]}
		>
			<div
				css={
					shouldShowPartialBorder && partialRightBorder(borderColour)
				}
			>
				{children}
			</div>
		</section>
	);
};
