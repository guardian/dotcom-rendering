// ----- Imports ----- //
import { Newsletter } from '@guardian/apps-rendering-api-models/newsletter';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import type { FC } from 'react';
import NewsletterSignUpPageForm from './';

const newsletter: Newsletter = {
	identityName: 'patriarchy',
	description:
		'Reviewing the most important stories on feminism and sexism and those fighting for equality',
	name: 'The Week in Patriarchy',
	frequency: 'Weekly',
	successDescription: 'You have signed up, but the newsletter is fake',
	theme: 'opinion',
};

// ----- Stories ----- //

const Default: FC = () => (
	<div>
		<NewsletterSignUpPageForm
			format={{
				design: ArticleDesign.NewsletterSignup,
				theme: ArticlePillar.News,
				display: ArticleDisplay.Standard,
			}}
			newsletter={newsletter}
		/>
	</div>
);

// ----- Exports ----- //

export default {
	component: NewsletterSignUpPageForm,
	title: 'AR/NewsletterSignUpPageForm',
};

export { Default };
