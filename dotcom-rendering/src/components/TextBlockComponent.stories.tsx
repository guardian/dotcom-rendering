import { css } from '@emotion/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { TextBlockComponent } from './TextBlockComponent';

const html =
	'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesquepharetra libero nec varius feugiat. Nulla commodo sagittis erat amalesuada. Ut iaculis interdum eros, et tristique ex. In veldignissim arcu. Nulla nisi urna, laoreet a aliquam at, viverra eueros. Proin imperdiet pellentesque turpis sed luctus. Donecdignissim lacus in risus fermentum maximus eu vel justo. Duis nontortor ac elit dapibus imperdiet ut at risus. Etiam pretium, odioeget accumsan venenatis, tortor mi aliquet nisl, vel ullamcorperneque nulla vel elit. Etiam porta mauris nec sagittis luctus.</p>';
const quotedHtml =
	'<p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesquepharetra libero nec varius feugiat. Nulla commodo sagittis erat amalesuada. Ut iaculis interdum eros, et tristique ex. In veldignissim arcu. Nulla nisi urna, laoreet a aliquam at, viverra eueros. Proin imperdiet pellentesque turpis sed luctus. Donecdignissim lacus in risus fermentum maximus eu vel justo. Duis nontortor ac elit dapibus imperdiet ut at risus. Etiam pretium, odioeget accumsan venenatis, tortor mi aliquet nisl, vel ullamcorperneque nulla vel elit. Etiam porta mauris nec sagittis luctus.</p>';
const shortHtml =
	'Since its arrival on Netflix last month, The Queen’s Gambit has attracted a staggering <a href="https://www.theguardian.com/tv-and-radio/2020/nov/26/the-queens-gambit-netflix-most-watched-series-hit-chess">62 million</a> viewers – making it the streaming service’s most-watched scripted limited series.';
const differentWrapperTags =
	'<span><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesquepharetra libero nec varius feugiat. Nulla commodo sagittis erat amalesuada. Ut iaculis interdum eros, et tristique ex. In veldignissim arcu. Nulla nisi urna, laoreet a aliquam at, viverra eueros. Proin imperdiet pellentesque turpis sed luctus. Donecdignissim lacus in risus fermentum maximus eu vel justo. Duis nontortor ac elit dapibus imperdiet ut at risus. Etiam pretium, odioeget accumsan venenatis, tortor mi aliquet nisl, vel ullamcorperneque nulla vel elit. Etiam porta mauris nec sagittis luctus.</p></span>';
const aListHtml =
	'<ul><li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesquepharetra libero nec varius feugiat.</li><li>Nulla commodo sagittis erat amalesuada. Ut iaculis interdum eros, et tristique ex. In veldignissim arcu. Nulla nisi urna, laoreet a aliquam at, viverra eueros. Proin imperdiet pellentesque turpis sed luctus. Donecdignissim lacus in risus fermentum maximus eu vel justo. Duis nontortor ac elit dapibus imperdiet ut at risus. Etiam pretium, odioeget accumsan venenatis, tortor mi aliquet nisl, vel ullamcorperneque nulla vel elit. Etiam porta mauris nec sagittis luctus.</li></ul>';
const badMarkup =
	'<html>\n <head></head>\n <body>\n  <p>In its <a href="https://www.admiral.com/magazine/guides/home/the-jargon-free-guide-to-bicycle-insurance" title="">guide to protecting your bike</a>, the insurer Admiral cites the Kryptonite New York M18 U-lock as being good quality. It costs <a href="http://go.theguardian.com/?id=114047X1572903&amp;url=https%3A%2F%2Fwww.wiggle.co.uk%2Fkryptonite-new-york-m18-u-lock&amp;sref=https://www.theguardian.com/money/2020/jul/18/bike-theft-uk-cycle-sales-best-locks-insurance-bicycle.json?dcr" title="">£82.99 at Wiggle.co.uk</a>. Add a <a href="http://go.theguardian.com/?id=114047X1572903&amp;url=https%3A%2F%2Fwww.wiggle.co.uk%2Fkryptonite-kryptoflex-7-foot-cable-bike-lock%2F&amp;sref=https://www.theguardian.com/money/2020/jul/18/bike-theft-uk-cycle-sales-best-locks-insurance-bicycle.json?dcr" title="">cable</a> for another tenner, so you can loop it through the wheels and secure them, too.</p>\n </body>\n</html>';
const htmlWithDot =
	'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesquepharetra libero nec varius feugiat. Nulla commodo sagittis erat amalesuada. Ut iaculis interdum eros, et tristique ex. In veldignissim arcu. Nulla nisi urna, laoreet a aliquam at, viverra eueros. Proin imperdiet pellentesque turpis sed luctus. Donecdignissim lacus in risus fermentum maximus eu vel justo. Duis nontortor ac elit dapibus imperdiet ut at risus. Etiam pretium, odioeget accumsan venenatis, tortor mi aliquet nisl, vel ullamcorperneque nulla vel elit.<br><span data-dcr-style="bullet"></span> Etiam porta mauris nec sagittis luctus.</p>';
const longWords =
	'<p>Test In Mobile Modes</p><br><p>This is to test whether extremely long edge case words are wrapped when in mobile portrait. Word one: Pneumonoultramicroscopicsilicovolcanoconiosis. Word two: Hippopotomonstrosesquippedaliophobia. Word three: Pseudopseudohypoparathyroidism. Link test: https://www.theguardian.com/commentisfree/2021/mar/24/trust-britain-covid-vaccine-compromise?dcr</p>';
const startingWithLink =
	'<p><a href="https://www.pmi.com/">Philip Morris International</a> (PMI), the tobacco and vaping company behind Marlboro cigarettes, is waging a big lobbying campaign to prevent countries from cracking down on vapes and similar products as part of a global treaty, a leaked email reveals. The US federal drug regulator has told British American Tobacco’s US subsidiary to halt sales of its menthol-flavoured Vuse Alto vape, the most popular e-cigarette in the US, following a jump in popularity of the product among underage users. Annual sales at Boots, Britain’s biggest high street chemist, grew strongly last year, boosted by demand for skincare products and its essentials range, amid upheaval at its US parent company and uncertainty over its future ownership. </p>';
const autoLinkTag =
	'<p>That <a href="/culture/kerry-washington" data-link-name="in body link" data-component="auto-linked-tag">Kerry Washington</a> comes from a seemingly perfect family is something to which I thought I could attest. Four years ago, on an icily grey day in New York City, I met the actor after watching her gut-wrenching performance on Broadway in the play American Son. I sat on a sofa on the vacated stage, in deep conversation with Washington’s parents, Earl and Valerie: she a professor, he a businessman, who had raised their daughter in a hard-working, predominantly black neighbourhood in the Bronx. I remember thinking how good-looking, charming and erudite they seemed. And Washington – gracious and gorgeous in real life – made so much sense as their offspring.</p>';
const nestedParagraphs =
	'<p>This little piggy went to market' +
	'<p>This little piggy stayed home</p>' +
	'<p>This little piggy had roast beef</p>' +
	'<p>And this little piggy had none</p>' +
	'<p>And this little piggy cried wee wee wee all the way home</p>' +
	'<p>Wee wee wee cried this little piggy</p>' +
	'<p>Wee wee wee cried this little piggy</p>' +
	'<p>Wee wee wee cried this little piggy</p>' +
	'<p>All the way home</p>' +
	'<p>This little piggy went to market</p>' +
	'<p>This little piggy stayed home</p>' +
	'<p>This little piggy had roast beef</p>' +
	'<p>And this little piggy had none</p>' +
	'<p>And this little piggy cried wee wee wee all the way home</p>' +
	'<p>Wee wee wee cried this little piggy</p>' +
	'<p>Wee wee wee cried this little piggy</p>' +
	'<p>Wee wee wee cried this little piggy</p>' +
	'<p>All the way home</p></p>';
const wigglyStrong =
	'<p>The YouTube clip I return to most often is David Bowie being interviewed by Jeremy Paxman on Newsnight in 1999. Bowie is talking about what the internet might do: “I don’t think we’ve even seen the tip of the iceberg. I<strong> </strong>think that the potential of what the internet is going to do to society, both good and bad, is unimaginable. I think we’re on the cusp of something exhilarating and terrifying.”</p>';

const containerStyles = css`
	max-width: 620px;
	margin: 20px;
`;

export default {
	component: TextBlockComponent,
	title: 'Components/TextBlockComponent',
};

export const defaultStory = () => {
	return (
		<div css={containerStyles}>
			<TextBlockComponent
				html={html}
				format={{
					theme: Pillar.News,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				isFirstParagraph={false}
			/>
		</div>
	);
};
defaultStory.storyName = 'default';

export const DropCap = () => {
	return (
		<div css={containerStyles}>
			<TextBlockComponent
				html={html}
				forceDropCap="on"
				format={{
					theme: Pillar.Culture,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Immersive,
				}}
				isFirstParagraph={false}
			/>
		</div>
	);
};
DropCap.storyName = 'with drop cap';
DropCap.decorators = [
	splitTheme([
		{
			theme: Pillar.Culture,
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Immersive,
		},
	]),
];

export const QuotedDropCap = () => {
	return (
		<div css={containerStyles}>
			<TextBlockComponent
				html={quotedHtml}
				format={{
					theme: Pillar.Opinion,
					design: ArticleDesign.Comment,
					display: ArticleDisplay.Standard,
				}}
				isFirstParagraph={true}
			/>
		</div>
	);
};
QuotedDropCap.storyName = 'with quoted drop cap';
QuotedDropCap.decorators = [
	splitTheme([
		{
			theme: Pillar.Opinion,
			design: ArticleDesign.Comment,
			display: ArticleDisplay.Standard,
		},
	]),
];

export const ShortText = () => {
	return (
		<div css={containerStyles}>
			<TextBlockComponent
				html={shortHtml}
				forceDropCap="on"
				format={{
					theme: Pillar.News,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				isFirstParagraph={false}
			/>
		</div>
	);
};
ShortText.storyName = 'with text less than 200 characters';
ShortText.decorators = [
	splitTheme([
		{
			theme: Pillar.News,
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
		},
	]),
];

export const NoTags = () => {
	return (
		<div css={containerStyles}>
			<TextBlockComponent
				html={differentWrapperTags}
				forceDropCap="on"
				format={{
					theme: Pillar.News,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				isFirstParagraph={false}
			/>
		</div>
	);
};
NoTags.storyName = 'with no p tags';
NoTags.decorators = [
	splitTheme([
		{
			theme: Pillar.News,
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
		},
	]),
];

export const FeatureDropCap = () => {
	return (
		<div css={containerStyles}>
			<TextBlockComponent
				html={html}
				format={{
					theme: Pillar.Culture,
					design: ArticleDesign.Feature,
					display: ArticleDisplay.Standard,
				}}
				isFirstParagraph={true}
			/>
		</div>
	);
};
FeatureDropCap.storyName = 'with design of Feature';
FeatureDropCap.decorators = [
	splitTheme([
		{
			theme: Pillar.Culture,
			design: ArticleDesign.Feature,
			display: ArticleDisplay.Standard,
		},
	]),
];

export const AList = () => {
	return (
		<div css={containerStyles}>
			<TextBlockComponent
				html={aListHtml}
				forceDropCap="on"
				format={{
					theme: Pillar.News,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				isFirstParagraph={false}
			/>
		</div>
	);
};
AList.storyName = 'with a list';

export const BadMarkup = () => {
	return (
		<div css={containerStyles}>
			<TextBlockComponent
				html={badMarkup}
				format={{
					theme: Pillar.News,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				isFirstParagraph={false}
			/>
		</div>
	);
};
BadMarkup.storyName = 'with a bad markup';

export const SubSupscript = () => {
	return (
		<div css={containerStyles}>
			<TextBlockComponent
				html="<p><strong>P<sub>kj</sub> = (1-r<sub>j</sub>)C<sup>kj</sup> + r<sub>j</sub>(C<sub>kj</sub> + q<sub>kj</sub> - p<sub>kj</sub>)</strong></p><p><var>a<sup>2</sup></var> + <var>b<sup>2</sup></var> = <var>c<sup>2</sup></var></p>"
				format={{
					theme: Pillar.News,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				isFirstParagraph={false}
			/>
		</div>
	);
};
SubSupscript.storyName = 'with a sub and sup';

export const dotStory = () => {
	return (
		<div css={containerStyles}>
			<TextBlockComponent
				html={htmlWithDot}
				format={{
					theme: Pillar.News,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				isFirstParagraph={false}
			/>
		</div>
	);
};
dotStory.storyName = 'With Dot';

export const longWordStory = () => {
	return (
		<div css={containerStyles}>
			<TextBlockComponent
				html={longWords}
				format={{
					theme: Pillar.News,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				isFirstParagraph={false}
			/>
		</div>
	);
};
longWordStory.storyName = 'Long Words';

export const startingWithLinkStory = () => {
	return (
		<div css={containerStyles}>
			<TextBlockComponent
				html={startingWithLink}
				format={{
					theme: Pillar.Culture,
					design: ArticleDesign.Feature,
					display: ArticleDisplay.Immersive,
				}}
				isFirstParagraph={true}
			/>
		</div>
	);
};
startingWithLinkStory.storyName = 'Starting With Link';

export const autoLinkStory = () => {
	return (
		<div css={containerStyles}>
			<TextBlockComponent
				html={autoLinkTag}
				format={{
					theme: Pillar.Culture,
					design: ArticleDesign.Feature,
					display: ArticleDisplay.Immersive,
				}}
				isFirstParagraph={true}
			/>
		</div>
	);
};
autoLinkStory.storyName = 'Automatic hyperlink near the start';
autoLinkStory.decorators = [
	splitTheme([
		{
			theme: Pillar.Culture,
			design: ArticleDesign.Feature,
			display: ArticleDisplay.Immersive,
		},
	]),
];

export const nestedParagraphsStory = () => {
	return (
		<div css={containerStyles}>
			<TextBlockComponent
				html={nestedParagraphs}
				format={{
					theme: Pillar.Culture,
					design: ArticleDesign.Feature,
					display: ArticleDisplay.Immersive,
				}}
				isFirstParagraph={true}
			/>
		</div>
	);
};
nestedParagraphsStory.storyName = 'Nested paragraphs';
nestedParagraphsStory.decorators = [
	splitTheme([
		{
			theme: Pillar.Culture,
			design: ArticleDesign.Feature,
			display: ArticleDisplay.Immersive,
		},
	]),
];

export const InvisibleStrong = () => {
	return (
		<div css={containerStyles}>
			<TextBlockComponent
				html={wigglyStrong}
				format={{
					theme: Pillar.Culture,
					design: ArticleDesign.Feature,
					display: ArticleDisplay.Immersive,
				}}
				isFirstParagraph={true}
			/>
		</div>
	);
};
InvisibleStrong.storyName = 'Invisible Strong';
InvisibleStrong.decorators = [
	splitTheme([
		{
			theme: Pillar.Culture,
			design: ArticleDesign.Feature,
			display: ArticleDisplay.Immersive,
		},
	]),
];
