import { css } from '@emotion/react';
import { until, from, Breakpoint } from '@guardian/src-foundations/mq';

interface Props {
	children: React.ReactNode;
	when: 'above' | 'below';
	breakpoint: Breakpoint;
}

interface PropsSpan extends Props {
	el?: 'span';
}
interface PropsLi extends Props {
	el: 'li';
}

export const Hide = ({
	children,
	when,
	breakpoint,
	el,
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
		<li css={whenToHide}>{children}</li>
	) : (
		<span css={whenToHide}>{children}</span>
	);
};
