import type { ReactNode } from 'react';
import {
	type Area,
	gridItemCss,
	type LayoutType,
} from '../lib/articleArrangements';

type GridItemProps = {
	area: Area;
	layoutType: LayoutType;
	element?: 'div' | 'aside';
	className?: string;
	children: ReactNode;
};

export const GridItem = ({
	area,
	layoutType,
	element: Element = 'div',
	className,
	children,
}: GridItemProps) => (
	<Element
		data-gu-name={area}
		css={gridItemCss(area, layoutType)}
		className={className}
	>
		{children}
	</Element>
);
