import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import { getAllThemes } from '../lib/format';
import { Pagination } from './Pagination';

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

export const notFirstPage = () => (
	<>
		{formats.map((format) => (
			<Pagination
				key={JSON.stringify(format)}
				currentPage={2}
				totalPages={6}
				format={format}
			/>
		))}
	</>
);

notFirstPage.story = {
	name: 'Not first page',
};

export const firstPageStory = () => (
	<>
		{formats.map((format) => (
			<Pagination
				key={JSON.stringify(format)}
				currentPage={1}
				totalPages={4}
				format={format}
			/>
		))}
	</>
);

firstPageStory.story = {
	name: 'First page',
};
