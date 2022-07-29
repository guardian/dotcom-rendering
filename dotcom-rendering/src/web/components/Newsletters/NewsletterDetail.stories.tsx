import { NewsletterDetail } from './NewsletterDetail';

export default {
	component: NewsletterDetail,
	title: 'Components/Newsletters/NewsletterDetail',
};

export const Default = () => {
	return <NewsletterDetail text="UK Focused" />;
};

Default.story = { name: 'Default' };
