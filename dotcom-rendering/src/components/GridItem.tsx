import { css } from '@emotion/react';
import { from, space } from '@guardian/source/foundations';
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

const usCardStyles = css`
	align-self: start;
	position: sticky;
	top: 0;
	${getZIndex('expandableMarketingCardOverlay')}

	${from.leftCol} {
		margin-top: ${space[6]}px;
		margin-bottom: ${space[9]}px;

		/* To align with rich links - if we move this feature to production, we should remove this and make rich link align with everything instead */
		margin-left: 1px;
		margin-right: -1px;
	}

	${from.wide} {
		margin-left: 0;
	}
`;

const gridArea = css`
	grid-area: var(--grid-area);
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
			area === 'uscard' && usCardStyles,
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
