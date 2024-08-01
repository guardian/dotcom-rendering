import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';

export const center = css`
	position: relative;
	margin: auto;

	${from.tablet} {
		max-width: 740px;
	}

	${from.desktop} {
		max-width: 980px;
	}

	${from.leftCol} {
		max-width: 1140px;
	}

	${from.wide} {
		max-width: 1300px;
	}
`;

const baseStyles = css`
	position: relative;
	margin: auto;
`;

type Breakpoint = 'tablet' | 'desktop' | 'leftCol' | 'wide';

export const decideCenter = (breakpoint: Breakpoint) => {
	switch (breakpoint) {
		case 'tablet':
			return css`
				${baseStyles}
				${from.tablet} {
					max-width: 740px;
				}

				${from.desktop} {
					max-width: 980px;
				}

				${from.leftCol} {
					max-width: 1140px;
				}

				${from.wide} {
					max-width: 1300px;
				}
			`;
		case 'desktop':
			return css`
				${baseStyles}
				${from.desktop} {
					max-width: 980px;
				}

				${from.leftCol} {
					max-width: 1140px;
				}

				${from.wide} {
					max-width: 1300px;
				}
			`;
		case 'leftCol':
			return css`
				${baseStyles}
				${from.leftCol} {
					max-width: 1140px;
				}

				${from.wide} {
					max-width: 1300px;
				}
			`;
		case 'wide':
			return css`
				${baseStyles}
				${from.wide} {
					max-width: 1300px;
				}
			`;
	}
};
