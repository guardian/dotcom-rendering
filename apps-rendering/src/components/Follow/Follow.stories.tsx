// ----- Imports ----- //

import {
	getAllThemes,
	getThemeNameAsString,
} from '@guardian/common-rendering/src/fixtures/article';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { none } from '@guardian/types';
import { withKnobs } from '@storybook/addon-knobs';
import type { FC } from 'react';
import { selectPillar } from 'storybookHelpers';
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
			theme: selectPillar(ArticlePillar.News),
			design: ArticleDesign.Standard,
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
	decorators: [withKnobs],
};

export { Default, Deadblogs };
