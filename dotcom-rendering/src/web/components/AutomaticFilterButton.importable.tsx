import { Button } from '@guardian/source-react-components';

type Props = {
	filter: Filter;
};
const AutomaticFilterButton = ({ filter }: Props) => {
	return (
		<Button
			id="automatic-filter-button"
			onClick={() => {
				console.log(filter.blocks);
				console.log('>>> <<<<');
			}}
		>
			{filter.name}
		</Button>
	);
};

export default AutomaticFilterButton;
