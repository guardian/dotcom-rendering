import { Pillar } from '@guardian/types';
import React from 'react';

import { ShareIcons } from './ShareIcons';

export default {
	component: ShareIcons,
	title: 'Components/ShareIcons',
};

export const All = () => {
	return (
		<ShareIcons
			pageId=""
			webTitle=""
			displayIcons={[
				'facebook',
				'email',
				'linkedIn',
				'messenger',
				'pinterest',
				'twitter',
				'whatsApp',
			]}
			pillar={Pillar.News}
		/>
	);
};
All.story = { name: 'All' };
