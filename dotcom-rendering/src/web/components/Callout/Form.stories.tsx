import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { calloutCampaign } from 'fixtures/manual/calloutCampaignV2';
import { Form } from './Form';

const mockFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: ArticlePillar.Opinion,
};

export default {
	component: Form,
	title: 'Components/CalloutBlockComponent/Form',
};

export const Default = () => {
	return (
		<>
			<Form
				format={mockFormat}
				formFields={calloutCampaign.formFields}
				onSubmit={() => {}}
			/>
			;
		</>
	);
};

Default.story = { name: 'default' };
