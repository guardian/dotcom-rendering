import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { article17 } from '@guardian/source/foundations';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { DropCap } from './DropCap';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			width: 620px;
			padding: 20px;

			p {
				${article17};
			}
		`}
	>
		{children}
	</div>
);

const render = ({
	format,
	firstSentence,
}: {
	format: ArticleFormat;
	firstSentence: string;
}) => {
	if (!firstSentence[0]) return;

	const dropCapIdx = firstSentence.search(/\w/g) + 1;

	return (
		<Wrapper>
			<p>
				<DropCap
					letter={firstSentence.slice(0, dropCapIdx)}
					format={format}
				/>
				{firstSentence.slice(dropCapIdx)} Lorem ipsum dolor sit amet,
				consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua. Ut enim ad minim veniam, quis
				nostrud exercitation ullamco laboris nisi ut aliquip ex ea
				commodo consequat. Duis aute irure dolor in reprehenderit in
				voluptate velit esse cillum dolore eu fugiat nulla pariatur.
				Excepteur sint occaecat cupidatat non proident, sunt in culpa
				qui officia deserunt mollit anim id est laborum.
			</p>
		</Wrapper>
	);
};

const decorators = [
	splitTheme([
		{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
		},
		{
			design: ArticleDesign.Editorial,
			display: ArticleDisplay.Standard,
			theme: Pillar.Opinion,
		},
		{
			design: ArticleDesign.Feature,
			display: ArticleDisplay.Standard,
			theme: Pillar.Culture,
		},
		{
			design: ArticleDesign.PhotoEssay,
			display: ArticleDisplay.Standard,
			theme: Pillar.Sport,
		},
		{
			design: ArticleDesign.Interview,
			display: ArticleDisplay.Standard,
			theme: Pillar.Lifestyle,
		},
		{
			design: ArticleDesign.Comment,
			display: ArticleDisplay.Standard,
			theme: Pillar.Sport,
		},
		{
			design: ArticleDesign.Interview,
			display: ArticleDisplay.Standard,
			theme: Pillar.Culture,
		},
	]),
];

const meta = {
	component: DropCap,
	title: 'Components/DropCap',
	render,
	decorators,
};
export default meta;

export const DropCapWithT = {
	name: 'with a T',
	args: { firstSentence: 'There once was a dropcap.' },
};

export const DropCapWithA = {
	name: 'with an A',
	args: { firstSentence: 'A long time ago there was a dropcap' },
};

export const DropCapWithL = {
	name: 'with an L',
	args: { firstSentence: 'Long ago there was a dropcap' },
};

export const DropCapWithO = {
	name: 'with an O',
	args: { firstSentence: 'Once upon a time there was a dropcap' },
};

export const DropCapWithQuote = {
	name: 'with a quote',
	args: { firstSentence: '"Once upon a time there was a dropcap".' },
};
