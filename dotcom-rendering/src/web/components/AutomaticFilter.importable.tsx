import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import { useState } from 'react';
import { useApi } from '../lib/useApi';
import AutomaticFilterButton from './AutomaticFilterButton.importable';

type Props = {
	pageId: string;
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

export const AutomaticFilter = ({ pageId, pinnedPostId }: Props) => {
	const [selectedFilter, setSelectedFilter] = useState('show all');
	const { data, error }: { data?: FilterResult; error?: any } = useApi(
		`https://ner.code.dev-gutools.co.uk/v1/top-mentions?entities=PERSON,LOC,GPE&top=10&path=/${pageId}`,
		{
			refreshInterval: 10_000,
			refreshWhenHidden: true,
			onSuccess: () => {},
		},
	);

	if (error) {
		return null;
	}

	return data ? (
		<div css={ContainerStyles}>
			<AutomaticFilterButton
				selectedFilter={selectedFilter}
				setSelectedFilter={setSelectedFilter}
				filter={showAllFilter}
			/>
			{data?.results.map((filter: Filter) => (
				<AutomaticFilterButton
					selectedFilter={selectedFilter}
					setSelectedFilter={setSelectedFilter}
					filter={filter}
					pinnedPostId={pinnedPostId}
				/>
			))}
		</div>
	) : null;
};
