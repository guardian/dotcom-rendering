import { BrazeEndOfArticleComponent } from '../../BrazeEndOfArticleComponent';
import {
	mockButtonClick,
	mockComponentEvent,
	mockFetchEmail,
	mockSubscribe,
} from '../../storybook/mocks';

export default {
	component: BrazeEndOfArticleComponent,
	title: 'Components/Braze/AUNewsletterEpic',
};

export const defaultStory = () => {
	const brazeMessageProps = {
		slotName: 'EndOfArticle',
		header: `Guardian Australia's Morning Mail`,
		frequency: 'Every weekday',
		paragraph1:
			'Get early morning news from Guardian Australia straight to your inbox.',
		paragraph2:
			'We thought you should know this newsletter may contain information about Guardian products and services.',
		componentName: 'AUNewsletterEpic',
		ophanComponentId: 'example_ophan_component_id',
	};

	return (
		<BrazeEndOfArticleComponent
			componentName={'AUNewsletterEpic'}
			brazeMessageProps={brazeMessageProps}
			subscribeToNewsletter={() => mockSubscribe('4148')}
			fetchEmail={() => mockFetchEmail()}
			logButtonClickWithBraze={(internalButtonId) =>
				mockButtonClick(internalButtonId)
			}
			submitComponentEvent={(componentEvent) =>
				mockComponentEvent(componentEvent)
			}
		/>
	);
};
defaultStory.storyName = 'default';
