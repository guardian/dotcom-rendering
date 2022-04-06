import AutomaticFilterButton from './AutomaticFilterButton.importable';

type Props = {
	automaticFilterData?: FilterResult;
};

export const AutomaticFilter = ({ automaticFilterData }: Props) => {
	return (
		<div id="just-for-testing">
			{automaticFilterData?.results.map((filter: Filter) => (
				<AutomaticFilterButton filter={filter} />
			))}
		</div>
	);
};
