// ----- Imports ----- //
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import type { Option } from '@guardian/types';
import { toOption } from '@guardian/types';
import { text } from '@storybook/addon-knobs';
import { parse } from 'client/parser';
import { pipe } from 'lib';
import type { FC } from 'react';
import HeadlineByline from './headlineByline';

// ----- Setup ----- //

const parser = new DOMParser();
const parseByline = parse(parser);

const profileLink = (): string =>
	text('Profile Link', 'https://theguardian.com');

const byline = (): string => text('Byline', 'Jane Smith');

const mockBylineHtml = (): Option<DocumentFragment> =>
	pipe(`<a href="${profileLink()}">${byline()}</a>`, parseByline, toOption);

// ----- Stories ----- //

const Default: FC = () => (
	<HeadlineByline
		format={{
			theme: ArticlePillar.News,
			design: ArticleDesign.Interview,
			display: ArticleDisplay.Standard,
		}}
		bylineHtml={mockBylineHtml()}
	/>
);

// ----- Exports ----- //

export default {
	component: HeadlineByline,
	title: 'AR/HeadlineByline',
};

export { Default };
