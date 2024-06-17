// ----- Imports ----- //

import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { getAllThemes, getThemeNameAsString } from 'fixtures/article';
import Anchor from './';

// ----- Setup ----- //

const link = 'https://theguardian.com';
const copy = '“everything that was recommended was done”.';

// ----- Stories ----- //

const Default = () => (
	<Anchor
		format={{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: ArticlePillar.News,
		}}
		href={link}
	>
		{copy}
	</Anchor>
);

const Liveblock = () => {
	return (
		<>
			{getAllThemes({
				display: ArticleDisplay.Standard,
				design: ArticleDesign.DeadBlog,
			}).map((format) => (
				<div key={format.theme}>
					<p>{getThemeNameAsString(format)}</p>
					<Anchor
						format={{
							design: ArticleDesign.DeadBlog,
							display: ArticleDisplay.Standard,
							theme: format.theme,
						}}
						href={link}
					>
						{copy}
					</Anchor>
					<br />
					<br />
				</div>
			))}
		</>
	);
};

// ----- Exports ----- //

export default {
	component: Anchor,
	title: 'AR/Anchor',
};

export { Default, Liveblock };
