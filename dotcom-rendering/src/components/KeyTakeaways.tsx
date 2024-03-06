import { KeyTakeaway } from '../types/content';

type Props = {
	keyTakeaways: KeyTakeaway[];
};

const KeyTakeawayComponent = (props: { keyTakeaway: KeyTakeaway }) => {
	return <h2>{props.keyTakeaway.title}</h2>;
};

export const KeyTakeaways = (props: Props) => {
	return (
		<>
			{props.keyTakeaways.map((keyTakeaway) => (
				<KeyTakeawayComponent keyTakeaway={keyTakeaway} />
			))}
		</>
	);
};
