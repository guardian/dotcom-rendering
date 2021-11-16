import { css } from '@emotion/react';
import { from } from '@guardian/src-foundations/mq';
import { getZIndex } from '@frontend/web/lib/getZIndex';

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
				grid-area: ${area};
			}
		`;
	}

	if (area === 'body') {
		return css`
			grid-area: ${area};
			/* Pop me above the right column */
			${getZIndex('bodyArea')}
		`;
	}

	return css`
		grid-area: ${area};
	`;
};

export const GridItem = ({
	children,
	area,
	element: Element = 'div',
}: Props) => (
	<Element css={gridAreaStyles(area)} data-gu-name={area}>
		{children}
	</Element>
);
