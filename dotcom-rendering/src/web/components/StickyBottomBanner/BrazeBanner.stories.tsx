import type { BrazeBannerComponent as BrazeBannerComponentType } from '@guardian/braze-components';
import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';

type BrazeMessageProps = {
	[key: string]: string | undefined;
};

export default {
	component: 'BrazeBanners',
	title: 'Components/StickyBottomBanner/BrazeBanners',
};

// Braze Banner
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
			/>
		);
	}
	return <div>Loading...</div>;
};

BrazeBannerComponent.args = {
	slotName: 'Banner',
	header: 'The Guardian’s impact in 2021',
	body: 'Thanks to your generous support in this extraordinary year, our open, independent journalism was read by millions. From the pandemic to our urgent coverage of the climate crisis, our reporting had a powerful impact.',
	imageUrl:
		'https://i.guim.co.uk/img/media/35d403182e4b262d37385281b19b763ee6b32f6a/58_0_1743_1046/master/1743.png?width=930&quality=45&auto=format&s=9ecd82413fef9883c1e7a0df2bf6abb1',
	buttonText: 'Take a look back',
	buttonUrl:
		'https://www.theguardian.com/info/ng-interactive/2020/dec/21/the-guardian-in-2020?INTCMP=gdnwb_mrtn_banner_edtrl_MK_SU_WorkingReport2020Canvas',
	boldText:
		'Read our look-back to see how Guardian journalism made a difference.',
	componentName: 'BannerWithLink',
	ophanComponentId: 'change_me_ophan_component_id',
};

BrazeBannerComponent.story = { name: 'BannerWithLink' };

// Braze App Banner
// ---------------------------------------
export const BrazeAppBannerComponent = (
	args: BrazeMessageProps & { componentName: string },
): ReactElement => {
	const [BrazeMessage, setBrazeMessage] =
		useState<typeof BrazeBannerComponentType>();

	useEffect(() => {
		import('@guardian/braze-components')
			.then((module) => {
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
			/>
		);
	}
	return <div>Loading...</div>;
};

BrazeAppBannerComponent.args = {
	slotName: 'Banner',
	header: 'A note to our digital subscribers',
	body: 'Hi John, did you know that as a Guardian digital subscriber you can enjoy an enhanced experience of our quality, independent journalism on all your devices, including The Guardian Live app.',
	componentName: 'AppBanner',
	cta: 'Search for "Guardian live news"',
	imageUrl:
		'https://i.guim.co.uk/img/media/de6813b4dd9b9805a2d14dd6af14ae2b48e2e19e/0_0_930_520/master/930.png?quality=45&width=930&s=0beb53509265d32e3d201aa3981323bb',
};

BrazeAppBannerComponent.story = { name: 'AppBanner' };

// Braze Digital Subscriber App Banner
// ---------------------------------------
export const BrazeDigitalSubscriberAppBannerComponent = (
	args: BrazeMessageProps & { componentName: string },
): ReactElement => {
	const [BrazeMessage, setBrazeMessage] =
		useState<typeof BrazeBannerComponentType>();

	useEffect(() => {
		import('@guardian/braze-components')
			.then((module) => {
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
			/>
		);
	}
	return <div>Loading...</div>;
};

BrazeDigitalSubscriberAppBannerComponent.args = {
	slotName: 'Banner',
	header: 'A note to our digital subscribers',
	body: 'Hi John, did you know that as a Guardian digital subscriber you can enjoy an enhanced experience of our quality, independent journalism on all your devices, including The Guardian Live app.',
	componentName: 'DigitalSubscriberAppBanner',
};

BrazeDigitalSubscriberAppBannerComponent.story = {
	name: 'DigitalSubscriberAppBanner',
};
