import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { ShareIcons } from './ShareIcons';

export default {
	component: ShareIcons,
	title: 'Components/ShareIcons',
};

const defaultFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.News,
};

export const Medium = () => {
	return (
		<ShareIcons
			pageId=""
			webTitle=""
			displayIcons={[
				'facebook',
				'email',
				'linkedIn',
				'messenger',
				'twitter',
				'whatsApp',
			]}
			format={defaultFormat}
			size="medium"
			context="LiveBlock"
		/>
	);
};
Medium.storyName = 'Medium';

export const Small = () => {
	return (
		<ShareIcons
			pageId=""
			webTitle=""
			displayIcons={[
				'facebook',
				'email',
				'linkedIn',
				'messenger',
				'twitter',
				'whatsApp',
			]}
			format={defaultFormat}
			size="small"
			context="LiveBlock"
		/>
	);
};
Small.storyName = 'Small';
