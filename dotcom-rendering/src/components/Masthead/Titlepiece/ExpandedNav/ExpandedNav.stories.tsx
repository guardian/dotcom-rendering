import { css } from '@emotion/react';
import { breakpoints } from '@guardian/source/foundations';
import { nav } from '../Nav.mock';
import { expandedMenuStyles, ExpandedNav } from './ExpandedNav';

export default {
	component: ExpandedNav,
	title: 'Components/Masthead/Titlepiece/ExpandedNav',
	parameters: {
		chromatic: { viewports: [breakpoints.mobileMedium, breakpoints.wide] },
	},
	render: () => (
		<div
			css={css`
				/* Force the menu open for storybook */
				div {
					${expandedMenuStyles}
				}
			`}
		>
			<ExpandedNav nav={nav} editionId={'UK'} />
		</div>
	),
};

export const Default = {};
