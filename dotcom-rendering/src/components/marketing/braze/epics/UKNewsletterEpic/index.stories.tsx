import { BrazeEndOfArticleComponent } from '../../BrazeEndOfArticleComponent';
import {
	mockButtonClick,
	mockComponentEvent,
	mockFetchEmail,
	mockSubscribe,
} from '../../storybook/mocks';

export default {
	component: BrazeEndOfArticleComponent,
	title: 'Components/Braze/UKNewsletterEpic',
};

export const defaultStory = () => {
	const brazeMessageProps = {
		slotName: 'EndOfArticle',
		header: 'The Morning Briefing',
		frequency: 'Every day',
		paragraph1:
			'Whether it’s the latest manoeuvring in global politics or the ‘and finally’ story that everyone’s talking about, you’ll be bang up to date with the news that counts.',
		paragraph2:
			'We thought you should know this newsletter may contain information about Guardian products and services.',
		componentName: 'UKNewsletterEpic',
		ophanComponentId: 'example_ophan_component_id',
	};

	return (
		<BrazeEndOfArticleComponent
			componentName={'UKNewsletterEpic'}
			brazeMessageProps={brazeMessageProps}
			subscribeToNewsletter={() => mockSubscribe('4156')}
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

export const Failure = () => {
	const brazeMessageProps = {
		slotName: 'EndOfArticle',
		header: 'The Morning Briefing',
		frequency: 'Every day',
		paragraph1:
			'Whether it’s the latest manoeuvring in global politics or the ‘and finally’ story that everyone’s talking about, you’ll be bang up to date with the news that counts.',
		paragraph2:
			'We thought you should know this newsletter may contain information about Guardian products and services.',
		componentName: 'UKNewsletterEpic',
		ophanComponentId: 'example_ophan_component_id',
	};

	return (
		<BrazeEndOfArticleComponent
			componentName={'UKNewsletterEpic'}
			brazeMessageProps={brazeMessageProps}
			subscribeToNewsletter={() => mockSubscribe('4156')}
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
Failure.storyName = 'Newsletter subscribe failure';
