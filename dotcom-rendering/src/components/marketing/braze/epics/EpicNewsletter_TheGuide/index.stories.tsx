import { BrazeEndOfArticleComponent } from '../../BrazeEndOfArticleComponent';
import {
	mockButtonClick,
	mockComponentEvent,
	mockFetchEmail,
	mockSubscribe,
} from '../../storybook/mocks';

export default {
	component: BrazeEndOfArticleComponent,
	title: 'Components/Braze/EpicNewsletter_TheGuide',
};

export const defaultStory = () => {
	const brazeMessageProps = {
		slotName: 'EndOfArticle',
		header: `Sign up for The Guide`,
		frequency: 'Weekly',
		paragraph1:
			'Get our weekly pop culture email, free in your inbox every Friday.',
		paragraph2:
			'We thought you should know this newsletter may contain information about Guardian products and services.',
		componentName: 'EpicNewsletter_TheGuide',
		ophanComponentId: 'example_ophan_component_id',
	};

	return (
		<BrazeEndOfArticleComponent
			componentName={'EpicNewsletter_TheGuide'}
			brazeMessageProps={brazeMessageProps}
			subscribeToNewsletter={() => mockSubscribe('6006')}
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
