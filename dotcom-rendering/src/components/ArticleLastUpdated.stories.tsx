import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { decidePalette } from '../lib/decidePalette';
import { ArticleLastUpdated } from './ArticleLastUpdated';

export default {
	component: ArticleLastUpdated,
	title: 'Components/ArticleLastUpdated',
};

export const LiveBlog = () => {
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.LiveBlog,
		theme: Pillar.News,
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
		theme: Pillar.News,
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
