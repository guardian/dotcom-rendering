// ----- Imports ----- //

import {
	getAllThemes,
	getThemeNameAsString,
} from '@guardian/common-rendering/src/fixtures/article';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import type { FC } from 'react';
import HeadlineTag from './headlineTag';

// ----- Stories ----- //

const Default: FC = () => (
	<>
		{getAllThemes({
			display: ArticleDisplay.Standard,
			design: ArticleDesign.DeadBlog,
		}).map((format) => (
			<div key={format.theme}>
				<p>{getThemeNameAsString(format)}</p>
				<HeadlineTag
					tagText={'Interview'}
					format={{
						theme: format.theme,
						design: ArticleDesign.Interview,
						display: ArticleDisplay.Standard,
					}}
				/>
				<br />
			</div>
		))}
	</>
);

// ----- Exports ----- //

export default {
	component: HeadlineTag,
	title: 'AR/HeadlineTag',
};

export { Default };
