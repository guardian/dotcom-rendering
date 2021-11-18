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
			palette={decidePalette({
				theme: ArticlePillar.News,
				design: ArticleDesign.Standard,
				display: ArticleDisplay.Standard,
			})}
			format={defaultFormat}
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
				theme: ArticlePillar.News,
				design: ArticleDesign.Standard,
				display: ArticleDisplay.Standard,
			})}
			format={defaultFormat}
			size="small"
		/>
	);
};
Small.story = { name: 'Small' };
