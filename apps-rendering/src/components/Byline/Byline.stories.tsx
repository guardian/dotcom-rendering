// ----- Imports ----- //

import {
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import { parse } from 'client/parser';
import { getAllThemes, getThemeNameAsString } from 'fixtures/article';
import Byline from './';

// ----- Setup ----- //

const parser = new DOMParser();
const parseByline = parse(parser);

const profileLink = 'https://theguardian.com';
const byline = 'Jane Smith';
const job = 'Editor of things';

const mockBylineHtml = parseByline(
	`<a href="${profileLink}">${byline}</a> ${job}`,
).toOption();

// ----- Stories ----- //

const Default = () => (
	<Byline
		theme={ArticlePillar.News}
		design={ArticleDesign.Standard}
		display={ArticleDisplay.Standard}
		bylineHtml={mockBylineHtml}
	/>
);

const Analysis = () => (
	<Byline
		theme={ArticlePillar.News}
		design={ArticleDesign.Analysis}
		display={ArticleDisplay.Standard}
		bylineHtml={mockBylineHtml}
	/>
);

const Comment = () => (
	<Byline
		theme={ArticlePillar.Opinion}
		design={ArticleDesign.Comment}
		display={ArticleDisplay.Standard}
		bylineHtml={mockBylineHtml}
	/>
);

const Labs = () => (
	<Byline
		theme={ArticleSpecial.Labs}
		design={ArticleDesign.Standard}
		display={ArticleDisplay.Standard}
		bylineHtml={mockBylineHtml}
	/>
);

const Deadblog = () => {
	return (
		<>
			{getAllThemes({
				display: ArticleDisplay.Standard,
				design: ArticleDesign.DeadBlog,
			}).map((format) => (
				<div key={format.theme}>
					<p>{getThemeNameAsString(format)}</p>
					<Byline
						theme={format.theme}
						design={ArticleDesign.DeadBlog}
						display={ArticleDisplay.Standard}
						bylineHtml={mockBylineHtml}
					/>
					<br />
				</div>
			))}
		</>
	);
};

// ----- Exports ----- //

export default {
	component: Byline,
	title: 'AR/Byline',
};

export { Default, Comment, Labs, Deadblog, Analysis };
