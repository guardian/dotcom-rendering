import { css } from '@emotion/react';
import { getZIndex } from '../lib/getZIndex';

type Props = {
	children: React.ReactNode;
	area: string;
	/**
	 * The element type to use.
	 */
	element?: 'div' | 'article' | 'main' | 'aside' | 'section';
};

const gridAreaStyles = (area: string) => {
	if (area === 'right-column') {
		return css`
			/* IE Fallback */
			position: absolute;
			top: 0;
			right: 0;
			/* Pop me below the body */
			${getZIndex('rightColumnArea')}

			@supports (display: grid) {
				position: relative;
				overflow-x: hidden;
			}
		`;
	}

	if (area === 'body') {
		return css`
			overflow-x: hidden;
			/* Pop me above the right column */
			${getZIndex('bodyArea')}
		`;
	}

	return css`
		overflow-x: hidden;
	`;
};

export const GridItem = ({
	children,
	area,
	element: Element = 'div',
}: Props) => (
	<Element
		css={gridAreaStyles(area)}
		style={{
			gridArea: area,
		}}
		data-gu-name={area}
	>
		{children}
	</Element>
);
