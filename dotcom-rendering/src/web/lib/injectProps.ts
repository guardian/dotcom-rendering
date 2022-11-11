import type { ReactNode } from 'react';
import { Children, cloneElement, isValidElement } from 'react';

export const injectProps = (
	children: ReactNode,
	props: Partial<unknown>,
): ReactNode => {
	return Children.map(children, (child) => {
		if (isValidElement(child)) {
			return cloneElement(child, props);
		}
		return child;
	});
};
