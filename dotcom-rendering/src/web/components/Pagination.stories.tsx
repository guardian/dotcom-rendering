import {
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import { breakpoints } from '@guardian/src-foundations';
import { Pagination } from './Pagination';

export default {
	component: Pagination,
	title: 'Components/Pagination',
	parameters: {
		layout: 'padded',
		chromatic: { viewports: [breakpoints.mobile, breakpoints.wide] },
	},
};

const defaultFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
};

const formats = [
	{ ...defaultFormat, theme: ArticlePillar.News },
	{ ...defaultFormat, theme: ArticlePillar.Sport },
	{ ...defaultFormat, theme: ArticlePillar.Culture },
	{ ...defaultFormat, theme: ArticlePillar.Lifestyle },
	{ ...defaultFormat, theme: ArticlePillar.Opinion },
	{ ...defaultFormat, theme: ArticleSpecial.SpecialReport },
	{ ...defaultFormat, theme: ArticleSpecial.Labs },
];

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
