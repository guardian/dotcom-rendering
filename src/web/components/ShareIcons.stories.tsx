import React from 'react';

import { Design, Display, Pillar } from '@guardian/types';

import { decidePalette } from '../lib/decidePalette';

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
			palette={decidePalette({
				theme: Pillar.News,
				design: Design.Article,
				display: Display.Standard,
			})}
		/>
	);
};
All.story = { name: 'All' };
