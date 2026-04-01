import preview from '../../.storybook/preview';
import { LastUpdated } from './LastUpdated';

const meta = preview.meta({
	component: LastUpdated,
	title: 'Components/LastUpdated',
});

export const Default = meta.story({
	args: { lastUpdated: 1613763519000 },
});
