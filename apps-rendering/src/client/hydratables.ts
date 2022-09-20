import { createElement, Fragment, VFC } from 'react';

export type Hydrateable = {
	containerClassName: string;
	needsInlineStyles: boolean;
};

export const makeRenderInnerComponentFunction = (
	innerComponent: VFC<any>,
): { (container: Element): React.ReactElement } => {
	return (container: Element) => {
		try {
			const props = JSON.parse(
				container.getAttribute('data-props') || '{}',
			) as any;
			return createElement(innerComponent, props);
		} catch (error) {
			return createElement(Fragment);
		}
	};
};
