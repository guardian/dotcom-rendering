import { css } from '@emotion/react';
import type { BrazeBannerComponent } from '@guardian/braze-components/banner';
import type {
	BrazeArticleContext,
	BrazeMessagesInterface,
} from '@guardian/braze-components/logic';
import { useEffect, useState } from 'react';
import { submitComponentEvent } from '../../client/ophan/ophan';
import { reportErrorToSentry } from '../../lib/reportErrorToSentry';
import { getBrazeMetaFromUrlFragment } from '../../lib/braze/forceBrazeMessage';
import { suppressForTaylorReport } from '../../lib/braze/taylorReport';
import { lazyFetchEmailWithTimeout } from '../../lib/contributions';
import { getZIndex } from '../../lib/getZIndex';
import type { CanShowResult } from '../../lib/messagePicker';
import {
	getOptionsHeadersWithOkta,
	useAuthStatus,
} from '../../lib/useAuthStatus';
import type { TagType } from '../../types/tag';

type Meta = {
	dataFromBraze: { [key: string]: string };
	logImpressionWithBraze: () => void;
	logButtonClickWithBraze: (id: number) => void;
};

type Props = {
	meta: Meta;
	idApiUrl: string;
};

const containerStyles = css`
	position: fixed;
	bottom: -1px;
	width: 100%;
	${getZIndex('banner')}
`;

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
export const canShowBrazeBanner = async (
	brazeMessages: BrazeMessagesInterface,
	brazeArticleContext: BrazeArticleContext,
	tags: TagType[],
	shouldHideReaderRevenue: boolean,
): Promise<CanShowResult<Meta>> => {
	const forcedBrazeMeta = getBrazeMetaFromUrlFragment();
	if (forcedBrazeMeta) {
		return {
			show: true,
			meta: forcedBrazeMeta,
		};
	}

	if (shouldHideReaderRevenue) {
		return { show: false };
	}

	if (suppressForTaylorReport(tags)) {
		return { show: false };
	}

	try {
		const message = await brazeMessages.getMessageForBanner(
			brazeArticleContext,
		);

		const logButtonClickWithBraze = (internalButtonId: number) => {
			message.logButtonClick(internalButtonId);
		};

		const logImpressionWithBraze = () => {
			// Log the impression with Braze
			message.logImpression();
		};

		if (message.extras) {
			const meta = {
				dataFromBraze: message.extras,
				logImpressionWithBraze,
				logButtonClickWithBraze,
			};

			return { show: true, meta };
		}

		return { show: false };
	} catch (e) {
		return { show: false };
	}
};

type InnerProps = {
	meta: Meta;
	BrazeComponent: typeof BrazeBannerComponent;
	idApiUrl: string;
};

const BrazeBannerWithSatisfiedDependencies = ({
	BrazeComponent,
	meta,
	idApiUrl,
}: InnerProps) => {
	const authStatus = useAuthStatus();

	useEffect(() => {
		// Log the impression with Braze
		meta.logImpressionWithBraze();

		// Log VIEW event with Ophan
		void submitComponentEvent({
			component: {
				componentType: 'RETENTION_ENGAGEMENT_BANNER',
				id:
					meta.dataFromBraze.ophanComponentId ??
					meta.dataFromBraze.componentName,
			},
			action: 'VIEW',
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const componentName = meta.dataFromBraze.componentName;
	if (!componentName) return null;

	const subscribeToNewsletter = async (newsletterId: string) => {
		if (
			authStatus.kind == 'SignedInWithCookies' ||
			authStatus.kind == 'SignedInWithOkta'
		) {
			const options = getOptionsHeadersWithOkta(authStatus);

			await fetch(`${idApiUrl}/users/me/newsletters`, {
				method: 'PATCH',
				body: JSON.stringify({
					id: newsletterId,
					subscribed: true,
				}),
				...options,
			});
		}
	};

	const fetchEmail: () => Promise<string | null> =
		lazyFetchEmailWithTimeout(idApiUrl);

	return (
		<div css={containerStyles}>
			<BrazeComponent
				logButtonClickWithBraze={meta.logButtonClickWithBraze}
				submitComponentEvent={submitComponentEvent}
				componentName={componentName}
				brazeMessageProps={meta.dataFromBraze}
				subscribeToNewsletter={subscribeToNewsletter}
				fetchEmail={fetchEmail}
			/>
		</div>
	);
};

export const BrazeBanner = ({ meta, idApiUrl }: Props) => {
	const [BrazeComponent, setBrazeComponent] =
		useState<typeof BrazeBannerComponent>();

	useEffect(() => {
		import(
			/* webpackChunkName: "guardian-braze-components-banner" */ '@guardian/braze-components/banner'
		)
			.then((module) => {
				setBrazeComponent(() => module.BrazeBannerComponent);
			})
			.catch((error) => reportErrorToSentry(error, 'braze-banner'));
	}, []);

	return (
		<>
			{BrazeComponent ? (
				<BrazeBannerWithSatisfiedDependencies
					BrazeComponent={BrazeComponent}
					meta={meta}
					idApiUrl={idApiUrl}
				/>
			) : (
				<div />
			)}
		</>
	);
};
