/**
 * @file
 * This file was largely lifted from https://github.com/guardian/dotcom-rendering/blob/b3ef504acd00d48e765e0656be5ffbad88981a39/dotcom-rendering/src/components/SupportTheG.importable.tsx
 */
import { css } from '@emotion/react';
import type { OphanComponentEvent } from '@guardian/libs';
import { getCookie, isUndefined } from '@guardian/libs';
import { getHeader } from '@guardian/support-dotcom-components';
import type {
	HeaderPayload,
	ModuleData,
	ModuleDataResponse,
} from '@guardian/support-dotcom-components/dist/dotcom/types';
import { useEffect, useState } from 'react';
import { submitComponentEvent } from '../client/ophan/ophan';
import {
	getPurchaseInfo,
	shouldHideSupportMessaging,
} from '../lib/contributions';
import { setAutomat } from '../lib/setAutomat';
import { useIsSignedIn } from '../lib/useAuthStatus';
import { useCountryCode } from '../lib/useCountryCode';
import { usePageViewId } from '../lib/usePageViewId';
import { useConfig } from './ConfigContext';

type Props = {
	contributionsServiceUrl: string;
};

const headerStyles = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow-wrap: nowrap;
`;

type ReaderRevenueLinksRemoteProps = {
	countryCode: string;
	pageViewId: string;
	contributionsServiceUrl: string;
};

const ReaderRevenueLinksRemote = ({
	countryCode,
	pageViewId,
	contributionsServiceUrl,
}: ReaderRevenueLinksRemoteProps) => {
	const [supportHeaderResponse, setSupportHeaderResponse] =
		useState<ModuleData | null>(null);
	const [SupportHeader, setSupportHeader] =
		useState<React.ElementType | null>(null);
	const isSignedIn = useIsSignedIn();

	const { renderingTarget } = useConfig();

	useEffect((): void => {
		if (isUndefined(countryCode) || isSignedIn === 'Pending') {
			return;
		}

		const hideSupportMessagingForUser =
			shouldHideSupportMessaging(isSignedIn);
		if (hideSupportMessagingForUser === 'Pending') {
			// We don't yet know the user's supporter status
			return;
		}

		setAutomat();

		const requestData: HeaderPayload = {
			tracking: {
				ophanPageId: pageViewId,
				platformId: 'GUARDIAN_WEB',
				referrerUrl: window.location.origin + window.location.pathname,
				clientName: 'dcr',
			},
			targeting: {
				showSupportMessaging: !hideSupportMessagingForUser,
				countryCode,
				mvtId: Number(
					getCookie({ name: 'GU_mvt_id', shouldMemoize: true }),
				),
				purchaseInfo: getPurchaseInfo(),
				isSignedIn,
			},
		};

		getHeader(contributionsServiceUrl, requestData)
			.then((response: ModuleDataResponse) => {
				if (!response.data) {
					return null;
				}

				const { module } = response.data;
				setSupportHeaderResponse(module);

				return (
					module.name === 'SignInPromptHeader'
						? /* webpackChunkName: "sign-in-prompt-header" */
						  import(`./marketing/header/SignInPromptHeader`)
						: /* webpackChunkName: "header" */
						  import(`./marketing/header/Header`)
				).then((headerModule: { [key: string]: React.ElementType }) => {
					setSupportHeader(() => headerModule[module.name] ?? null);
				});
			})
			.catch((error) => {
				const msg = `Error importing RR header links: ${String(error)}`;

				console.log(msg);
				window.guardian.modules.sentry.reportError(
					new Error(msg),
					'rr-header-links',
				);
			});
	}, [countryCode, isSignedIn, contributionsServiceUrl, pageViewId]);

	if (SupportHeader !== null && supportHeaderResponse) {
		return (
			<div css={headerStyles}>
				{}
				<SupportHeader
					submitComponentEvent={(
						componentEvent: OphanComponentEvent,
					) =>
						void submitComponentEvent(
							componentEvent,
							renderingTarget,
						)
					}
					{...supportHeaderResponse.props}
				/>
			</div>
		);
	}

	return null;
};

/**
 * Shows support messaging and a CTA (call to action) button in the top bar
 * Messaging comes from the RRCP (reader revenue control panel) via the
 * contributions service
 *
 * ## Why does this need to be an Island?
 *
 * Reader revenue links are entirely client-side and specific to a unique
 * page view. They also relying on getting a country code.
 *
 * ---
 *
 * (No visual story exists)
 */
export const TopBarSupport = ({ contributionsServiceUrl }: Props) => {
	const { renderingTarget } = useConfig();
	const countryCode = useCountryCode('support-the-Guardian');
	const pageViewId = usePageViewId(renderingTarget);

	if (isUndefined(countryCode) || isUndefined(pageViewId)) return null;

	return (
		<ReaderRevenueLinksRemote
			countryCode={countryCode}
			pageViewId={pageViewId}
			contributionsServiceUrl={contributionsServiceUrl}
		/>
	);
};
