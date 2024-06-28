import { StickyLiveblogAsk } from './StickyLiveblogAsk.importable';

export default {
	component: StickyLiveblogAsk,
	title: 'Components/Marketing/StickyLiveblogAsk',
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
