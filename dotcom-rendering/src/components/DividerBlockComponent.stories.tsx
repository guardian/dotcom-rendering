import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { DividerBlockComponent } from './DividerBlockComponent';
import { TextBlockComponent } from './TextBlockComponent';

export default {
	component: DividerBlockComponent,
	title: 'Components/DividerBlockComponent',
};

const format = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.News,
};

const lorem =
	"<p>I'm baby bespoke neutra austin, banjo affogato man braid cardigan kombucha ugh semiotics letterpress direct trade twee literally tofu. Tousled bitters banjo, messenger bag williamsburg farm-to-table celiac church-key pork belly. Master cleanse af snackwave occupy hashtag offal hexagon squid. Letterpress normcore hoodie, echo park edison bulb poke lyft knausgaard iceland next level fingerstache jianbing af pabst. Iceland semiotics helvetica tumeric schlitz gluten-free taiyaki air plant yuccie single-origin coffee bicycle rights typewriter</p>";

export const Default = () => {
	return (
		<div
			css={css`
				padding: 20px;
			`}
		>
			<TextBlockComponent
				html={lorem}
				format={format}
				isFirstParagraph={true}
			/>
			<DividerBlockComponent />
			<p>Partial (default)</p>
			<TextBlockComponent
				html={lorem}
				format={format}
				isFirstParagraph={false}
			/>
			<DividerBlockComponent size="full" />
			<p>Full</p>
			<TextBlockComponent
				html={lorem}
				format={format}
				isFirstParagraph={false}
			/>
		</div>
	);
};
Default.storyName = 'default';
