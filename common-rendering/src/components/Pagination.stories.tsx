import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import { Pagination } from './Pagination';
import { getAllThemes } from '../fixtures/article';

export default {
	component: Pagination,
	title: 'Components/Pagination',
	parameters: {
		layout: 'padded',
		chromatic: { viewports: [breakpoints.mobile, breakpoints.wide] },
	},
};

const formats = getAllThemes({
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
});

export const notFirstPage = () => {
	return (
		<>
			{formats.map((format) => (
				<Pagination currentPage={2} totalPages={6} format={format} />
			))}
		</>
	);
};
notFirstPage.story = {
	name: 'Not first page',
};

export const firstPageStory = () => {
	return (
		<>
			{formats.map((format) => (
				<Pagination currentPage={1} totalPages={4} format={format} />
			))}
		</>
	);
};
firstPageStory.story = {
	name: 'First page',
};
