import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { SubheadingBlockComponent } from './SubheadingBlockComponent';

const defaultFormat = {
	design: ArticleDesign.Obituary,
	display: ArticleDisplay.Standard,
	theme: Pillar.News,
};

export default {
	component: SubheadingBlockComponent,
	title: 'Components/SubheadingBlockComponent',
	render: (args: React.ComponentProps<typeof SubheadingBlockComponent>) => (
		<div
			css={css`
				margin: 10px;
			`}
		>
			<SubheadingBlockComponent {...args} />
		</div>
	),
	args: {
		html: '<h2>Subheading</h2>',
		format: defaultFormat,
	},
};

export const Subheading = {
	args: { html: '<h2>Subheading</h2>' },
	parameters: { chromatic: { disable: true } },
};

export const SubheadingWithAnchor = {
	args: { html: '<h2>Subheading <a href="/">with anchor</a></h2>' },
	parameters: { chromatic: { disable: true } },
};

export const SubheadingWithHTMLComment = {
	args: { html: '<h2>Subheading<!-- HTML comment--></h2>' },
	parameters: { chromatic: { disable: true } },
};

export const SubheadingWithoutHTML = {
	args: { html: 'Subheading text only' },
	parameters: { chromatic: { disable: true } },
};

/** This is the only component that will get snapshotted in Chromatic */
export const SubheadingSnapshot = () => (
	<div
		css={css`
			margin: 10px;
			h2 {
				margin-bottom: 10px;
			}
		`}
	>
		<SubheadingBlockComponent
			format={defaultFormat}
			html="<h2>Basic subheading</h2>"
		/>
		<SubheadingBlockComponent
			format={defaultFormat}
			html="<h2>Subheading <a href='/'>with anchor</a></h2>"
		/>
		<SubheadingBlockComponent
			format={defaultFormat}
			html="<h2>Subheading with HTML comment<!-- HTML comment--></h2>"
		/>
		<SubheadingBlockComponent
			format={defaultFormat}
			html="Subheading text only (no HTML)"
		/>
	</div>
);
