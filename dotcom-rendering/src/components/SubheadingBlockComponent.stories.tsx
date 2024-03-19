import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { textSans } from '@guardian/source-foundations';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { SubheadingBlockComponent } from './SubheadingBlockComponent';

const defaultFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: Pillar.News,
};

const StoryWrapper = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			span {
				${textSans.medium({ fontStyle: 'italic' })};
				margin-bottom: 4px;
			}
			hr {
				border: 0.5px dashed;
			}
			margin: 10px;

			* {
				margin-bottom: 10px;
			}
		`}
	>
		{children}
	</div>
);

export default {
	component: SubheadingBlockComponent,
	title: 'Components/SubheadingBlockComponent',
	render: (args: React.ComponentProps<typeof SubheadingBlockComponent>) => {
		const standardFormat = {
			...args.format,
			display: ArticleDisplay.Standard,
		};
		const immersiveFormat = {
			...args.format,
			display: ArticleDisplay.Immersive,
		};
		return (
			<>
				<StoryWrapper>
					<span>Standard</span>
					<SubheadingBlockComponent
						format={standardFormat}
						html="<h2>Basic subheading</h2>"
					/>
					<SubheadingBlockComponent
						format={standardFormat}
						html="<h2>Subheading <a href='/'>with anchor</a></h2>"
					/>
					<SubheadingBlockComponent
						format={standardFormat}
						html="<h2>Subheading with HTML comment<!-- HTML comment--></h2>"
					/>
					<SubheadingBlockComponent
						format={standardFormat}
						html="Subheading text only (no HTML)"
					/>
					<hr />

					<span>Immersive</span>
					<SubheadingBlockComponent
						format={immersiveFormat}
						html="<h2>Basic subheading</h2>"
					/>
					<SubheadingBlockComponent
						format={immersiveFormat}
						html="<h2>Subheading <a href='/'>with anchor</a></h2>"
					/>
					<SubheadingBlockComponent
						format={immersiveFormat}
						html="<h2>Subheading with HTML comment<!-- HTML comment--></h2>"
					/>
					<SubheadingBlockComponent
						format={immersiveFormat}
						html="Subheading text only (no HTML)"
					/>
					<hr />
				</StoryWrapper>
			</>
		);
	},
	args: {
		html: '<h2>Subheading</h2>',
		format: defaultFormat,
	},
};

export const NewsStandard = {
	decorators: [splitTheme([defaultFormat])],
};

const newsObituaryFormat = {
	...defaultFormat,
	design: ArticleDesign.Obituary,
};
export const NewsObituary = {
	args: { format: newsObituaryFormat },
	decorators: [splitTheme([newsObituaryFormat])],
};

const opinionCommentFormat = {
	...defaultFormat,
	theme: Pillar.Opinion,
	design: ArticleDesign.Comment,
};
export const OpinionComment = {
	args: { format: opinionCommentFormat },
	decorators: [splitTheme([opinionCommentFormat])],
};
