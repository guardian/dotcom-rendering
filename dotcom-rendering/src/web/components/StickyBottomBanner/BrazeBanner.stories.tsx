import type { CommonBannerComponentProps as BrazeBannerProps } from '@guardian/braze-components';
import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';

export default {
	component: 'BrazeBanner',
	title: 'Components/StickyBottomBanner/BrazeBanner',
};

export const DefaultStory = (): ReactElement => {
	const [BrazeMessage, setBrazeMessage] =
		useState<React.FC<BrazeBannerProps>>();

	useEffect(() => {
		import(
			/* webpackChunkName: "guardian-braze-components" */ '@guardian/braze-components'
		)
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
		const header = 'A note to our digital subscribers';
		const body =
			'Hi John, did you know that as a Guardian digital subscriber you can enjoy an enhanced experience of our quality, independent journalism on all your devices, including The Guardian Live app.';
		const componentName = 'DigitalSubscriberAppBanner';

		return (
			<BrazeMessage
				componentName={componentName}
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
				brazeMessageProps={{
					header,
					body,
				}}
			/>
		);
	}

	return <div>Loading...</div>;
};

DefaultStory.story = { name: 'Braze Banner' };
