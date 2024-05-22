import { css } from '@emotion/react';
import { from } from '@guardian/source-foundations';
import { getZIndex } from '../lib/getZIndex';

type Props = {
	children: React.ReactNode;
	area: string;
	/**
	 * The element type to use.
	 */
	element?: 'div' | 'article' | 'main' | 'aside' | 'section';
};

const rightColumnStyles = css`
	/* IE Fallback */
	position: absolute;
	top: 0;
	right: 0;
	/* Pop me below the body */
	${getZIndex('rightColumnArea')}

	@supports (display: grid) {
		position: relative;
	}
`;

const bodyStyles = css`
	/* Pop me above the right column */
	${getZIndex('bodyArea')}
`;

const gridArea = css`
	grid-area: var(--grid-area);
`;

// TODO:: Pass knowledge of the test variant here
if (area === 'title') {
	if (area === 'title') {
		return css`
			grid-area: ${area};
			.sticky-tag-link-test & {
				z-index: 10;
				position: sticky;
				top: 0;
				margin-left: -10px;
				margin-right: -10px;
				${from.mobileLandscape} {
					margin-left: -20px;
					margin-right: -20px;
				}
				${from.phablet} {
					margin-left: 0px;
					margin-right: 0px;
				}
			}
		`;
	}
	return css`
		grid-area: ${area};
		z-index: 1000;
		position: sticky;
		top: 0;
	`;
}
return css`
	grid-area: ${area};
`;

export const GridItem = ({
	children,
	area,
	element: Element = 'div',
}: Props) => (
	<Element
		css={[
			area === 'body' && bodyStyles,
			area === 'right-column' && rightColumnStyles,
			gridArea,
		]}
		style={{
			'--grid-area': area,
		}}
		data-gu-name={area}
	>
		{children}
	</Element>
);
