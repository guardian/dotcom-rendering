// ----- Imports ----- //

import { ArticleDesign, ArticleDisplay, Pillar } from '../../articleFormat';
import { none } from '../../../vendor/@guardian/types/index';
import { getAllThemes, getThemeNameAsString } from 'fixtures/article';
import Follow from './';

// ----- Stories ----- //

const Default = () => (
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
			theme: Pillar.News,
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
		}}
	/>
);

const Comment = () => (
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
			theme: Pillar.Opinion,
			design: ArticleDesign.Comment,
			display: ArticleDisplay.Standard,
		}}
	/>
);

const Deadblogs = () => {
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
