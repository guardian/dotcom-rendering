import { css, SerializedStyles } from '@emotion/react';
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
	positionStyles,
}: {
	children: React.ReactNode;
	positionStyles?: SerializedStyles;
}) => {
	return (
		<div
			css={css`
				/* Decide where the content revealed by details appears */
				position: absolute;
				${getZIndex('summaryDetails')}
				${positionStyles}
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
	colour,
	positionStyles,
	children,
	labelSize,
}: {
	label: string;
	labelSize: string;
	colour?: string;
	positionStyles?: SerializedStyles;
	children: React.ReactNode;
}) => (
	<details
		css={css`
			/* Hide up icon when the disclosure is closed */
			[data-icon='chevronUp'] {
				display: none;
			}
			[data-icon='chevronDown'] {
				display: inline;
			}

			/* Hide down icon when the disclosure is open */
			:is([open]) {
				[data-icon='chevronDown'] {
					display: none;
				}
				[data-icon='chevronUp'] {
					display: inline;
				}
			}
			${labelSize}
			position: relative;
		`}
	>
		<summary
			css={[
				css`
					/**
					 * Hide the default summary triangle.
					 * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary#default_style
					 */
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
		<Position positionStyles={positionStyles}>{children}</Position>
	</details>
);
