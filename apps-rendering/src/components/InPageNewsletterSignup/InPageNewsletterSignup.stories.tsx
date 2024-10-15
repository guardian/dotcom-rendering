// ----- Imports ----- //
import { ArticleDesign, ArticleDisplay, Pillar } from '../../articleFormat';
import InPageNewsletterSignup from '.';

// ---- Constants ---- //
const TEST_NEWSLETTER = {
	identityName: 'patriarchy',
	description:
		'Reviewing the most important stories on feminism and sexism and those fighting for equality',
	name: 'The Week in Patriarchy',
	frequency: 'Weekly',
	theme: 'opinion',
	successDescription: "We'll send you The Week in Patriarchy every week",
};

// ----- Stories ----- //

const Default = () => (
	<>
		<style>
			{`.js-signup-form-container {
			display:block !important;
		}`}
		</style>
		<InPageNewsletterSignup
			newsletter={TEST_NEWSLETTER}
			format={{
				design: ArticleDesign.NewsletterSignup,
				display: ArticleDisplay.Standard,
				theme: Pillar.News,
			}}
		/>
	</>
);

const Unsupported = () => (
	<>
		<style>
			{`.js-signup-form-fallback-container {
			display:block !important;
		}`}
		</style>
		<InPageNewsletterSignup
			newsletter={TEST_NEWSLETTER}
			format={{
				design: ArticleDesign.NewsletterSignup,
				display: ArticleDisplay.Standard,
				theme: Pillar.News,
			}}
		/>
	</>
);

// ----- Exports ----- //

export default {
	component: InPageNewsletterSignup,
	title: 'AR/InPageNewsletterSignup',
};

export { Default, Unsupported };
