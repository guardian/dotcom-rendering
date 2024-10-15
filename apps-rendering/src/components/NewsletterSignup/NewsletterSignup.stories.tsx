// ----- Imports ----- //
import { ArticleDesign, ArticleDisplay, Pillar } from '../../articleFormat';
import { ElementKind } from 'bodyElementKind';
import NewsletterSignup from '.';

// ----- Stories ----- //

const Default = () => (
	<NewsletterSignup
		element={{
			kind: ElementKind.NewsletterSignUp,
			identityName: 'patriarchy',
			description:
				'Reviewing the most important stories on feminism and sexism and those fighting for equality',
			name: 'The Week in Patriarchy',
			frequency: 'Weekly',
			theme: Pillar.Opinion,
			successDescription:
				"We'll send you The Week in Patriarchy every week",
		}}
		format={{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
		}}
		showByDefault={true}
	/>
);

const NewsTheme = () => (
	<NewsletterSignup
		element={{
			kind: ElementKind.NewsletterSignUp,
			identityName: 'morning-briefing',
			description:
				'Archie Bland and Nimo Omer take you through the top stories and what they mean, free every weekday morning',
			name: 'First Edition',
			frequency: 'Every weekday',
			theme: Pillar.News,
			successDescription: "We'll send you First Edition every weekday",
		}}
		format={{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
		}}
		showByDefault={true}
	/>
);

// ----- Exports ----- //

export default {
	component: NewsletterSignup,
	title: 'AR/NewsletterSignup',
};

export { Default, NewsTheme };
