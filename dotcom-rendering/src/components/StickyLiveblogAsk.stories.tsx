import { StickyLiveblogAsk } from './StickyLiveblogAsk.importable';

export default {
	component: StickyLiveblogAsk,
	title: 'Components/StickyLiveblogAsk',
};

export const Default = () => {
	return (
		<StickyLiveblogAsk
			referrerUrl="https://www.theguardian.com/uk"
			shouldHideReaderRevenueOnArticle={false}
		/>
	);
};
Default.storyName = 'Default';
