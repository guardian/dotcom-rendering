import { css } from '@emotion/react';
import {
	between,
	from,
	palette as sourcePalette,
	space,
	until,
} from '@guardian/source-foundations';

const leftWidth = (size: LeftColSize, hasPageSkin: boolean) => {
	if (hasPageSkin) {
		return css`
			padding-right: 10px;
			display: none;
		`;
	}
	switch (size) {
		case 'wide': {
			return css`
				padding-right: 10px;
				${until.leftCol} {
					/* below 1140 */
					display: none;
				}

				${from.leftCol} {
					/* above 1140 */
					flex-basis: 230px;
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

const fullRightBorder = (colour: string) => css`
	border-right: 1px solid ${colour};
`;

type Props = {
	children: React.ReactNode;
	borderType?: 'full' | 'partial'; // if no borderType provided -> no border
	borderColour?: string;
	size?: LeftColSize;
	verticalMargins?: boolean;
	hasPageSkin?: boolean;
};

export const LeftColumn = ({
	children,
	borderType,
	borderColour = sourcePalette.neutral[86],
	size = 'compact',
	verticalMargins = true,
	hasPageSkin = false,
}: Props) => {
	return (
		<section
			css={[
				positionRelative,
				leftWidth(size, hasPageSkin),
				borderType === 'full' && fullRightBorder(borderColour),
				verticalMargins &&
					css`
						/*
							Keep spacing at the bottom of the container consistent at 36px, regardless of
							breakpoint, based on chat with Harry Fisher
						*/
						padding-bottom: ${space[9]}px;
					`,
			]}
		>
			<div
				css={[
					borderType === 'partial' &&
						partialRightBorder(borderColour),
					css`
						height: 100%;
					`,
				]}
			>
				{children}
			</div>
		</section>
	);
};
