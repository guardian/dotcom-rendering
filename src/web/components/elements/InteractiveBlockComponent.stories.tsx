/* eslint-disable jsx-a11y/aria-role */
import React from 'react';
import { css } from 'emotion';

import { InteractiveBlockComponent } from '@frontend/web/components/elements/InteractiveBlockComponent';
import { Figure } from '@frontend/web/components/Figure';
import { TextBlockComponent } from '@frontend/web/components/elements/TextBlockComponent';
import { Pillar, Design, Display } from '@guardian/types';

export default {
	component: InteractiveBlockComponent,
	title: 'Components/InteractiveBlockComponent',
};
const textHtml =
	'<p>US and British intelligence agencies have successfully cracked much of the online encryption relied upon by hundreds of millions of people to protect the privacy of their personal data, online transactions and emails, according to top-secret documents revealed by former contractor Edward Snowden.</p>';

const SomeText = () => (
	<TextBlockComponent
		html={textHtml}
		format={{
			theme: Pillar.News,
			design: Design.Article,
			display: Display.Standard,
		}}
		isFirstParagraph={false}
	/>
);

export const Default = () => {
	return (
		<div
			className={css`
				padding-left: 250px;
			`}
		>
			<SomeText />
			<SomeText />
			<Figure role="supporting">
				<InteractiveBlockComponent
					url="https://interactive.guim.co.uk/embed/article-embeds/docs-4%C3%973-card/embed.html"
					scriptUrl="https://interactive.guim.co.uk/embed/iframe-wrapper/0.1/boot.js"
					alt="Watch Gun Nation"
				/>
			</Figure>
			<SomeText />
			<SomeText />
			<SomeText />
		</div>
	);
};
Default.story = { name: 'default' };

export const InlineMap = () => {
	return (
		<div
			className={css`
				padding-left: 20px;
			`}
		>
			<SomeText />
			<SomeText />
			<Figure role="inline">
				<InteractiveBlockComponent
					url="https://interactive.guim.co.uk/uploader/embed/2020/11/nagorno_karabakh_map/giv-3902efc3KhF4zInV/"
					scriptUrl="https://interactive.guim.co.uk/embed/iframe-wrapper/0.1/boot.js"
					alt="The agreement mediated by Russia in Nagorno-Karabakh"
				/>
			</Figure>
			<SomeText />
			<SomeText />
		</div>
	);
};
InlineMap.story = { name: 'Inline interactive Map' };
