// ----- Imports ----- //

import {
	getAllThemes,
	getThemeNameAsString,
} from '@guardian/common-rendering/src/fixtures/article';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import type { FC } from 'react';
import DesignTag from './';

// ----- Stories ----- //

const Default: FC = () => (
	<>
		{getAllThemes({
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Interview,
		}).map((format) => (
			<div key={format.theme}>
				<p>{getThemeNameAsString(format)}</p>
				<DesignTag format={format} />
				<br />
			</div>
		))}
	</>
);

// ----- Exports ----- //

export default {
	component: DesignTag,
	title: 'AR/DesignTag',
};

export { Default };
