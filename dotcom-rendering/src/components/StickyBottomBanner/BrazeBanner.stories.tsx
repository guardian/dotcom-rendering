import type { BrazeBannerComponent as BrazeBannerComponentType } from '@guardian/braze-components';
import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';

type BrazeMessageProps = {
	[key: string]: string | undefined;
};

type NewsletterSubscribeCallback = (id: string) => Promise<void>;
const subscribeToNewsletter: NewsletterSubscribeCallback = (id: string) =>
	Promise.resolve();

const fetchEmail: () => Promise<string | null> = () =>
	Promise.resolve('name@example.com');

export default {
	component: 'BrazeBanners',
	title: 'Components/StickyBottomBanner/BrazeBanners',
};

// Braze Banner story
// ---------------------------------------
export const BrazeBannerComponent = (
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
			header: args.header,
			body: args.body,
			boldText: args.boldText,
			buttonText: args.buttonText,
			buttonUrl: args.buttonUrl,
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

BrazeBannerComponent.args = {
	slotName: 'Banner',
	componentName: 'BannerWithLink',
	header: 'The Guardian’s impact in 2021',
	body: 'Thanks to your generous support in this extraordinary year, our open, independent journalism was read by millions. From the pandemic to our urgent coverage of the climate crisis, our reporting had a powerful impact.',
	imageUrl:
		'https://i.guim.co.uk/img/media/35d403182e4b262d37385281b19b763ee6b32f6a/58_0_1743_1046/master/1743.png?width=930&quality=45&auto=format&s=9ecd82413fef9883c1e7a0df2bf6abb1',
	buttonText: 'Take a look back',
	buttonUrl:
		'https://www.theguardian.com/info/ng-interactive/2020/dec/21/the-guardian-in-2020?INTCMP=gdnwb_mrtn_banner_edtrl_MK_SU_WorkingReport2020Canvas',
	boldText:
		'Read our look-back to see how Guardian journalism made a difference.',
	ophanComponentId: 'change_me_ophan_component_id',
};

BrazeBannerComponent.storyName = 'BannerWithLink';

// Braze App Banner story
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
			header: args.header,
			body: args.body,
			cta: args.cta,
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
	slotName: 'Banner',
	componentName: 'AppBanner',
	header: 'A note to our digital subscribers',
	body: 'Hi John, did you know that as a Guardian digital subscriber you can enjoy an enhanced experience of our quality, independent journalism on all your devices, including The Guardian Live app.',
	cta: 'Search for "Guardian live news"',
	imageUrl:
		'https://i.guim.co.uk/img/media/de6813b4dd9b9805a2d14dd6af14ae2b48e2e19e/0_0_930_520/master/930.png?quality=45&width=930&s=0beb53509265d32e3d201aa3981323bb',
};

BrazeAppBannerComponent.storyName = 'AppBanner';

// Braze Newsletter Banner story
// ---------------------------------------
export const BrazeNewsletterBannerComponent = (
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
			header: args.header,
			newsletterId: args.newsletterId,
			frequency: args.frequency,
			body: args.body,
			boldText: args.boldText,
			secondParagraph: args.secondParagraph,
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

BrazeNewsletterBannerComponent.args = {
	slotName: 'Banner',
	componentName: 'BannerNewsletter',
	ophanComponentId: 'change_me_ophan_component_id',
	header: 'The Morning Briefing',
	newsletterId: '4156',
	frequency: 'Every day',
	body: 'Whether it’s the latest manoeuvring in global politics or the ‘and finally’ story that everyone’s talking about, you’ll be bang up to date with the news that counts.',
	boldText: 'Sign up today!',
	secondParagraph:
		'We thought you should know this newsletter may contain information about Guardian products and services.',
	imageUrl:
		'https://i.guim.co.uk/img/media/568c6031be78dab6f6c28336010884f3ebd0f97c/0_0_1936_1936/master/1936.png?width=196&quality=45&auto=format&s=2a3630e9625620d5726c31c5cdbf4772',
};

BrazeNewsletterBannerComponent.storyName = 'BannerNewsletter';

// Braze Styleable Banner story
// ---------------------------------------
export const BrazeStyleableBannerComponent = (
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
			styleBackground: args.styleBackground,
			header: args.header,
			styleHeader: args.styleHeader,
			body: args.body,
			styleBody: args.styleBody,
			highlight: args.highlight,
			styleHighlight: args.styleHighlight,
			styleHighlightBackground: args.styleHighlightBackground,
			buttonText: args.buttonText,
			buttonUrl: args.buttonUrl,
			showPaymentIcons: args.showPaymentIcons,
			styleButton: args.styleButton,
			styleButtonBackground: args.styleButtonBackground,
			styleButtonHover: args.styleButtonHover,
			imageUrl: args.imageUrl,
			imageAltText: args.imageAltText,
			imagePosition: args.imagePosition,
			styleClose: args.styleClose,
			styleCloseBackground: args.styleCloseBackground,
			styleCloseHover: args.styleCloseHover,
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

BrazeStyleableBannerComponent.args = {
	slotName: 'Banner',
	styleBackground: '#ededed',
	header: 'The Guardian’s impact in 2021',
	styleHeader: '#333333',
	body: 'Thanks to your generous support in this extraordinary year, our open, independent journalism was read by millions. From the pandemic to our urgent coverage of the climate crisis, our reporting had a powerful impact.',
	styleBody: '#333333',
	highlight:
		'Read our look-back to see how Guardian journalism made a difference.',
	styleHighlight: '#333333',
	styleHighlightBackground: '#ededed',
	buttonText: 'Take a look back',
	buttonUrl:
		'https://www.theguardian.com/info/ng-interactive/2020/dec/21/the-guardian-in-2020?INTCMP=gdnwb_mrtn_banner_edtrl_MK_SU_WorkingReport2020Canvas',
	showPaymentIcons: 'false',
	styleButton: '#ffffff',
	styleButtonBackground: '#052962',
	styleButtonHover: '#234b8a',
	imageUrl:
		'https://i.guim.co.uk/img/media/35d403182e4b262d37385281b19b763ee6b32f6a/58_0_1743_1046/master/1743.png?width=930&quality=45&auto=format&s=9ecd82413fef9883c1e7a0df2bf6abb1',
	imageAltText: 'Accessible image description',
	imagePosition: 'bottom',
	styleClose: '#052962',
	styleCloseBackground: '#ededed',
	styleCloseHover: '#e5e5e5',
	componentName: 'StyleableBannerWithLink',
	ophanComponentId: 'change_me_ophan_component_id',
};

BrazeStyleableBannerComponent.storyName = 'StyleableBannerWithLink';
