import { BrazeEndOfArticleComponent } from '../../BrazeEndOfArticleComponent';
import {
	mockButtonClick,
	mockComponentEvent,
	mockFetchEmail,
} from '../../storybook/mocks';

export default {
	component: BrazeEndOfArticleComponent,
	title: 'Components/Braze/EpicWithSpecialHeader',
};

export const defaultStory = () => {
	const brazeMessageProps = {
		authoredEpicImageAltText: 'Headshot image of Mark Rice-Oxley',
		authoredEpicHeader: "You're powering open, independent journalism",
		authoredEpicBylineName: 'Mark Rice-Oxley',
		authoredEpicBylineCopy1: 'Executive Editor',
		authoredEpicBylineCopy2: 'Reader Revenues',
		paragraph1:
			'... we have a small favour to ask. More people, <a href="https://example.com">like you</a>, are reading and supporting the Guardian’s independent, investigative journalism than ever before. And unlike many news organisations, we made the choice to keep our reporting open for all, regardless of where they live or what they can afford to pay.',
		paragraph2:
			'The Guardian will engage with the most critical issues of our time – from the escalating climate catastrophe to widespread inequality to the influence of big tech on our lives. At a time when factual information is a necessity, we believe that each of us, around the world, deserves access to accurate reporting with integrity at its heart.',
		paragraph3:
			'Our editorial independence means we set our own agenda and voice our own opinions. Guardian journalism is free from commercial and political bias and not influenced by billionaire owners or shareholders. This means we can give a voice to those less heard, explore where others turn away, and rigorously challenge those in power.',
		paragraph4:
			'We hope you will consider supporting us today. We need your support to keep delivering quality journalism that’s open and independent. Every reader contribution, however big or small, is so valuable. ',
		highlightedText:
			'Support <a href="https://example.com">The Guardian</a> from as little as %%CURRENCY_SYMBOL%%1 - and it only takes a minute. Thank you.',
		buttonText: 'Support The Guardian',
		buttonUrl: 'https://support.theguardian.com/contribute',
		hidePaymentIcons: '',
		ophanComponentId: 'example_ophan_component_id',
		slotName: 'EndOfArticle',
		componentName: 'EpicWithSpecialHeader',
		reminderStage: 'PRE',
		reminderOption: 'recurring-contribution-upsell',
	};

	return (
		<BrazeEndOfArticleComponent
			componentName={'EpicWithSpecialHeader'}
			brazeMessageProps={brazeMessageProps}
			subscribeToNewsletter={() => Promise.resolve()}
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
