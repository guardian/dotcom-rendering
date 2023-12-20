// ----- Imports ----- //

import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { none } from '../../../vendor/@guardian/types/index';
import { getAllThemes, getThemeNameAsString } from 'fixtures/article';
import type { FC } from 'react';
import Follow from './';

// ----- Stories ----- //

const Default: FC = () => (
	<Follow
		contributors={[
			{
				id: 'profile/janesmith',
				apiUrl: 'janesmith.com',
				name: 'Jane Smith',
				image: none,
			},
		]}
		format={{
			theme: ArticlePillar.News,
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
		}}
	/>
);

const Comment: FC = () => (
	<Follow
		contributors={[
			{
				id: 'profile/janesmith',
				apiUrl: 'janesmith.com',
				name: 'Jane Smith',
				image: none,
			},
		]}
		format={{
			theme: ArticlePillar.Opinion,
			design: ArticleDesign.Comment,
			display: ArticleDisplay.Standard,
		}}
	/>
);

const Deadblogs: FC = () => {
	return (
		<>
			{getAllThemes({
				display: ArticleDisplay.Standard,
				design: ArticleDesign.DeadBlog,
			}).map((format) => (
				<div key={format.theme}>
					<p>{getThemeNameAsString(format)}</p>
					<Follow
						contributors={[
							{
								id: 'profile/janesmith',
								apiUrl: 'janesmith.com',
								name: 'Jane Smith',
								image: none,
							},
						]}
						format={{
							theme: format.theme,
							design: ArticleDesign.DeadBlog,
							display: ArticleDisplay.Standard,
						}}
					/>
					<br />
				</div>
			))}
		</>
	);
};

// ----- Exports ----- //

export default {
	component: Follow,
	title: 'AR/Follow',
};

export { Default, Comment, Deadblogs };
