import { css } from '@emotion/react';
import { textSans } from '@guardian/source-foundations';
import {
	SvgChevronDownSingle,
	SvgChevronUpSingle,
} from '@guardian/source-react-components';
import { getZIndex } from '../lib/getZIndex';

const colourStyles = (colour: string) => css`
	color: ${colour};
	svg {
		fill: ${colour};
	}
`;

const Position = ({
	children,
	top,
	left,
	right,
	bottom,
}: {
	children: React.ReactNode;
	top?: number;
	left?: number;
	right?: number;
	bottom?: number;
}) => {
	return (
		<div
			css={css`
				/* Decide where the content revealed by details appears */
				position: absolute;
				top: ${top != null && `${top}px`};
				left: ${left != null && `${left}px`};
				right: ${right != null && `${right}px`};
				bottom: ${bottom != null && `${bottom}px`};
				${getZIndex('summaryDetails')}
			`}
		>
			{children}
		</div>
	);
};

/**
 * **Details**
 *
 * A styled abstraction over the html summary/details elements. Renders a disclosure widget in which
 * information is only shown when the widget is toggled into an "open" state
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details
 */
export const Details = ({
	label,
	children,
	colour,
	top,
	right,
	bottom,
	left,
}: {
	label: string;
	children: React.ReactNode;
	colour?: string;
	top?: number;
	right?: number;
	bottom?: number;
	left?: number;
}) => (
	<details
		css={css`
			/* Hide up icon when the disclosure is closed */
			[data-icon='chevronDown'] {
				display: inline;
			}
			[data-icon='chevronUp'] {
				display: none;
			}
			:is([open]) {
				/* Hide down icon when the disclosure is open */
				[data-icon='chevronDown'] {
					display: none;
				}
				[data-icon='chevronUp'] {
					display: inline;
				}
			}
			${textSans.small()}
			position: relative;
		`}
	>
		<summary
			css={[
				css`
					/* Don't show the default summary triangle */
					list-style: none;
					::-webkit-details-marker {
						display: none;
					}
					cursor: pointer;
					display: flex;
				`,
				colour && colourStyles(colour),
			]}
		>
			{label}
			{/* We use these spans to show/hide the icons based on open state */}
			<span data-icon="chevronDown">
				<SvgChevronDownSingle size="xsmall" />
			</span>
			<span data-icon="chevronUp">
				<SvgChevronUpSingle size="xsmall" />
			</span>
		</summary>
		<Position top={top} left={left} bottom={bottom} right={right}>
			{children}
		</Position>
	</details>
);
