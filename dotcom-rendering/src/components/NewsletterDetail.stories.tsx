import { NewsletterDetail } from './NewsletterDetail.tsx';

export default {
	component: NewsletterDetail,
	title: 'Components/NewsletterDetail',
};

export const Default = () => {
	return <NewsletterDetail text="UK Focused" />;
};

Default.storyName = 'Default';
