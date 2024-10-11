import { css } from '@emotion/react';
import { getZIndex } from '../lib/getZIndex';

type Props = {
	children: React.ReactNode;
	area: string;
	/**
	 * The element type to use.
	 */
	element?: 'div' | 'article' | 'main' | 'aside' | 'section';
	leftBorder?: boolean;
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
	position: relative;
`;

const leftBorderStyles = css`
	:before {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: -10px;
		width: 1px;
		height: 100%;
		border-left: 1px solid var(--section-border);
	}
`;

export const GridItem = ({
	children,
	area,
	element: Element = 'div',
	leftBorder = false,
}: Props) => (
	<Element
		css={[
			leftBorder && leftBorderStyles,
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
