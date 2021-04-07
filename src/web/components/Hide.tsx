import React from 'react';
import { css } from 'emotion';
import { until, from, Breakpoint } from '@guardian/src-foundations/mq';

interface Props {
	children: React.ReactNode;
	when: 'above' | 'below';
	breakpoint: Breakpoint;
}

interface PropsSpan extends Props {
	el?: 'span';
	key?: string;
}
interface PropsLi extends Props {
	el: 'li';
	key: string;
}

export const Hide = ({
	children,
	when,
	breakpoint,
	el,
	key,
}: PropsSpan | PropsLi) => {
	let whenToHide;
	if (when === 'below') {
		whenToHide = css`
			${until[breakpoint]} {
				display: none;
			}
		`;
	} else {
		whenToHide = css`
			${from[breakpoint]} {
				display: none;
			}
		`;
	}
	return el === 'li' ? (
		<li className={whenToHide} key={key}>
			{children}
		</li>
	) : (
		<span className={whenToHide}>{children}</span>
	);
};
