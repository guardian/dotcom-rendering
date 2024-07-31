import { breakpoints } from '@guardian/source/foundations';
import { nav } from '../../../Nav/Nav.mock';
import { ExpandedNav } from './ExpandedNav';

export default {
	component: ExpandedNav,
	title: 'Components/Masthead/Titlepiece/ExpandedNav',
	parameters: {
		backgrounds: { default: 'dark' },
		chromatic: { viewports: [breakpoints.mobileMedium, breakpoints.wide] },
	},
};

export const Default = () => {
	return (
		<>
			<ExpandedNav nav={nav} editionId={'UK'} />
		</>
	);
};
