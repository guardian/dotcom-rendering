import { Score } from './Score';

export default {
	component: Score,
	title: 'Components/Score',
};

export const Default = () => {
	return (
		<>
			<Score score={0} />
			<Score score={1} />
			<Score score={2} />
			<Score score={3} />
			<Score score={4} />
			<Score score={5} />
			<Score score={6} />
			<Score score={7} />
			<Score score={8} />
			<Score score={9} />
			<Score score={10} />
			<Score score={11} />
			<Score score={12} />
			<Score score={13} />
			<Score score={14} />
			<Score score={15} />
			<Score score={16} />
			<Score score={17} />
			<Score score={18} />
			<Score score={31} />
			<Score score={NaN} />
		</>
	);
};
Default.storyName = 'default';
