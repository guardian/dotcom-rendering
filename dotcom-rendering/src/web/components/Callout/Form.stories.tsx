import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { calloutCampaign } from '../../../../fixtures/manual/calloutCampaign';
import { Form } from './Form';

const mockFormatNews = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: ArticlePillar.News,
};

const mockFormatOpinion = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: ArticlePillar.Opinion,
};

export default {
	component: Form,
	title: 'Components/Callout/Form',
};

export const News = () => {
	return (
		<>
			<Form
				format={mockFormatNews}
				formFields={calloutCampaign.formFields}
				onSubmit={() => {}}
			/>
			;
		</>
	);
};

News.story = { name: 'News' };

export const Opinion = () => {
	return (
		<>
			<Form
				format={mockFormatOpinion}
				formFields={calloutCampaign.formFields}
				onSubmit={() => {}}
			/>
			;
		</>
	);
};

Opinion.story = { name: 'default' };
