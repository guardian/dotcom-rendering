import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import type { StoryObj } from '@storybook/react';
import type { StoryProps } from '../../.storybook/decorators/splitThemeDecorator';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { InteractiveBlockComponent } from './InteractiveBlockComponent.importable';
import { TextBlockComponent } from './TextBlockComponent';

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
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
		}}
		isFirstParagraph={false}
	/>
);

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			padding-left: 250px;
			padding-right: 20px;
		`}
	>
		{children}
	</div>
);

const defaultFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.News,
};

export const Default = ({ format }: StoryProps) => {
	return (
		<Wrapper>
			<SomeText />
			<SomeText />
			<InteractiveBlockComponent
				url="https://interactive.guim.co.uk/uploader/embed/2018/01/archive-zip/giv-3902O7VEVpcWiCO7/"
				scriptUrl="https://interactive.guim.co.uk/embed/iframe-wrapper/0.1/boot.js"
				alt="map"
				role="supporting"
				format={format}
				isMainMedia={false}
			/>
			<SomeText />
			<SomeText />
			<SomeText />
		</Wrapper>
	);
};
Default.storyName = 'default';
Default.decorators = [splitTheme([defaultFormat], { orientation: 'vertical' })];

export const InlineMap = ({ format }: StoryProps) => {
	return (
		<Wrapper>
			<SomeText />
			<SomeText />
			<InteractiveBlockComponent
				url="https://interactive.guim.co.uk/uploader/embed/2020/11/nagorno_karabakh_map/giv-3902efc3KhF4zInV/"
				scriptUrl="https://interactive.guim.co.uk/embed/iframe-wrapper/0.1/boot.js"
				alt="The agreement mediated by Russia in Nagorno-Karabakh"
				role="inline"
				format={format}
				isMainMedia={false}
			/>
			<SomeText />
			<SomeText />
		</Wrapper>
	);
};
InlineMap.storyName = 'Inline interactive Map';
InlineMap.decorators = [
	splitTheme([defaultFormat], { orientation: 'vertical' }),
];

export const Showcase = ({ format }: StoryProps) => {
	return (
		<Wrapper>
			<SomeText />
			<SomeText />
			<InteractiveBlockComponent
				url="https://interactive.guim.co.uk/embed/from-tool/photo-collage/index.html?vertical=News&opinion-tint=false&left-image=https%3A%2F%2Fmedia.gutools.co.uk%2Fimages%2F84bd48ec5962601f8550286bfb5c2093fa0a3ffe%3Fcrop%3D0_70_3500_2100&left-caption=A%20woman%20stands%20during%20a%20song%20ahead%20of%20Trump’s%20remarks%20at%20the%20King%20Jesus%20International%20Ministry%20in%20Miami.%20Photo%3A%20Tom%20Brenner%2FReuters&right-image=https%3A%2F%2Fmedia.gutools.co.uk%2Fimages%2F9eb6381555963f1dc58c637adf2f3dc08f283e58%3Fcrop%3D0_26_3000_1800&right-caption=People%20give%20thumbs%20down%20to%20media%20covering%20the%20Trump%20campaign%20event%20held%20at%20the%20King%20Jesus%20International%20Ministry.%20Photo%3A%20Joe%20Raedle%2FGetty&always-place-captions-below=false"
				scriptUrl="https://interactive.guim.co.uk/embed/iframe-wrapper/0.1/boot.js"
				alt="Photo collage"
				role="showcase"
				format={format}
				isMainMedia={false}
			/>
			<SomeText />
			<SomeText />
			<SomeText />
		</Wrapper>
	);
};
Showcase.storyName = 'Showcase interactive element';
Showcase.decorators = [
	splitTheme([defaultFormat], { orientation: 'vertical' }),
];

export const WithCaption = ({ format }: StoryProps) => {
	return (
		<Wrapper>
			<SomeText />
			<SomeText />
			<InteractiveBlockComponent
				url="https://interactive.guim.co.uk/uploader/embed/2020/11/nagorno_karabakh_map/giv-3902efc3KhF4zInV/"
				scriptUrl="https://interactive.guim.co.uk/embed/iframe-wrapper/0.1/boot.js"
				alt="The agreement mediated by Russia in Nagorno-Karabakh"
				role="inline"
				caption="There’s (normally) such a lovely atmosphere on this tee. A par start and you are happy. You don’t want to hit it right, with the bunker and worse out there. The ideal shot is a little fade off the left side with a driver. You have more chance with your second shot if missing it left. The second shot is a case of ‘don’t go long.’ It’s a common theme about not short-siding yourself at Augusta but it probably applies more at the 1st than elsewhere. Hit to the heart of the green and try to two putt. A couple of the back pins are OK but you can have swinging putts to the front ones."
				format={format}
				isMainMedia={false}
			/>
			<SomeText />
			<SomeText />
			<SomeText />
		</Wrapper>
	);
};
WithCaption.storyName = 'with caption';
WithCaption.decorators = [
	splitTheme([defaultFormat], { orientation: 'vertical' }),
];

export const NonBootJs: StoryObj = ({ format }: StoryProps) => {
	return (
		<Wrapper>
			<SomeText />
			<SomeText />
			<InteractiveBlockComponent
				url="https://gdn-cdn.s3.amazonaws.com/quiz-builder/c65f1acf-eefd-4985-913d-74ae12eb1f35/boot.js"
				scriptUrl="https://gdn-cdn.s3.amazonaws.com/quiz-builder/c65f1acf-eefd-4985-913d-74ae12eb1f35/boot.js"
				alt="Bird Quiz"
				role="inline"
				format={format}
				isMainMedia={false}
			/>
			<SomeText />
			<SomeText />
			<SomeText />
		</Wrapper>
	);
};
NonBootJs.storyName = 'Non-boot.js interactive element';
NonBootJs.decorators = [
	splitTheme([defaultFormat], { orientation: 'vertical' }),
];
