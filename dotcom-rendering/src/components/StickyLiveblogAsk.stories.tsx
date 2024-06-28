import { StickyLiveblogAsk } from './StickyLiveblogAsk.importable';

export default {
	component: StickyLiveblogAsk,
	title: 'Components/StickyLiveblogAsk',
};

export const Default = () => {
	return (
		<StickyLiveblogAsk
			url="https://www.theguardian.com/uk"
			onCtaClick={() => {}}
		/>
	);
};
Default.storyName = 'Default';
