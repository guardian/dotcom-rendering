import { Design, Display, Pillar } from '@guardian/types';

import { decidePalette } from '../lib/decidePalette';

import { ShareIcons } from './ShareIcons';

export default {
	component: ShareIcons,
	title: 'Components/ShareIcons',
};

export const Medium = () => {
	return (
		<ShareIcons
			pageId=""
			webTitle=""
			displayIcons={[
				'facebook',
				'email',
				'linkedIn',
				'messenger',
				'twitter',
				'whatsApp',
			]}
			palette={decidePalette({
				theme: Pillar.News,
				design: Design.Article,
				display: Display.Standard,
			})}
			size="medium"
		/>
	);
};
Medium.story = { name: 'Medium' };

export const Small = () => {
	return (
		<ShareIcons
			pageId=""
			webTitle=""
			displayIcons={[
				'facebook',
				'email',
				'linkedIn',
				'messenger',
				'twitter',
				'whatsApp',
			]}
			palette={decidePalette({
				theme: Pillar.News,
				design: Design.Article,
				display: Display.Standard,
			})}
			size="small"
		/>
	);
};
Small.story = { name: 'Small' };
