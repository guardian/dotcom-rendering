import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { calloutCampaign } from '../../../fixtures/manual/calloutCampaign';
import { CalloutBlockComponent } from './CalloutBlockComponent.importable';

const mockFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: ArticlePillar.Opinion,
};

export const Collapsible = () => {
	return (
		<CalloutBlockComponent
			isNonCollapsible={false}
			callout={calloutCampaign}
			format={mockFormat}
		/>
	);
};

Collapsible.story = { name: 'Collapsible' };

export const NonCollapsible = () => {
	return (
		<CalloutBlockComponent
			isNonCollapsible={true}
			callout={calloutCampaign}
			format={mockFormat}
		/>
	);
};

NonCollapsible.story = { name: 'NonCollapsible' };

export default {
	component: CalloutBlockComponent,
	title: 'Components/CalloutBlockComponent',
};
