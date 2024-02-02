import { BrazeEndOfArticleComponent } from '../../BrazeEndOfArticleComponent';
import {
	mockButtonClick,
	mockComponentEvent,
	mockFetchEmail,
	mockSubscribe,
} from '../../storybook/mocks';

export default {
	component: BrazeEndOfArticleComponent,
	title: 'Components/Braze/NewsletterEpic',
};

export const defaultStory = () => {
	const brazeMessageProps = {
		slotName: 'EndOfArticle',
		newsletterId: '6023',
		header: `Newsletter title`,
		frequency: 'Frequency',
		paragraph1:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		paragraph2:
			'We thought you should know this newsletter may contain information about Guardian products and services.',
		componentName: 'NewsletterEpic',
		ophanComponentId: 'example_ophan_component_id',
		imageUrl:
			'https://i.guim.co.uk/img/media/898c5401ab51b983dc4b2508aaaf0735e6bda0e2/0_0_2000_2000/2000.png?width=400&quality=75&s=9191ec413d946058f37caced7edd0b90',
	};

	return (
		<BrazeEndOfArticleComponent
			componentName={'NewsletterEpic'}
			brazeMessageProps={brazeMessageProps}
			subscribeToNewsletter={(id) => mockSubscribe(id)}
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
