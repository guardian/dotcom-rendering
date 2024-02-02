import { BrazeEndOfArticleComponent } from '../../BrazeEndOfArticleComponent';
import {
	mockButtonClick,
	mockComponentEvent,
	mockFetchEmail,
	mockSubscribe,
} from '../../storybook/mocks';

export default {
	component: BrazeEndOfArticleComponent,
	title: 'Components/Braze/USNewsletterEpic',
};

export const defaultStory = () => {
	const brazeMessageProps = {
		slotName: 'EndOfArticle',
		header: 'First Thing',
		frequency: 'Daily',
		paragraph1:
			'Start your day with a global perspective on America. Get the Guardian’s top stories and must reads in one hit – every weekday.',
		paragraph2:
			'We thought you should know this newsletter may contain information about Guardian products and services.',
		componentName: 'USNewsletterEpic',
		ophanComponentId: 'example_ophan_component_id',
	};

	return (
		<BrazeEndOfArticleComponent
			componentName={'USNewsletterEpic'}
			brazeMessageProps={brazeMessageProps}
			subscribeToNewsletter={() => mockSubscribe('4300')}
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
