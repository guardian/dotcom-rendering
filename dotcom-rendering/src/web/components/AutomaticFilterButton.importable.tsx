import { Button } from '@guardian/source-react-components';

type Props = {
	label: string;
};
const AutomaticFilterButton = ({ label }: Props) => {
	return (
		<Button
			onClick={() => {
				console.log('button clicked', label);
			}}
		>
			{label}
		</Button>
	);
};

export default AutomaticFilterButton;
