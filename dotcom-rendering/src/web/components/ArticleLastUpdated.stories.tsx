import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { ArticleLastUpdated } from './ArticleLastUpdated';
import { decidePalette } from '../lib/decidePalette';

export default {
	component: ArticleLastUpdated,
	title: 'Components/ArticleLastUpdated',
};

export const LiveBlog = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.LiveBlog,
		theme: ArticlePillar.News,
	};
	const palette = decidePalette(format);

	return (
		<div style={{ background: palette.background.standfirst }}>
			<ArticleLastUpdated
				palette={palette}
				format={format}
				lastUpdated={1641038370000}
			/>
		</div>
	);
};

export const DeadBlog = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.DeadBlog,
		theme: ArticlePillar.News,
	};
	const palette = decidePalette(format);

	return (
		<div style={{ background: palette.background.standfirst }}>
			<ArticleLastUpdated
				palette={palette}
				format={format}
				lastUpdated={1641038370000}
			/>
		</div>
	);
};
