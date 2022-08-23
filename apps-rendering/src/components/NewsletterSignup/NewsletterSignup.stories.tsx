// ----- Imports ----- //
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { ElementKind } from 'bodyElementKind';
import type { FC } from 'react';
import { selectDesign, selectPillar } from 'storybookHelpers';
import NewsletterSignup from '.';

// ----- Stories ----- //

const Default: FC = () => (
	<NewsletterSignup
		element={{
			kind: ElementKind.NewsletterSignUp,
			identityName: 'patriarchy',
			description:
				'Reviewing the most important stories on feminism and sexism and those fighting for equality',
			name: 'The Week in Patriarchy',
			frequency: 'Weekly',
			theme: ArticlePillar.Opinion,
			successDescription: 'We\'ll send you The Week in Patriarchy every week',
		}}
		format={{
			design: selectDesign(ArticleDesign.Standard),
			display: ArticleDisplay.Standard,
			theme: selectPillar(ArticlePillar.News),
		}}
	/>
);

const NewsTheme: FC = () => (
	<NewsletterSignup
		element={{
			kind: ElementKind.NewsletterSignUp,
			identityName: 'monring-briefing',
			description:
				'Archie Bland and Nimo Omer take you through the top stories and what they mean, free every weekday morning',
			name: 'First Edition',
			frequency: 'Every weekday',
			theme: ArticlePillar.News,
			successDescription: 'We\'ll send you first edition every weekday',
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
	component: NewsletterSignup,
	title: 'AR/NewsletterSignup',
};

export { Default, NewsTheme };
