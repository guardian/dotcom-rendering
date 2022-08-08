// ----- Imports ----- //
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { ElementKind } from 'bodyElementKind';

import type { FC } from 'react';
import { selectDesign, selectPillar } from 'storybookHelpers';
import NewsletterSignupForm from './';

// ----- Stories ----- //

const Default: FC = () => (
	<NewsletterSignupForm
		element={{
			kind: ElementKind.NewsletterSignUp,
			newsletter: {
				id: 'patriarchy',
				description:
					'Reviewing the most important stories on feminism and sexism and those fighting for equality',
				displayName: 'The Week in Patriarchy',
				frequency: 'Weekly',
				theme: 'opinion',
				group: 'opinion'
			},
		}}
		format={{
			design: selectDesign(ArticleDesign.Standard),
			display: ArticleDisplay.Standard,
			theme: selectPillar(ArticlePillar.News),
		}}
	/>
);

const NewsTheme: FC = () => (
	<NewsletterSignupForm
		element={{
			kind: ElementKind.NewsletterSignUp,
			newsletter: {
				id: 'monring-briefing',
				description:
					'Archie Bland and Nimo Omer take you through the top stories and what they mean, free every weekday morning',
				displayName: 'First Edition',
				frequency: 'Every weekday',
				theme: 'news',
				group: 'News'
			},
		}}
		format={{
			design: selectDesign(ArticleDesign.Standard),
			display: ArticleDisplay.Standard,
			theme: selectPillar(ArticlePillar.News),
		}}
	/>
);

// ----- Exports ----- //

export default {
	component: NewsletterSignupForm,
	title: 'AR/NewsletterSignupForm',
};

export { Default, NewsTheme };
