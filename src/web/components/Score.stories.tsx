/* eslint-disable jsx-a11y/accessible-emoji */

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
			<p>^ We only go up to 10 at the moment 🤷‍♀</p>
		</>
	);
};
Default.story = { name: 'default' };
