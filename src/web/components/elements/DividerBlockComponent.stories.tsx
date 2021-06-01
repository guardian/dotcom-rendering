import { css } from '@emotion/react';

import { DividerBlockComponent } from '@frontend/web/components/elements/DividerBlockComponent';
import { Design, Display, Pillar } from '@guardian/types';

import { TextBlockComponent } from '@root/src/web/components/elements/TextBlockComponent';

export default {
	component: DividerBlockComponent,
	title: 'Components/DividerBlockComponent',
};

const format = {
	display: Display.Standard,
	design: Design.Article,
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
Default.story = { name: 'default' };
