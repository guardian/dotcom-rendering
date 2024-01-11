// ----- Imports ----- //

import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import { some } from '../../../vendor/@guardian/types/index';
import { getAllThemes, getThemeNameAsString } from 'fixtures/article';
import type { FC, ReactElement } from 'react';
import CommentCount from './';

// ----- Stories ----- //

const Default: FC = () => (
	<CommentCount
		count={some(1234)}
		theme={ArticlePillar.News}
		design={ArticleDesign.Standard}
		display={ArticleDisplay.Standard}
		commentable={true}
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
						count={some(1234)}
						theme={format.theme}
						design={ArticleDesign.DeadBlog}
						display={ArticleDisplay.Standard}
						commentable={true}
					/>
					<br />
				</div>
			))}
		</>
	);
};

Deadblogs.storyName = 'Deadblogs comment count below desktop';
Deadblogs.story = {
	parameters: {
		viewport: { defaultViewport: 'tablet' },
		chromatic: { viewports: [breakpoints.tablet] },
	},
};

// ----- Exports ----- //

export default {
	component: CommentCount,
	title: 'AR/CommentCount',
};

export { Default, Deadblogs };
