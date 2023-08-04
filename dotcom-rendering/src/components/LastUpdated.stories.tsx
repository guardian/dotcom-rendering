import { LastUpdated } from './LastUpdated.tsx';

export default {
	component: LastUpdated,
	title: 'Components/LastUpdated',
};

export const Default = () => {
	return (
		<LastUpdated
			lastUpdated={1613763519000}
			lastUpdatedDisplay="19.38 GMT"
		/>
	);
};

Default.storyName = 'Default';
