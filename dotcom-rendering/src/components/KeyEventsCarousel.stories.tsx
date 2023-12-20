import { css } from '@emotion/react';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import { from } from '@guardian/source-foundations';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import {
	LongKeyEvents,
	ShortKeyEvents,
	SingleKeyEvent,
} from '../../fixtures/manual/live-blog-key-events';
import { palette } from '../palette';
import { KeyEventsCarousel } from './KeyEventsCarousel.importable';

const standardFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.LiveBlog,
	theme: Pillar.News,
};
const liveBlogFormats: [ArticleFormat, ...ArticleFormat[]] = [
	{ ...standardFormat, theme: Pillar.News },
	{ ...standardFormat, theme: Pillar.Sport },
	{ ...standardFormat, theme: Pillar.Opinion },
	{ ...standardFormat, theme: Pillar.Culture },
	{ ...standardFormat, theme: Pillar.Lifestyle },
	{ ...standardFormat, theme: ArticleSpecial.Labs },
];

const Wrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			css={css`
				padding-left: 20px;
				background-color: ${palette('--key-event-background')};

				${from.desktop} {
					background-color: ${palette(
						'--key-event-background-desktop',
					)};
				}
				position: relative;
				max-width: 700px;
				${from.tablet} {
					width: 700px;
				}
			`}
		>
			{children}
		</div>
	);
};

export default {
	component: KeyEventsCarousel,
	title: 'Components/KeyEventsCarousel',
};

export const SingleKeyEventCarousel = () => {
	return (
		<Wrapper>
			<KeyEventsCarousel
				keyEvents={SingleKeyEvent}
				filterKeyEvents={false}
				id="key-events-carousel-desktop"
			/>
		</Wrapper>
	);
};
SingleKeyEventCarousel.storyName = 'Single Key Event Carousel';
SingleKeyEventCarousel.decorators = [splitTheme(liveBlogFormats)];
export const ShortKeyEventCarousel = () => {
	return (
		<Wrapper>
			<KeyEventsCarousel
				keyEvents={ShortKeyEvents}
				filterKeyEvents={false}
				id="key-events-carousel-desktop"
			/>
		</Wrapper>
	);
};
ShortKeyEventCarousel.storyName = 'Short Key Event Carousel';
ShortKeyEventCarousel.decorators = [splitTheme(liveBlogFormats)];
export const LongKeyEventCarousel = () => {
	return (
		<Wrapper>
			<KeyEventsCarousel
				keyEvents={LongKeyEvents}
				filterKeyEvents={false}
				id="key-events-carousel-desktop"
			/>
		</Wrapper>
	);
};
LongKeyEventCarousel.storyName = 'Long Key Event Carousel';
LongKeyEventCarousel.decorators = [splitTheme(liveBlogFormats)];
