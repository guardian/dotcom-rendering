import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { useState } from 'react';
import { splitTheme } from '../../../.storybook/decorators/splitThemeDecorator';
import type { FilterOptions } from '../../types/discussion';
import { Pagination } from './Pagination';

const articleFormat: ArticleFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: Pillar.News,
};

export default { component: Pagination, title: 'Discussion/Pagination' };

const DEFAULT_FILTERS: FilterOptions = {
	orderBy: 'newest',
	pageSize: 25,
	threads: 'collapsed',
};

export const Default = () => {
	const [page, setCurrentPage] = useState(1);
	return (
		<Pagination
			totalPages={9}
			currentPage={page}
			setCurrentPage={setCurrentPage}
			filters={DEFAULT_FILTERS}
			commentCount={200}
		/>
	);
};
Default.storyName = 'default';
Default.decorators = [splitTheme([articleFormat])];

export const TwoPages = () => {
	const [page, setCurrentPage] = useState(1);
	return (
		<Pagination
			totalPages={2}
			currentPage={page}
			setCurrentPage={setCurrentPage}
			filters={DEFAULT_FILTERS}
			commentCount={56}
		/>
	);
};
TwoPages.storyName = 'with two pages';
TwoPages.decorators = [splitTheme([articleFormat])];

export const ThreePages = () => {
	const [page, setCurrentPage] = useState(1);
	return (
		<Pagination
			totalPages={3}
			currentPage={page}
			setCurrentPage={setCurrentPage}
			filters={DEFAULT_FILTERS}
			commentCount={75}
		/>
	);
};
ThreePages.storyName = 'with three pages';
ThreePages.decorators = [splitTheme([articleFormat])];

export const FourPages = () => {
	const [page, setCurrentPage] = useState(1);
	return (
		<Pagination
			totalPages={4}
			currentPage={page}
			setCurrentPage={setCurrentPage}
			filters={DEFAULT_FILTERS}
			commentCount={100}
		/>
	);
};
FourPages.storyName = 'with four pages';
FourPages.decorators = [splitTheme([articleFormat])];

export const FivePages = () => {
	const [page, setCurrentPage] = useState(1);
	return (
		<Pagination
			totalPages={5}
			currentPage={page}
			setCurrentPage={setCurrentPage}
			filters={DEFAULT_FILTERS}
			commentCount={124}
		/>
	);
};
FivePages.storyName = 'with five pages';
FivePages.decorators = [splitTheme([articleFormat])];

export const SixPages = () => {
	const [page, setCurrentPage] = useState(1);
	return (
		<Pagination
			totalPages={6}
			currentPage={page}
			setCurrentPage={setCurrentPage}
			filters={DEFAULT_FILTERS}
			commentCount={149}
		/>
	);
};
SixPages.storyName = 'with six pages';
SixPages.decorators = [splitTheme([articleFormat])];

export const SevenPages = () => {
	const [page, setCurrentPage] = useState(1);
	return (
		<Pagination
			totalPages={7}
			currentPage={page}
			setCurrentPage={setCurrentPage}
			filters={DEFAULT_FILTERS}
			commentCount={159}
		/>
	);
};
SevenPages.storyName = 'with seven pages';
SevenPages.decorators = [splitTheme([articleFormat])];

export const TwelvePages = () => {
	const [page, setCurrentPage] = useState(1);
	return (
		<Pagination
			totalPages={12}
			currentPage={page}
			setCurrentPage={setCurrentPage}
			filters={DEFAULT_FILTERS}
			commentCount={288}
		/>
	);
};
TwelvePages.storyName = 'with twelve pages';
TwelvePages.decorators = [splitTheme([articleFormat])];

export const LotsOfPages = () => {
	const [page, setCurrentPage] = useState(1);
	return (
		<Pagination
			totalPages={187}
			currentPage={page}
			setCurrentPage={setCurrentPage}
			filters={DEFAULT_FILTERS}
			commentCount={490000}
		/>
	);
};
LotsOfPages.storyName = 'with many pages';
LotsOfPages.decorators = [splitTheme([articleFormat])];

export const WhenExpanded = () => {
	const [page, setCurrentPage] = useState(1);
	return (
		<Pagination
			totalPages={4}
			currentPage={page}
			setCurrentPage={setCurrentPage}
			filters={{ ...DEFAULT_FILTERS, threads: 'expanded' }}
			commentCount={100}
		/>
	);
};
WhenExpanded.storyName = 'when expanded';
WhenExpanded.decorators = [splitTheme([articleFormat])];

export const WhenCollapsed = () => {
	const [page, setCurrentPage] = useState(1);
	return (
		<Pagination
			totalPages={4}
			currentPage={page}
			setCurrentPage={setCurrentPage}
			filters={{ ...DEFAULT_FILTERS, threads: 'collapsed' }}
			commentCount={100}
		/>
	);
};
WhenCollapsed.storyName = 'when collapsed';
WhenCollapsed.decorators = [splitTheme([articleFormat])];

export const WhenUnthreaded = () => {
	const [page, setCurrentPage] = useState(1);
	return (
		<Pagination
			totalPages={4}
			currentPage={page}
			setCurrentPage={setCurrentPage}
			filters={{ ...DEFAULT_FILTERS, threads: 'unthreaded' }}
			commentCount={100}
		/>
	);
};
WhenUnthreaded.storyName = 'when unthreaded';
WhenUnthreaded.decorators = [splitTheme([articleFormat])];
