// ----- Imports ----- //

import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import { getAllThemes, getThemeNameAsString } from 'fixtures/article';
import DesignTag from './';

// ----- Stories ----- //

const Default = () => (
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
