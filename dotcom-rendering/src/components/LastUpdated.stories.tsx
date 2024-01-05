import { LastUpdated } from './LastUpdated';

export default {
	component: LastUpdated,
	title: 'Components/LastUpdated',
};

export const Default = () => {
	return <LastUpdated lastUpdated={1613763519000} />;
};

Default.storyName = 'Default';
