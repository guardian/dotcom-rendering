import React, { useEffect, useState } from 'react';
import * as emotion from 'emotion';
import * as emotionCore from '@emotion/core';
import * as emotionTheming from 'emotion-theming';
import { getZIndex } from '@root/src/web/lib/getZIndex';
import { Props as BrazeBannerProps } from '@guardian/braze-components';
import {
	submitComponentEvent,
	record,
} from '@root/src/web/browser/ophan/ophan';
import { initPerf } from '@root/src/web/browser/initPerf';
import {
	hasCurrentBrazeUser,
	setHasCurrentBrazeUser,
	clearHasCurrentBrazeUser,
} from '@root/src/web/lib/hasCurrentBrazeUser';
import { checkBrazeDependencies } from '@root/src/web/lib/braze/checkBrazeDependencies';
import { CanShowResult } from './bannerPicker';

type Meta = {
	dataFromBraze: {
		[key: string]: string;
	};
	logImpressionWithBraze: () => void;
	logButtonClickWithBraze: (id: number) => void;
};

type Props = {
	meta: Meta;
};

const containerStyles = emotion.css`
    position: fixed;
    bottom: -1px;
    width: 100%;
    ${getZIndex('banner')}
`;

const SDK_OPTIONS = {
	enableLogging: false,
	noCookies: true,
	baseUrl: 'https://sdk.fra-01.braze.eu/api/v3',
	sessionTimeoutInSeconds: 1,
	minimumIntervalBetweenTriggerActionsInSeconds: 0,
};

const getMessageFromBraze = async (
	apiKey: string,
	brazeUuid: string,
): Promise<CanShowResult> => {
	const sdkLoadTiming = initPerf('braze-sdk-load');
	sdkLoadTiming.start();

	const { default: appboy } = await import(
		/* webpackChunkName: "braze-web-sdk-core" */ '@braze/web-sdk-core'
	);

	const sdkLoadTimeTaken = sdkLoadTiming.end();
	record({
		component: 'braze-sdk-load-timing',
		value: sdkLoadTimeTaken,
	});

	const appboyTiming = initPerf('braze-appboy');
	appboyTiming.start();

	appboy.initialize(apiKey, SDK_OPTIONS);

	const canShowPromise: Promise<CanShowResult> = new Promise((resolve) => {
		let subscriptionId: string | undefined;

		const callback = (message: any) => {
			const { extras } = message;

			const logButtonClickWithBraze = (internalButtonId: number) => {
				const thisButton = new appboy.InAppMessageButton(
					`Button: ID ${internalButtonId}`,
					undefined,
					undefined,
					undefined,
					undefined,
					undefined,
					internalButtonId,
				);
				appboy.logInAppMessageButtonClick(thisButton, message);
			};

			const logImpressionWithBraze = () => {
				// Log the impression with Braze
				appboy.logInAppMessageImpression(message);
			};

			if (extras) {
				const meta = {
					dataFromBraze: extras,
					logImpressionWithBraze,
					logButtonClickWithBraze,
				};

				resolve({ result: true, meta });
			} else {
				resolve({ result: false });
			}

			// Unsubscribe
			if (subscriptionId) {
				appboy.removeSubscription(subscriptionId);
			}
		};

		// Keep hold of the subscription ID so that we can unsubscribe in the
		// callback, ensuring that the callback is only invoked once per page
		subscriptionId = appboy.subscribeToInAppMessage(callback);

		setHasCurrentBrazeUser();
		appboy.changeUser(brazeUuid);
		appboy.openSession();
	});

	canShowPromise
		.then(() => {
			const appboyTimeTaken = appboyTiming.end();

			record({
				component: 'braze-appboy-timing',
				value: appboyTimeTaken,
			});
		})
		.catch(() => {
			appboyTiming.clear();
			// eslint-disable-next-line no-console
			console.log('Appboy Timing failed.');
		});

	return canShowPromise;
};

const FORCE_BRAZE_ALLOWLIST = [
	'preview.gutools.co.uk',
	'preview.code.dev-gutools.co.uk',
	'localhost',
	'm.thegulocal.com',
];

const getBrazeMetaFromQueryString = (): Meta | null => {
	if (URLSearchParams) {
		const qsArg = 'force-braze-message';

		const params = new URLSearchParams(window.location.search);
		const value = params.get(qsArg);
		if (value) {
			if (!FORCE_BRAZE_ALLOWLIST.includes(window.location.hostname)) {
				// eslint-disable-next-line no-console
				console.log(`${qsArg} is not supported on this domain`);
				return null;
			}

			try {
				const dataFromBraze = JSON.parse(value);

				return {
					dataFromBraze,
					logImpressionWithBraze: () => {},
					logButtonClickWithBraze: () => {},
				};
			} catch (e) {
				// Parsing failed. Log a message and fall through.
				// eslint-disable-next-line no-console
				console.log(`There was an error with ${qsArg}: `, e.message);
			}
		}
	}

	return null;
};

const maybeWipeUserData = async (
	apiKey?: string,
	brazeUuid?: null | string,
): Promise<void> => {
	if (apiKey && !brazeUuid && hasCurrentBrazeUser()) {
		const { default: appboy } = await import(
			/* webpackChunkName: "braze-web-sdk-core" */ '@braze/web-sdk-core'
		);

		appboy.initialize(apiKey, SDK_OPTIONS);

		try {
			appboy.wipeData();
			clearHasCurrentBrazeUser();
		} catch (error) {
			window.guardian.modules.sentry.reportError(error, 'braze-banner');
		}
	}
};

// We can show a Braze banner if:
// - The Braze switch is on
// - We have a Braze API key
// - The user should have support messaging hidden, implying they are a contributor or subscriber
// - We're not on a Glabs paid content page
// - We've got a Braze UUID from the API, given a user's ID Creds
// - The user has given Consent via CCPA or TCFV2
// - The Braze websdk appboy initialisation does not throw an error
// - The Braze app Boy subscription to in app message returns meta info
// OR
// - The force-braze-message query string arg is passed
export const canShow = async (
	isSignedIn: boolean,
	idApiUrl: string,
): Promise<CanShowResult> => {
	const bannerTiming = initPerf('braze-banner');
	bannerTiming.start();

	const forcedBrazeMeta = getBrazeMetaFromQueryString();
	if (forcedBrazeMeta) {
		return {
			result: true,
			meta: forcedBrazeMeta,
		};
	}

	const dependenciesResult = await checkBrazeDependencies(
		isSignedIn,
		idApiUrl,
	);

	if (!dependenciesResult.isSuccessful) {
		const { failure, data } = dependenciesResult;
		if (SDK_OPTIONS.enableLogging) {
			// eslint-disable-next-line no-console
			console.log(
				`Not attempting to show Braze messages. Dependency ${failure.field} failed with ${failure.data}.`,
			);
		}

		await maybeWipeUserData(
			data.apiKey as string | undefined,
			data.brazeUuid as string | null | undefined,
		);

		return { result: false };
	}

	const { data } = dependenciesResult;

	try {
		const result = await getMessageFromBraze(
			data.apiKey as string,
			data.brazeUuid as string,
		);

		const timeTaken = bannerTiming.end();
		record({
			component: 'braze-banner-timing',
			value: timeTaken,
		});

		return result;
	} catch (e) {
		bannerTiming.clear();
		return { result: false };
	}
};

type InnerProps = {
	meta: Meta;
	BrazeComponent: React.FC<BrazeBannerProps>;
};

const BrazeBannerWithSatisfiedDependencies = ({
	BrazeComponent,
	meta,
}: InnerProps) => {
	useEffect(() => {
		// Log the impression with Braze
		meta.logImpressionWithBraze();

		// Log VIEW event with Ophan
		submitComponentEvent({
			component: {
				componentType: 'RETENTION_ENGAGEMENT_BANNER',
				id: meta.dataFromBraze.componentName,
			},
			action: 'VIEW',
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={containerStyles}>
			<BrazeComponent
				logButtonClickWithBraze={meta.logButtonClickWithBraze}
				submitComponentEvent={submitComponentEvent}
				componentName={meta.dataFromBraze.componentName}
				brazeMessageProps={meta.dataFromBraze}
			/>
		</div>
	);
};

export const BrazeBanner = ({ meta }: Props) => {
	const [BrazeComponent, setBrazeComponent] = useState<
		React.FC<BrazeBannerProps>
	>();

	useEffect(() => {
		if (meta) {
			// TODO: unify the way we handle sharing these deps (this is
			// duplicated in SlotBodyEnd). Probably via the automat client
			// library.
			window.guardian.automat = {
				react: React,
				preact: React,
				emotionCore,
				emotionTheming,
				emotion,
			};

			import(
				/* webpackChunkName: "guardian-braze-components" */ '@guardian/braze-components'
			)
				.then((module) => {
					setBrazeComponent(() => module.BrazeMessage);
				})
				.catch((error) =>
					window.guardian.modules.sentry.reportError(
						error,
						'braze-banner',
					),
				);
		}
	}, [meta]);

	if (BrazeComponent && meta) {
		return (
			<BrazeBannerWithSatisfiedDependencies
				BrazeComponent={BrazeComponent}
				meta={meta}
			/>
		);
	}

	return <div />;
};
