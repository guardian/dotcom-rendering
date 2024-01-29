import { BrazeEndOfArticleComponent } from '../../BrazeEndOfArticleComponent';
import {
	mockButtonClick,
	mockComponentEvent,
	mockFetchEmail,
	mockSubscribe,
} from '../../storybook/mocks';

export default {
	component: BrazeEndOfArticleComponent,
	title: 'Components/Braze/DownToEarthNewsletterEpic',
};

export const defaultStory = () => {
	const brazeMessageProps = {
		slotName: 'EndOfArticle',
		header: 'Down To Earth',
		frequency: 'Weekly',
		paragraph1:
			'An exclusive weekly piece from our top climate crisis correspondents, as well as a digest of the biggest environment stories – plus the good news, the not-so-good news, and everything else you need to know.',
		paragraph2:
			'We thought you should know this newsletter may contain information about Guardian products and services.',
		componentName: 'DownToEarthNewsletterEpic',
		ophanComponentId: 'example_ophan_component_id',
	};

	return (
		<BrazeEndOfArticleComponent
			componentName={'DownToEarthNewsletterEpic'}
			brazeMessageProps={brazeMessageProps}
			subscribeToNewsletter={() => mockSubscribe('4147')}
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
