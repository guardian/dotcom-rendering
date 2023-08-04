import { NewsletterSignupForm } from './NewsletterSignupForm.tsx';

export default {
	component: NewsletterSignupForm,
	title: 'Components/NewsletterSignupForm',
};

export const Default = () => {
	return <NewsletterSignupForm newsletterId="1234" />;
};

Default.storyName = 'Default';
