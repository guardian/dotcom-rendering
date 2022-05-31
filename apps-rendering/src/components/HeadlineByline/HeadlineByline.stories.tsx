// ----- Imports ----- //
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import type { Option } from '@guardian/types';
import { toOption } from '@guardian/types';
import { parse } from 'client/parser';
import { pipe } from 'lib';
import type { FC } from 'react';
import HeadlineByline from './';

// ----- Setup ----- //

const parser = new DOMParser();
const parseByline = parse(parser);

const mockBylineHtml = (): Option<DocumentFragment> =>
	pipe(
		`<a href="https://www.theguardian.com/profile/leah-harper">Leah Harper</a>`,
		parseByline,
		toOption,
	);

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
