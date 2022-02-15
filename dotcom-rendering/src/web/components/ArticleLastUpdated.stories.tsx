import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { css } from '@emotion/react';
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
		<div
			css={css`
				background: ${palette.background.standfirst};
			`}
		>
			<ArticleLastUpdated format={format} lastUpdated={1641038370000} />
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
		<div
			css={css`
				background: ${palette.background.standfirst};
			`}
		>
			<ArticleLastUpdated format={format} lastUpdated={1641038370000} />
		</div>
	);
};
