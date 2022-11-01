import { calloutCampaign } from '../../../fixtures/manual/calloutCampaign';
import { CalloutBlockComponent } from './CalloutBlockComponentNew';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';

export default {
	component: CalloutBlockComponent,
	title: 'Components/CalloutBlockComponentNew',
};

export const Default = () => {
	return (
		<>
			<CalloutBlockComponent
				callout={calloutCampaign}
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
			/>
		</>
	);
};

Default.story = { name: 'default' };
