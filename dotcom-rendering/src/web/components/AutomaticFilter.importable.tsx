import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import { useState } from 'react';
import { useApi } from '../lib/useApi';
import AutomaticFilterButton from './AutomaticFilterButton.importable';

type Props = {
	pageId: string;
};

const ContainerStyles = css`
	margin-top: ${space[2]}px;
	margin-bottom: ${space[2]}px;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-around;
	align-content: space-between;
`;

export const AutomaticFilter = ({ pageId }: Props) => {
	const [selectedFilter, setSelectedFilter] = useState('');
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
		<div id="just-for-testing" css={ContainerStyles}>
			{data?.results.map((filter: Filter) => (
				<AutomaticFilterButton
					selectedFilter={selectedFilter}
					setSelectedFilter={setSelectedFilter}
					filter={filter}
				/>
			))}
		</div>
	) : null;
};
