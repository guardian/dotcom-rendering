import { NewsletterSignupForm } from './NewsletterSignupForm';

export default {
	component: NewsletterSignupForm,
	title: 'Components/NewsletterSignupForm',
};

export const Default = () => {
	return <NewsletterSignupForm newsletterId="1234" />;
};

Default.story = { name: 'Default' };
