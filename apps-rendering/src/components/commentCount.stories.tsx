// ----- Imports ----- //

import {
	getAllThemes,
	getThemeNameAsString,
} from '@guardian/common-rendering/src/fixtures/article';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import { some } from '@guardian/types';
import { boolean, number, withKnobs } from '@storybook/addon-knobs';
import type { FC, ReactElement } from 'react';
import { selectPillar } from 'storybookHelpers';
import CommentCount from './commentCount';

// ----- Stories ----- //

const Default: FC = () => (
	<CommentCount
		count={some(number('Count', 1234, { min: 0 }))}
		theme={selectPillar(ArticlePillar.News)}
		design={ArticleDesign.Standard}
		display={ArticleDisplay.Standard}
		commentable={boolean('Commentable', true)}
	/>
);

const Deadblogs = (): ReactElement => {
	return (
		<>
			{getAllThemes({
				display: ArticleDisplay.Standard,
				design: ArticleDesign.DeadBlog,
			}).map((format) => (
				<div key={format.theme}>
					<p>{getThemeNameAsString(format)}</p>
					<CommentCount
						count={some(number('Count', 1234, { min: 0 }))}
						theme={format.theme}
						design={ArticleDesign.DeadBlog}
						display={ArticleDisplay.Standard}
						commentable={boolean('Commentable', true)}
					/>
					<br />
				</div>
			))}
		</>
	);
};

Deadblogs.story = {
	name: 'Deadblogs comment count below desktop',
	parameters: {
		viewport: { defaultViewport: 'tablet' },
		chromatic: { viewports: [breakpoints.tablet] },
	},
};

// ----- Exports ----- //

export default {
	component: CommentCount,
	title: 'AR/CommentCount',
	decorators: [withKnobs],
};

export { Default, Deadblogs };
