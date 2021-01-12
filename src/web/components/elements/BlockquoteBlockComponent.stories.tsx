import React from 'react';
import { css } from 'emotion';

import { BlockquoteBlockComponent } from '@frontend/web/components/elements/BlockquoteBlockComponent';
import { TextBlockComponent } from '@frontend/web/components/elements/TextBlockComponent';
import { Display, Design } from '@guardian/types';

const shortQuoteHtml =
	'<blockquote class="quoted"> \n <p>We’ve now got evidence</blockquote>';
const blockquoteHtml =
	'<blockquote class="quoted"> \n <p>We’ve now got evidence that under <a href="https://www.theguardian.com/politics/boris-johnson">Boris Johnson</a> the NHS is on the table and will be up for sale. He tried to cover it up in a secret agenda but today it’s been exposed.</p> \n</blockquote>';
const textHtml =
	'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesquepharetra libero nec varius feugiat. Nulla commodo sagittis erat amalesuada. Ut iaculis interdum eros, et tristique ex. In veldignissim arcu. Nulla nisi urna, laoreet a aliquam at, viverra eueros. Proin imperdiet pellentesque turpis sed luctus. Donecdignissim lacus in risus fermentum maximus eu vel justo. Duis nontortor ac elit dapibus imperdiet ut at risus. Etiam pretium, odioeget accumsan venenatis, tortor mi aliquet nisl, vel ullamcorperneque nulla vel elit. Etiam porta mauris nec sagittis luctus.</p>';

export default {
	component: BlockquoteBlockComponent,
	title: 'Components/BlockquoteComponent',
};

const SomeText = () => (
	<TextBlockComponent
		html={textHtml}
		pillar="news"
		design={Design.Article}
		display={Display.Standard}
		isFirstParagraph={false}
	/>
);

const containerStyles = css`
	max-width: 620px;
	margin: 20px;
`;

export const defaultStory = () => {
	return (
		<div className={containerStyles}>
			<SomeText />
			<BlockquoteBlockComponent html={blockquoteHtml} pillar="news" />
			<SomeText />
		</div>
	);
};
defaultStory.story = { name: 'simple' };

export const ShortStory = () => {
	return (
		<div className={containerStyles}>
			<SomeText />
			<BlockquoteBlockComponent html={shortQuoteHtml} pillar="sport" />
			<SomeText />
		</div>
	);
};
ShortStory.story = { name: 'short and simple' };

export const QuotedStory = () => {
	return (
		<div className={containerStyles}>
			<SomeText />
			<BlockquoteBlockComponent
				html={blockquoteHtml}
				pillar="culture"
				quoted={true}
			/>
			<SomeText />
		</div>
	);
};
QuotedStory.story = { name: 'quoted' };

export const ShortQuotedStory = () => {
	return (
		<div className={containerStyles}>
			<SomeText />
			<BlockquoteBlockComponent
				html={shortQuoteHtml}
				pillar="lifestyle"
				quoted={true}
			/>
			<SomeText />
		</div>
	);
};
ShortQuotedStory.story = { name: 'A short quote' };
