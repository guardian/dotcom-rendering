import { NewsletterCategory } from './NewsletterCategory';

export default {
	component: NewsletterCategory,
	title: 'Components/NewsletterCategory',
};

export const Default = () => {
	return <NewsletterCategory text="UK Focused" />;
};

Default.story = { name: 'Default' };
