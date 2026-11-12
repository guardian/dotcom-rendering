import type { ReactNode } from 'react';
import type { ArticleFormat } from '../../lib/articleFormat';
import {
	type Area,
	gridItemCss,
	type LayoutType,
} from '../lib/articleArrangements';

type GridItemProps = {
	area: Area;
	layoutType: LayoutType;
	format: ArticleFormat;
	element?: 'div' | 'aside';
	className?: string;
	children: ReactNode;
};

export const GridItem = ({
	area,
	layoutType,
	format,
	element: Element = 'div',
	className,
	children,
}: GridItemProps) => (
	<Element
		data-gu-name={area}
		css={gridItemCss(area, layoutType, format)}
		className={className}
	>
		{children}
	</Element>
);
