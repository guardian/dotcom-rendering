import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';

import { decidePalette } from '../lib/decidePalette';

import { ShareIcons } from './ShareIcons';

export default {
	component: ShareIcons,
	title: 'Components/ShareIcons',
};

const defaultFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: ArticlePillar.News,
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
			palette={decidePalette(defaultFormat)}
			format={defaultFormat}
			size="medium"
			context="LiveBlock"
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
			palette={decidePalette(defaultFormat)}
			format={defaultFormat}
			size="small"
			context="LiveBlock"
		/>
	);
};
Small.story = { name: 'Small' };
