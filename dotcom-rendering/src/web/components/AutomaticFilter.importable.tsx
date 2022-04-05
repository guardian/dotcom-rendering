import { useApi } from '../lib/useApi';
import AutomaticFilterButton from './AutomaticFilterButton.importable';

type Props = {
	pageId: string;
};

interface Filter {
	name: string;
	type: string;
	count: number;
	blocks: string[];
	percentage_blocks: number;
}

interface FilterResult {
	results: Filter[];
	model: string;
	entityType: string[];
}

export const AutomaticFilter = ({ pageId }: Props) => {
	const { data, error }: { data?: FilterResult; error?: any } = useApi(
		`https://ner.code.dev-gutools.co.uk/v1/top-mentions?entities=PERSON,LOC,GPE&top=10&path=/${pageId}`,
		{
			refreshInterval: 10_000,
			refreshWhenHidden: true,
			onSuccess: () => {},
		},
	);

	console.log(data?.results);

	if (error) {
		return null;
	}

	return data ? (
		<div id="just-for-testing">
			{data?.results.map((result: Filter) => (
				<AutomaticFilterButton label={result.name} />
			))}
		</div>
	) : null;
};
