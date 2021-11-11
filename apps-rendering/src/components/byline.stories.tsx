// ----- Imports ----- //

import {
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import { toOption } from '@guardian/types';
import type { Option } from '@guardian/types';
import { text, withKnobs } from '@storybook/addon-knobs';
import { parse } from 'client/parser';
import { pipe } from 'lib';
import type { FC } from 'react';
import { selectPillar } from 'storybookHelpers';
import Byline from './byline';

// ----- Setup ----- //

const parser = new DOMParser();
const parseByline = parse(parser);

const profileLink = (): string =>
	text('Profile Link', 'https://theguardian.com');

const byline = (): string => text('Byline', 'Jane Smith');

const job = (): string => text('Job Title', 'Editor of things');

const mockBylineHtml = (): Option<DocumentFragment> =>
	pipe(
		`<a href="${profileLink()}">${byline()}</a> ${job()}`,
		parseByline,
		toOption,
	);

// ----- Stories ----- //

const Default: FC = () => (
	<Byline
		theme={selectPillar(ArticlePillar.News)}
		design={ArticleDesign.Standard}
		display={ArticleDisplay.Standard}
		bylineHtml={mockBylineHtml()}
	/>
);

const Comment: FC = () => (
	<Byline
		theme={selectPillar(ArticlePillar.Opinion)}
		design={ArticleDesign.Comment}
		display={ArticleDisplay.Standard}
		bylineHtml={mockBylineHtml()}
	/>
);

const Labs: FC = () => (
	<Byline
		theme={ArticleSpecial.Labs}
		design={ArticleDesign.Standard}
		display={ArticleDisplay.Standard}
		bylineHtml={mockBylineHtml()}
	/>
);

// ----- Exports ----- //

export default {
	component: Byline,
	title: 'AR/Byline',
	decorators: [withKnobs],
};

export { Default, Comment, Labs };
