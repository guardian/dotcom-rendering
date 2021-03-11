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
					url="https://interactive.guim.co.uk/uploader/embed/2018/01/archive-zip/giv-3902O7VEVpcWiCO7/"
					scriptUrl="https://interactive.guim.co.uk/embed/iframe-wrapper/0.1/boot.js"
					alt="map"
					role="supporting"
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
					role="inline"
				/>
			</Figure>
			<SomeText />
			<SomeText />
		</div>
	);
};
InlineMap.story = { name: 'Inline interactive Map' };

export const Showcase = () => {
	return (
		<div
			className={css`
				padding-left: 20px;
			`}
		>
			<SomeText />
			<SomeText />
			<Figure role="showcase">
				<InteractiveBlockComponent
					url="https://interactive.guim.co.uk/embed/from-tool/photo-collage/index.html?vertical=News&opinion-tint=false&left-image=https%3A%2F%2Fmedia.gutools.co.uk%2Fimages%2F84bd48ec5962601f8550286bfb5c2093fa0a3ffe%3Fcrop%3D0_70_3500_2100&left-caption=A%20woman%20stands%20during%20a%20song%20ahead%20of%20Trump’s%20remarks%20at%20the%20King%20Jesus%20International%20Ministry%20in%20Miami.%20Photo%3A%20Tom%20Brenner%2FReuters&right-image=https%3A%2F%2Fmedia.gutools.co.uk%2Fimages%2F9eb6381555963f1dc58c637adf2f3dc08f283e58%3Fcrop%3D0_26_3000_1800&right-caption=People%20give%20thumbs%20down%20to%20media%20covering%20the%20Trump%20campaign%20event%20held%20at%20the%20King%20Jesus%20International%20Ministry.%20Photo%3A%20Joe%20Raedle%2FGetty&always-place-captions-below=false"
					scriptUrl="https://interactive.guim.co.uk/embed/iframe-wrapper/0.1/boot.js"
					alt="Photo collage"
					role="showcase"
				/>
			</Figure>
			<SomeText />
			<SomeText />
			<SomeText />
		</div>
	);
};
Showcase.story = { name: 'Showcase interactive element' };

export const NonBootJs = () => {
	return (
		<div
			className={css`
				padding-left: 250px;
			`}
		>
			<SomeText />
			<SomeText />
			<Figure role="inline">
				<InteractiveBlockComponent
					url="https://gdn-cdn.s3.amazonaws.com/quiz-builder/c65f1acf-eefd-4985-913d-74ae12eb1f35/boot.js"
					scriptUrl="https://gdn-cdn.s3.amazonaws.com/quiz-builder/c65f1acf-eefd-4985-913d-74ae12eb1f35/boot.js"
					alt="Bird Quiz"
					role="inline"
				/>
			</Figure>
			<SomeText />
			<SomeText />
			<SomeText />
		</div>
	);
};
NonBootJs.story = { name: 'Non-boot.js interactive element' };
