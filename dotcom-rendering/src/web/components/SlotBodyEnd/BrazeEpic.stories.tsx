import type { BrazeEndOfArticleComponent } from '@guardian/braze-components';
import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';

type BrazeMessageProps = {
	[key: string]: string | undefined;
};

export default {
	component: 'BrazeEpics',
	title: 'Components/SlotBodyEnd/BrazeEpics',
};

// Braze Epic
// ---------------------------------------
export const BrazeEpicComponent = (
	args: BrazeMessageProps & { componentName: string },
): ReactElement => {
	const [BrazeMessage, setBrazeMessage] =
		useState<typeof BrazeEndOfArticleComponent>();

	useEffect(() => {
		import('@guardian/braze-components')
			.then((module) => {
				setBrazeMessage(() => module.BrazeEndOfArticleComponent);
			})
			.catch((e) =>
				console.error(`braze-components dynamic import - error: ${String(e)}`),
			);
	}, []);

	if (BrazeMessage) {
		const brazeMessageProps: BrazeMessageProps = {
			heading: args.heading,
			paragraph1: args.paragraph1,
			paragraph2: args.paragraph2,
			paragraph3: args.paragraph3,
			paragraph4: args.paragraph4,
			highlightedText: args.highlightedText,
			buttonText: args.buttonText,
			buttonUrl: args.buttonUrl,
			hidePaymentIcons: args.hidePaymentIcons,
			ophanComponentId: args.ophanComponentId,
		};

		return (
			<BrazeMessage
				componentName={args.componentName}
				subscribeToNewsletter={() => Promise.resolve()}
				logButtonClickWithBraze={(internalButtonId) => {
					console.log(`Button with internal ID ${internalButtonId} clicked`);
				}}
				submitComponentEvent={(componentEvent) => {
					console.log('submitComponentEvent called with: ', componentEvent);
				}}
				brazeMessageProps={brazeMessageProps}
			/>
		);
	}
	return <div>Loading...</div>;
};

BrazeEpicComponent.args = {
	heading: 'Since you’re here...',
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
	componentName: 'Epic',
};

BrazeEpicComponent.story = { name: 'Epic' };

// Braze Epic with Reminder CTA
// ---------------------------------------
export const BrazeEpicWithReminderComponent = (
	args: BrazeMessageProps & { componentName: string },
): ReactElement => {
	const [BrazeMessage, setBrazeMessage] =
		useState<typeof BrazeEndOfArticleComponent>();

	useEffect(() => {
		import('@guardian/braze-components')
			.then((module) => {
				setBrazeMessage(() => module.BrazeEndOfArticleComponent);
			})
			.catch((e) =>
				console.error(`braze-components dynamic import - error: ${String(e)}`),
			);
	}, []);

	if (BrazeMessage) {
		const brazeMessageProps: BrazeMessageProps = {
			heading: args.heading,
			paragraph1: args.paragraph1,
			paragraph2: args.paragraph2,
			highlightedText: args.highlightedText,
			buttonText: args.buttonText,
			buttonUrl: args.buttonUrl,
			hidePaymentIcons: args.hidePaymentIcons,
			ophanComponentId: args.ophanComponentId,
			remindMeButtonText: args.remindMeButtonText,
			remindMeConfirmationText: args.remindMeConfirmationText,
			remindMeConfirmationHeaderText: args.remindMeConfirmationHeaderText,
		};

		return (
			<BrazeMessage
				componentName={args.componentName}
				subscribeToNewsletter={() => Promise.resolve()}
				logButtonClickWithBraze={(internalButtonId) => {
					console.log(`Button with internal ID ${internalButtonId} clicked`);
				}}
				submitComponentEvent={(componentEvent) => {
					console.log('submitComponentEvent called with: ', componentEvent);
				}}
				brazeMessageProps={brazeMessageProps}
			/>
		);
	}
	return <div>Loading...</div>;
};

BrazeEpicWithReminderComponent.args = {
	heading: 'Since you’re here...',
	paragraph1:
		'... we have a small favour to ask. More people, <a href="https://example.com">like you</a>, are reading and supporting the Guardian’s independent, investigative journalism than ever before. And unlike many news organisations, we made the choice to keep our reporting open for all, regardless of where they live or what they can afford to pay.',
	paragraph2:
		'The Guardian will engage with the most critical issues of our time – from the escalating climate catastrophe to widespread inequality to the influence of big tech on our lives. At a time when factual information is a necessity, we believe that each of us, around the world, deserves access to accurate reporting with integrity at its heart.',
	highlightedText:
		'Support <a href="https://example.com">The Guardian</a> from as little as %%CURRENCY_SYMBOL%%1 - and it only takes a minute. Thank you.',
	buttonText: 'Support The Guardian',
	buttonUrl: 'https://support.theguardian.com/contribute',
	hidePaymentIcons: '',
	ophanComponentId: 'example_ophan_component_id',
	slotName: 'EndOfArticle',
	componentName: 'Epic',
	remindMeButtonText: 'Remind me in May',
	remindMeConfirmationText: "Okay, we'll send you an email in May.",
	remindMeConfirmationHeaderText: 'Thank you! Your reminder is set.',
};

BrazeEpicWithReminderComponent.story = { name: 'Epic with reminder' };

// Braze Epic with special header
// ---------------------------------------
export const BrazeEpicSpecialHeaderComponent = (
	args: BrazeMessageProps & { componentName: string },
): ReactElement => {
	const [BrazeMessage, setBrazeMessage] =
		useState<typeof BrazeEndOfArticleComponent>();

	useEffect(() => {
		import('@guardian/braze-components')
			.then((module) => {
				setBrazeMessage(() => module.BrazeEndOfArticleComponent);
			})
			.catch((e) =>
				console.error(`braze-components dynamic import - error: ${String(e)}`),
			);
	}, []);

	if (BrazeMessage) {
		const brazeMessageProps: BrazeMessageProps = {
			paragraph1: args.paragraph1,
			paragraph2: args.paragraph2,
			paragraph3: args.paragraph3,
			paragraph4: args.paragraph4,
			highlightedText: args.highlightedText,
			buttonText: args.buttonText,
			buttonUrl: args.buttonUrl,
			hidePaymentIcons: args.hidePaymentIcons,
			ophanComponentId: args.ophanComponentId,
		};

		return (
			<BrazeMessage
				componentName={args.componentName}
				subscribeToNewsletter={() => Promise.resolve()}
				logButtonClickWithBraze={(internalButtonId) => {
					console.log(`Button with internal ID ${internalButtonId} clicked`);
				}}
				submitComponentEvent={(componentEvent) => {
					console.log('submitComponentEvent called with: ', componentEvent);
				}}
				brazeMessageProps={brazeMessageProps}
			/>
		);
	}
	return <div>Loading...</div>;
};

BrazeEpicSpecialHeaderComponent.args = {
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
};

BrazeEpicSpecialHeaderComponent.story = { name: 'Epic with special header' };

// Braze UK Newsletter Epic
// ---------------------------------------
export const BrazeUKNewsletterEpicComponent = (
	args: BrazeMessageProps & { componentName: string },
): ReactElement => {
	const [BrazeMessage, setBrazeMessage] =
		useState<typeof BrazeEndOfArticleComponent>();

	useEffect(() => {
		import('@guardian/braze-components')
			.then((module) => {
				setBrazeMessage(() => module.BrazeEndOfArticleComponent);
			})
			.catch((e) =>
				console.error(`braze-components dynamic import - error: ${String(e)}`),
			);
	}, []);

	if (BrazeMessage) {
		const brazeMessageProps: BrazeMessageProps = {
			header: args.header,
			frequency: args.frequency,
			paragraph1: args.paragraph1,
			paragraph2: args.paragraph2,
			ophanComponentId: args.ophanComponentId,
		};

		return (
			<BrazeMessage
				componentName={args.componentName}
				subscribeToNewsletter={() => Promise.resolve()}
				logButtonClickWithBraze={(internalButtonId) => {
					console.log(`Button with internal ID ${internalButtonId} clicked`);
				}}
				submitComponentEvent={(componentEvent) => {
					console.log('submitComponentEvent called with: ', componentEvent);
				}}
				brazeMessageProps={brazeMessageProps}
			/>
		);
	}
	return <div>Loading...</div>;
};

BrazeUKNewsletterEpicComponent.args = {
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

BrazeUKNewsletterEpicComponent.story = { name: 'UK newsletter Epic' };

// Braze US Newsletter Epic
// ---------------------------------------
export const BrazeUSNewsletterEpicComponent = (
	args: BrazeMessageProps & { componentName: string },
): ReactElement => {
	const [BrazeMessage, setBrazeMessage] =
		useState<typeof BrazeEndOfArticleComponent>();

	useEffect(() => {
		import('@guardian/braze-components')
			.then((module) => {
				setBrazeMessage(() => module.BrazeEndOfArticleComponent);
			})
			.catch((e) =>
				console.error(`braze-components dynamic import - error: ${String(e)}`),
			);
	}, []);

	if (BrazeMessage) {
		const brazeMessageProps: BrazeMessageProps = {
			header: args.header,
			frequency: args.frequency,
			paragraph1: args.paragraph1,
			paragraph2: args.paragraph2,
			ophanComponentId: args.ophanComponentId,
		};

		return (
			<BrazeMessage
				componentName={args.componentName}
				subscribeToNewsletter={() => Promise.resolve()}
				logButtonClickWithBraze={(internalButtonId) => {
					console.log(`Button with internal ID ${internalButtonId} clicked`);
				}}
				submitComponentEvent={(componentEvent) => {
					console.log('submitComponentEvent called with: ', componentEvent);
				}}
				brazeMessageProps={brazeMessageProps}
			/>
		);
	}
	return <div>Loading...</div>;
};

BrazeUSNewsletterEpicComponent.args = {
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

BrazeUSNewsletterEpicComponent.story = { name: 'US newsletter Epic' };

// Braze Australia Newsletter Epic
// ---------------------------------------
export const BrazeAUNewsletterEpicComponent = (
	args: BrazeMessageProps & { componentName: string },
): ReactElement => {
	const [BrazeMessage, setBrazeMessage] =
		useState<typeof BrazeEndOfArticleComponent>();

	useEffect(() => {
		import('@guardian/braze-components')
			.then((module) => {
				setBrazeMessage(() => module.BrazeEndOfArticleComponent);
			})
			.catch((e) =>
				console.error(`braze-components dynamic import - error: ${String(e)}`),
			);
	}, []);

	if (BrazeMessage) {
		const brazeMessageProps: BrazeMessageProps = {
			header: args.header,
			frequency: args.frequency,
			paragraph1: args.paragraph1,
			paragraph2: args.paragraph2,
			ophanComponentId: args.ophanComponentId,
		};

		return (
			<BrazeMessage
				componentName={args.componentName}
				subscribeToNewsletter={() => Promise.resolve()}
				logButtonClickWithBraze={(internalButtonId) => {
					console.log(`Button with internal ID ${internalButtonId} clicked`);
				}}
				submitComponentEvent={(componentEvent) => {
					console.log('submitComponentEvent called with: ', componentEvent);
				}}
				brazeMessageProps={brazeMessageProps}
			/>
		);
	}
	return <div>Loading...</div>;
};

BrazeAUNewsletterEpicComponent.args = {
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

BrazeAUNewsletterEpicComponent.story = { name: 'Australia newsletter Epic' };

// Braze DownToEarth Newsletter Epic
// ---------------------------------------
export const BrazeDownToEarthNewsletterEpicComponent = (
	args: BrazeMessageProps & { componentName: string },
): ReactElement => {
	const [BrazeMessage, setBrazeMessage] =
		useState<typeof BrazeEndOfArticleComponent>();

	useEffect(() => {
		import('@guardian/braze-components')
			.then((module) => {
				setBrazeMessage(() => module.BrazeEndOfArticleComponent);
			})
			.catch((e) =>
				console.error(`braze-components dynamic import - error: ${String(e)}`),
			);
	}, []);

	if (BrazeMessage) {
		const brazeMessageProps: BrazeMessageProps = {
			header: args.header,
			frequency: args.frequency,
			paragraph1: args.paragraph1,
			paragraph2: args.paragraph2,
			ophanComponentId: args.ophanComponentId,
		};

		return (
			<BrazeMessage
				componentName={args.componentName}
				subscribeToNewsletter={() => Promise.resolve()}
				logButtonClickWithBraze={(internalButtonId) => {
					console.log(`Button with internal ID ${internalButtonId} clicked`);
				}}
				submitComponentEvent={(componentEvent) => {
					console.log('submitComponentEvent called with: ', componentEvent);
				}}
				brazeMessageProps={brazeMessageProps}
			/>
		);
	}
	return <div>Loading...</div>;
};

BrazeDownToEarthNewsletterEpicComponent.args = {
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

BrazeDownToEarthNewsletterEpicComponent.story = {
	name: 'Down To Earth newsletter Epic',
};
