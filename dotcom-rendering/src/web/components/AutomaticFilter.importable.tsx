import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import { useState } from 'react';
import AutomaticFilterButton from './AutomaticFilterButton.importable';

type Props = {
	automaticFilterData?: FilterResult;
	pinnedPostId?: string;
};

const ContainerStyles = css`
	margin-top: ${space[2]}px;
	margin-bottom: ${space[2]}px;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	align-content: space-between;
`;

interface Filter {
	name: string;
	type: string;
	count: number;
	blocks: string[];
	percentage_blocks: number;
}

const showAllFilter = {
	name: 'Show All',
	type: ' ',
	count: 0,
	blocks: [''],
	percentage_blocks: 0,
};

export const AutomaticFilter = ({
	automaticFilterData,
	pinnedPostId,
}: Props) => {
	const [selectedFilter, setSelectedFilter] = useState('show all');

	return (
		<div css={ContainerStyles}>
			<AutomaticFilterButton
				selectedFilter={selectedFilter}
				setSelectedFilter={setSelectedFilter}
				filter={showAllFilter}
			/>
			{automaticFilterData?.results.map((filter: Filter) => (
				<AutomaticFilterButton
					selectedFilter={selectedFilter}
					setSelectedFilter={setSelectedFilter}
					filter={filter}
					pinnedPostId={pinnedPostId}
				/>
			))}
		</div>
	);
};
