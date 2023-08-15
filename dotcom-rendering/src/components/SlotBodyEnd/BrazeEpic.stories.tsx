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

const fetchEmail: () => Promise<string | null> = () =>
	Promise.resolve('name@example.com');

// Braze Epic - Default
// ---------------------------------------
export const BrazeEpic_Default_Component = (
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
				console.error(
					`braze-components dynamic import - error: ${String(e)}`,
				),
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
					console.log(
						`Button with internal ID ${internalButtonId} clicked`,
					);
				}}
				submitComponentEvent={(componentEvent) => {
					console.log(
						'submitComponentEvent called with: ',
						componentEvent,
					);
				}}
				brazeMessageProps={brazeMessageProps}
				fetchEmail={fetchEmail}
			/>
		);
	}
	return <div>Loading...</div>;
};

BrazeEpic_Default_Component.args = {
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

BrazeEpic_Default_Component.storyName = 'Default Epic';

// Braze Epic with Reminder CTA
// ---------------------------------------
export const BrazeEpic_DefaultWithReminder_Component = (
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
				console.error(
					`braze-components dynamic import - error: ${String(e)}`,
				),
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
					console.log(
						`Button with internal ID ${internalButtonId} clicked`,
					);
				}}
				submitComponentEvent={(componentEvent) => {
					console.log(
						'submitComponentEvent called with: ',
						componentEvent,
					);
				}}
				brazeMessageProps={brazeMessageProps}
				fetchEmail={fetchEmail}
			/>
		);
	}
	return <div>Loading...</div>;
};

BrazeEpic_DefaultWithReminder_Component.args = {
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

BrazeEpic_DefaultWithReminder_Component.storyName =
	'Default Epic with reminder';

// Braze Epic with special header
// ---------------------------------------
export const BrazeEpic_SpecialHeader_Component = (
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
				console.error(
					`braze-components dynamic import - error: ${String(e)}`,
				),
			);
	}, []);

	if (BrazeMessage) {
		const brazeMessageProps: BrazeMessageProps = {
			authoredEpicImageUrl: args.authoredEpicImageUrl,
			authoredEpicImageAltText: args.authoredEpicImageAltText,
			authoredEpicHeader: args.authoredEpicHeader,
			authoredEpicBylineName: args.authoredEpicBylineName,
			authoredEpicBylineCopy1: args.authoredEpicBylineCopy1,
			authoredEpicBylineCopy2: args.authoredEpicBylineCopy2,
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
					console.log(
						`Button with internal ID ${internalButtonId} clicked`,
					);
				}}
				submitComponentEvent={(componentEvent) => {
					console.log(
						'submitComponentEvent called with: ',
						componentEvent,
					);
				}}
				brazeMessageProps={brazeMessageProps}
				fetchEmail={fetchEmail}
			/>
		);
	}
	return <div>Loading...</div>;
};

BrazeEpic_SpecialHeader_Component.args = {
	authoredEpicImageUrl:
		'https://i.guim.co.uk/img/media/cecfef4098a2a8c1e302e3f67b979f11ee529bb6/0_0_470_471/master/470.png?width=300&quality=45&s=d654e72595c07e2095777863f4901863',
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
};

BrazeEpic_SpecialHeader_Component.storyName = 'Epic with special header';

// Braze Newsletter Epic - UK - MorningBriefing
// ---------------------------------------
export const BrazeNewsletterEpic_UK_MorningBriefing_Component = (
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
				console.error(
					`braze-components dynamic import - error: ${String(e)}`,
				),
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
					console.log(
						`Button with internal ID ${internalButtonId} clicked`,
					);
				}}
				submitComponentEvent={(componentEvent) => {
					console.log(
						'submitComponentEvent called with: ',
						componentEvent,
					);
				}}
				brazeMessageProps={brazeMessageProps}
				fetchEmail={fetchEmail}
			/>
		);
	}
	return <div>Loading...</div>;
};

BrazeNewsletterEpic_UK_MorningBriefing_Component.args = {
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

BrazeNewsletterEpic_UK_MorningBriefing_Component.storyName =
	'Newsletter - UK - Morning Briefing';

// Braze Newsletter Epic - US - FirstThing
// ---------------------------------------
export const BrazeEpicNewsletter_US_FirstThing_Component = (
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
				console.error(
					`braze-components dynamic import - error: ${String(e)}`,
				),
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
					console.log(
						`Button with internal ID ${internalButtonId} clicked`,
					);
				}}
				submitComponentEvent={(componentEvent) => {
					console.log(
						'submitComponentEvent called with: ',
						componentEvent,
					);
				}}
				brazeMessageProps={brazeMessageProps}
				fetchEmail={fetchEmail}
			/>
		);
	}
	return <div>Loading...</div>;
};

BrazeEpicNewsletter_US_FirstThing_Component.args = {
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

BrazeEpicNewsletter_US_FirstThing_Component.storyName =
	'Newsletter - US - First Thing';

// Braze Newsletter Epic - AUS - MorningMail
// ---------------------------------------
export const BrazeEpicNewsletter_AUS_MorningMail_Component = (
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
				console.error(
					`braze-components dynamic import - error: ${String(e)}`,
				),
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
					console.log(
						`Button with internal ID ${internalButtonId} clicked`,
					);
				}}
				submitComponentEvent={(componentEvent) => {
					console.log(
						'submitComponentEvent called with: ',
						componentEvent,
					);
				}}
				brazeMessageProps={brazeMessageProps}
				fetchEmail={fetchEmail}
			/>
		);
	}
	return <div>Loading...</div>;
};

BrazeEpicNewsletter_AUS_MorningMail_Component.args = {
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

BrazeEpicNewsletter_AUS_MorningMail_Component.storyName =
	'Newsletter - AUS - Morning Mail';

// Braze Newsletter Epic - AUS - MorningMail
// ---------------------------------------
export const BrazeEpicNewsletter_AUS_AfteernoonUpdate_Component = (
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
				console.error(
					`braze-components dynamic import - error: ${String(e)}`,
				),
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
					console.log(
						`Button with internal ID ${internalButtonId} clicked`,
					);
				}}
				submitComponentEvent={(componentEvent) => {
					console.log(
						'submitComponentEvent called with: ',
						componentEvent,
					);
				}}
				brazeMessageProps={brazeMessageProps}
				fetchEmail={fetchEmail}
			/>
		);
	}
	return <div>Loading...</div>;
};

BrazeEpicNewsletter_AUS_AfteernoonUpdate_Component.args = {
	slotName: 'EndOfArticle',
	header: `Sign up for Guardian Australia's Afternoon Update`,
	frequency: 'Every weekday',
	paragraph1:
		'Our Australian afternoon update breaks down the key stories of the day, telling you what’s happening and why it matters.',
	paragraph2:
		'We thought you should know this newsletter may contain information about Guardian products and services.',
	componentName: 'EpicNewsletter_AU_AfternoonUpdate',
	ophanComponentId: 'example_ophan_component_id',
};

BrazeEpicNewsletter_AUS_AfteernoonUpdate_Component.storyName =
	'Newsletter - AUS - Morning Mail';

// Braze Newsletter Epic - DownToEarth
// ---------------------------------------
export const BrazeEpicNewsletter_DownToEarth_Component = (
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
				console.error(
					`braze-components dynamic import - error: ${String(e)}`,
				),
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
					console.log(
						`Button with internal ID ${internalButtonId} clicked`,
					);
				}}
				submitComponentEvent={(componentEvent) => {
					console.log(
						'submitComponentEvent called with: ',
						componentEvent,
					);
				}}
				brazeMessageProps={brazeMessageProps}
				fetchEmail={fetchEmail}
			/>
		);
	}
	return <div>Loading...</div>;
};

BrazeEpicNewsletter_DownToEarth_Component.args = {
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

BrazeEpicNewsletter_DownToEarth_Component.storyName =
	'Newsletter - Down To Earth';

// Braze Newsletter Epic - The Guide
// ---------------------------------------
export const BrazeEpicNewsletter_TheGuide_Component = (
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
				console.error(
					`braze-components dynamic import - error: ${String(e)}`,
				),
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
					console.log(
						`Button with internal ID ${internalButtonId} clicked`,
					);
				}}
				submitComponentEvent={(componentEvent) => {
					console.log(
						'submitComponentEvent called with: ',
						componentEvent,
					);
				}}
				brazeMessageProps={brazeMessageProps}
				fetchEmail={fetchEmail}
			/>
		);
	}
	return <div>Loading...</div>;
};

BrazeEpicNewsletter_TheGuide_Component.args = {
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

BrazeEpicNewsletter_TheGuide_Component.storyName = 'Newsletter - The Guide';
