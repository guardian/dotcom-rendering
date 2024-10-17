import { useState } from 'react';
import { splitTheme } from '../../../.storybook/decorators/splitThemeDecorator';
import { ArticleDesign, ArticleDisplay, Pillar } from '../../lib/articleFormat';
import type { FilterOptions } from '../../lib/discussion';
import { Filters } from './Filters';

export default { title: 'Discussion/Filters' };

export const Default = () => {
	const [filters, setFilters] = useState<FilterOptions>({
		orderBy: 'newest',
		pageSize: 25,
		threads: 'collapsed',
	});
	return (
		<Filters
			filters={filters}
			onFilterChange={setFilters}
			topLevelCommentCount={74}
		/>
	);
};
Default.storyName = 'default';
Default.decorators = [
	splitTheme([
		{
			theme: Pillar.Culture,
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
		},
	]),
];
