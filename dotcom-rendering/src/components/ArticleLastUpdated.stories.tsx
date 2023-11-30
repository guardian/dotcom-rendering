import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { palette as themePalette } from '../palette';
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

	return (
		<div
			css={css`
				background: ${themePalette('--standfirst-background')};
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

	return (
		<div
			css={css`
				background: ${themePalette('--standfirst-background')};
			`}
		>
			<ArticleLastUpdated format={format} lastUpdated={1641038370000} />
		</div>
	);
};
