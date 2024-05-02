import type { BrazeBannerComponent as BrazeBannerComponentType } from '@guardian/braze-components';
import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';

type BrazeMessageProps = {
	[key: string]: string | undefined;
};

type NewsletterSubscribeCallback = (id: string) => Promise<void>;
const subscribeToNewsletter: NewsletterSubscribeCallback = () =>
	Promise.resolve();

const fetchEmail: () => Promise<string | null> = () =>
	Promise.resolve('name@example.com');

export default {
	component: 'BrazeBanners',
	title: 'Components/StickyBottomBanner/BrazeBanners',
};

// Braze StyleableBannerWithLink story
// ---------------------------------------
export const BrazeStyleableBannerWithLinkComponent = (
	args: BrazeMessageProps & { componentName: string },
): ReactElement => {
	const [BrazeMessage, setBrazeMessage] =
		useState<typeof BrazeBannerComponentType>();

	useEffect(() => {
		import('@guardian/braze-components')
			.then((module) => {
				console.log(module);
				setBrazeMessage(() => module.BrazeBannerComponent);
			})
			.catch((e) =>
				console.error(
					`braze-components dynamic import - error: ${String(e)}`,
				),
			);
	}, []);

	if (BrazeMessage) {
		const brazeMessageProps: BrazeMessageProps = {
			body: args.body,
			buttonText: args.buttonText,
			buttonUrl: args.buttonUrl,
			header: args.header,
			highlight: args.highlight,
			imageAltText: args.imageAltText,
			imagePosition: args.imagePosition,
			imageUrl: args.imageUrl,
			ophanComponentId: args.ophanComponentId,
			reminderOption: args.reminderOption,
			reminderStage: args.reminderStage,
			showPaymentIcons: args.showPaymentIcons,
			showPrivacyText: args.showPrivacyText,
			styleBackground: args.styleBackground,
			styleBody: args.styleBody,
			styleButton: args.styleButton,
			styleButtonBackground: args.styleButtonBackground,
			styleButtonHover: args.styleButtonHover,
			styleClose: args.styleClose,
			styleCloseBackground: args.styleCloseBackground,
			styleCloseHover: args.styleCloseHover,
			styleHeader: args.styleHeader,
			styleHighlight: args.styleHighlight,
			styleHighlightBackground: args.styleHighlightBackground,
			styleReminderAnimation: args.styleReminderAnimation,
			styleReminderButton: args.styleReminderButton,
			styleReminderButtonBackground: args.styleReminderButtonBackground,
			styleReminderButtonHover: args.styleReminderButtonHover,
		};

		return (
			<BrazeMessage
				componentName={args.componentName}
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
				subscribeToNewsletter={subscribeToNewsletter}
				fetchEmail={fetchEmail}
			/>
		);
	}
	return <div>Loading...</div>;
};

BrazeStyleableBannerWithLinkComponent.args = {
	body: 'Thanks to your generous support in this extraordinary year, our open, independent journalism was read by millions. From the pandemic to our urgent coverage of the climate crisis, our reporting had a powerful impact.',
	buttonText: 'Take a look back',
	buttonUrl:
		'https://www.theguardian.com/info/ng-interactive/2020/dec/21/the-guardian-in-2020?INTCMP=gdnwb_mrtn_banner_edtrl_MK_SU_WorkingReport2020Canvas',
	componentName: 'StyleableBannerWithLink',
	header: 'The Guardian’s impact in 2021',
	highlight:
		'Read our look-back to see how Guardian journalism made a difference.',
	imageAltText: 'Accessible image description',
	imagePosition: 'bottom',
	imageUrl:
		'https://i.guim.co.uk/img/media/35d403182e4b262d37385281b19b763ee6b32f6a/58_0_1743_1046/master/1743.png?width=930&quality=45&auto=format&s=9ecd82413fef9883c1e7a0df2bf6abb1',
	ophanComponentId: 'change_me_ophan_component_id',
	reminderOption: 'recurring-contribution-upsell',
	reminderStage: 'PRE',
	showPaymentIcons: 'false',
	showPrivacyText: 'false',
	slotName: 'Banner',
	styleBackground: '#ededed',
	styleBody: '#333333',
	styleButton: '#ffffff',
	styleButtonBackground: '#052962',
	styleButtonHover: '#234b8a',
	styleClose: '#052962',
	styleCloseBackground: '#ededed',
	styleCloseHover: '#e5e5e5',
	styleHeader: '#333333',
	styleHighlight: '#333333',
	styleHighlightBackground: '#ededed',
	styleReminderAnimation: '#707070',
	styleReminderButton: '#121212',
	styleReminderButtonBackground: '#ededed',
	styleReminderButtonHover: '#dcdcdc',
};

BrazeStyleableBannerWithLinkComponent.storyName = 'StyleableBannerWithLink';

// Braze BannerWithLink story (uses StyleableBannerWithLink)
// ---------------------------------------
export const BrazeBannerWithLinkComponent = (
	args: BrazeMessageProps & { componentName: string },
): ReactElement => {
	const [BrazeMessage, setBrazeMessage] =
		useState<typeof BrazeBannerComponentType>();

	useEffect(() => {
		import('@guardian/braze-components')
			.then((module) => {
				console.log(module);
				setBrazeMessage(() => module.BrazeBannerComponent);
			})
			.catch((e) =>
				console.error(
					`braze-components dynamic import - error: ${String(e)}`,
				),
			);
	}, []);

	if (BrazeMessage) {
		const brazeMessageProps: BrazeMessageProps = {
			body: args.body,
			boldText: args.boldText,
			buttonText: args.buttonText,
			buttonUrl: args.buttonUrl,
			header: args.header,
			imageUrl: args.imageUrl,
			ophanComponentId: args.ophanComponentId,
		};

		return (
			<BrazeMessage
				componentName={args.componentName}
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
				subscribeToNewsletter={subscribeToNewsletter}
				fetchEmail={fetchEmail}
			/>
		);
	}
	return <div>Loading...</div>;
};

BrazeBannerWithLinkComponent.args = {
	body: 'Thanks to your generous support in this extraordinary year, our open, independent journalism was read by millions. From the pandemic to our urgent coverage of the climate crisis, our reporting had a powerful impact.',
	boldText:
		'Read our look-back to see how Guardian journalism made a difference.',
	buttonText: 'Take a look back',
	buttonUrl:
		'https://www.theguardian.com/info/ng-interactive/2020/dec/21/the-guardian-in-2020?INTCMP=gdnwb_mrtn_banner_edtrl_MK_SU_WorkingReport2020Canvas',
	componentName: 'BannerWithLink',
	header: 'The Guardian’s impact in 2021',
	imageUrl:
		'https://i.guim.co.uk/img/media/35d403182e4b262d37385281b19b763ee6b32f6a/58_0_1743_1046/master/1743.png?width=930&quality=45&auto=format&s=9ecd82413fef9883c1e7a0df2bf6abb1',
	ophanComponentId: 'change_me_ophan_component_id',
	slotName: 'Banner',
};

BrazeBannerWithLinkComponent.storyName = 'BannerWithLink';

// Braze AppBanner story (uses StyleableBannerWithLink)
// ---------------------------------------
export const BrazeAppBannerComponent = (
	args: BrazeMessageProps & { componentName: string },
): ReactElement => {
	const [BrazeMessage, setBrazeMessage] =
		useState<typeof BrazeBannerComponentType>();

	useEffect(() => {
		import('@guardian/braze-components')
			.then((module) => {
				console.log(module);
				setBrazeMessage(() => module.BrazeBannerComponent);
			})
			.catch((e) =>
				console.error(
					`braze-components dynamic import - error: ${String(e)}`,
				),
			);
	}, []);

	if (BrazeMessage) {
		const brazeMessageProps: BrazeMessageProps = {
			body: args.body,
			cta: args.cta,
			header: args.header,
			imageUrl: args.imageUrl,
		};

		return (
			<BrazeMessage
				componentName={args.componentName}
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
				subscribeToNewsletter={subscribeToNewsletter}
				fetchEmail={fetchEmail}
			/>
		);
	}
	return <div>Loading...</div>;
};

BrazeAppBannerComponent.args = {
	body: 'Hi John, did you know that as a Guardian digital subscriber you can enjoy an enhanced experience of our quality, independent journalism on all your devices, including The Guardian Live app.',
	componentName: 'AppBanner',
	cta: 'Search for "Guardian live news"',
	header: 'A note to our digital subscribers',
	imageUrl:
		'https://i.guim.co.uk/img/media/de6813b4dd9b9805a2d14dd6af14ae2b48e2e19e/0_0_930_520/master/930.png?quality=45&width=930&s=0beb53509265d32e3d201aa3981323bb',
	slotName: 'Banner',
};

BrazeAppBannerComponent.storyName = 'AppBanner';

// Braze StyleableBannerNewsletter story
// ---------------------------------------
export const BrazeStyleableBannerNewsletterComponent = (
	args: BrazeMessageProps & { componentName: string },
): ReactElement => {
	const [BrazeMessage, setBrazeMessage] =
		useState<typeof BrazeBannerComponentType>();

	useEffect(() => {
		import('@guardian/braze-components')
			.then((module) => {
				console.log(module);
				setBrazeMessage(() => module.BrazeBannerComponent);
			})
			.catch((e) =>
				console.error(
					`braze-components dynamic import - error: ${String(e)}`,
				),
			);
	}, []);

	if (BrazeMessage) {
		const brazeMessageProps: BrazeMessageProps = {
			body: args.body,
			boldText: args.boldText,
			frequency: args.frequency,
			header: args.header,
			imageUrl: args.imageUrl,
			newsletterCta: args.newsletterCta,
			newsletterId: args.newsletterId,
			ophanComponentId: args.ophanComponentId,
			secondParagraph: args.secondParagraph,
			styleBackground: args.styleBackground,
			styleBody: args.styleBody,
			styleBoldText: args.styleBoldText,
			styleBoldTextBackground: args.styleBoldTextBackground,
			styleClockColor: args.styleClockColor,
			styleClose: args.styleClose,
			styleCloseBackground: args.styleCloseBackground,
			styleCloseHover: args.styleCloseHover,
			styleFrequencyText: args.styleFrequencyText,
			styleHeader: args.styleHeader,
			styleNewsletterButton: args.styleNewsletterButton,
			styleNewsletterButtonBackground:
				args.styleNewsletterButtonBackground,
			styleNewsletterButtonHover: args.styleNewsletterButtonHover,
			styleReminderAnimation: args.styleReminderAnimation,
			styleSecondParagraph: args.styleSecondParagraph,
		};

		return (
			<BrazeMessage
				componentName={args.componentName}
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
				subscribeToNewsletter={subscribeToNewsletter}
				fetchEmail={fetchEmail}
			/>
		);
	}
	return <div>Loading...</div>;
};

BrazeStyleableBannerNewsletterComponent.args = {
	body: 'Whether it’s the latest manoeuvring in global politics or the ‘and finally’ story that everyone’s talking about, you’ll be bang up to date with the news that counts.',
	boldText: 'Sign up today!',
	componentName: 'StyleableBannerNewsletter',
	frequency: 'Every day',
	header: 'The Morning Briefing',
	imageUrl:
		'https://i.guim.co.uk/img/media/568c6031be78dab6f6c28336010884f3ebd0f97c/0_0_1936_1936/master/1936.png?width=196&quality=45&auto=format&s=2a3630e9625620d5726c31c5cdbf4772',
	newsletterCta: 'Sign up',
	newsletterId: '4156',
	ophanComponentId: 'change_me_ophan_component_id',
	secondParagraph:
		'We thought you should know this newsletter may contain information about Guardian products and services.',
	slotName: 'Banner',
	styleBackground: '#ebe8e8',
	styleBody: '#666666',
	styleBoldText: `#333333`,
	styleBoldTextBackground: '#ebe8e8',
	styleClockColor: '#999999',
	styleClose: `#333333`,
	styleCloseBackground: '#ebe8e8',
	styleCloseHover: '#e5e5e5',
	styleFrequencyText: '#333333',
	styleHeader: `#333333`,
	styleNewsletterButton: '#ffffff',
	styleNewsletterButtonBackground: '#c70000',
	styleNewsletterButtonHover: '#c70000',
	styleReminderAnimation: '#707070',
	styleSecondParagraph: '#666666',
};

BrazeStyleableBannerNewsletterComponent.storyName = 'StyleableBannerNewsletter';

// Braze BannerNewsletter story (uses StyleableBannerNewsletter)
// ---------------------------------------
export const BrazeBannerNewsletterComponent = (
	args: BrazeMessageProps & { componentName: string },
): ReactElement => {
	const [BrazeMessage, setBrazeMessage] =
		useState<typeof BrazeBannerComponentType>();

	useEffect(() => {
		import('@guardian/braze-components')
			.then((module) => {
				console.log(module);
				setBrazeMessage(() => module.BrazeBannerComponent);
			})
			.catch((e) =>
				console.error(
					`braze-components dynamic import - error: ${String(e)}`,
				),
			);
	}, []);

	if (BrazeMessage) {
		const brazeMessageProps: BrazeMessageProps = {
			body: args.body,
			boldText: args.boldText,
			frequency: args.frequency,
			header: args.header,
			imageUrl: args.imageUrl,
			newsletterId: args.newsletterId,
			ophanComponentId: args.ophanComponentId,
			secondParagraph: args.secondParagraph,
		};

		return (
			<BrazeMessage
				componentName={args.componentName}
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
				subscribeToNewsletter={subscribeToNewsletter}
				fetchEmail={fetchEmail}
			/>
		);
	}
	return <div>Loading...</div>;
};

BrazeBannerNewsletterComponent.args = {
	body: 'Whether it’s the latest manoeuvring in global politics or the ‘and finally’ story that everyone’s talking about, you’ll be bang up to date with the news that counts.',
	boldText: 'Sign up today!',
	componentName: 'BannerNewsletter',
	frequency: 'Every day',
	header: 'The Morning Briefing',
	imageUrl:
		'https://i.guim.co.uk/img/media/568c6031be78dab6f6c28336010884f3ebd0f97c/0_0_1936_1936/master/1936.png?width=196&quality=45&auto=format&s=2a3630e9625620d5726c31c5cdbf4772',
	newsletterId: '4156',
	ophanComponentId: 'change_me_ophan_component_id',
	secondParagraph:
		'We thought you should know this newsletter may contain information about Guardian products and services.',
	slotName: 'Banner',
};

BrazeBannerNewsletterComponent.storyName = 'BannerNewsletter';
