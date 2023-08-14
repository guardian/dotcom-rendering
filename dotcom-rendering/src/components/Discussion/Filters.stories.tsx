import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { useState } from 'react';
import type { FilterOptions } from '../../types/discussion';
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
			format={{
				theme: Pillar.Culture,
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
			}}
			filters={filters}
			onFilterChange={setFilters}
			totalPages={5}
			commentCount={74}
		/>
	);
};
Default.storyName = 'default';
