// ----- Imports ----- //

import type { FC } from 'react';
import { LastUpdated } from './';

// ----- Stories ----- //

const Default: FC = () => (
	<LastUpdated
		lastUpdated={new Date(1613763519000)}
		lastUpdatedDisplay={'19.38 GMT'}
	/>
);

// ----- Exports ----- //

export default {
	component: LastUpdated,
	title: 'AR/LastUpdated',
};

export { Default };
