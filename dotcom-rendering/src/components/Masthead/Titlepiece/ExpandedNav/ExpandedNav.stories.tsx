import { nav } from '../../../Nav/Nav.mock';
import { ExpandedNav } from './ExpandedNav';

export default {
	component: ExpandedNav,
	title: 'Components/Masthead/Titlepiece/ExpandedNav',
	parameters: {
		backgrounds: { default: 'dark' },
	},
};

export const Default = () => {
	return <ExpandedNav nav={nav} editionId={'UK'} />;
};
