/**
 * @file
 * This is a hard coded support ask as a test to see if it works.
 * If it does, it may become a more standard feature.
 */
import { css } from '@emotion/react';
import { getCookie, isUndefined } from '@guardian/libs';
import { palette, space } from '@guardian/source/foundations';
import { getGutterLiveblog } from '@guardian/support-dotcom-components';
import type {
	ModuleData,
	ModuleDataResponse,
} from '@guardian/support-dotcom-components/dist/dotcom';
import type {
	GutterPayload,
	GutterProps,
} from '@guardian/support-dotcom-components/dist/shared/types';
import type { Tracking } from '@guardian/support-dotcom-components/dist/shared/types/props/shared';
import { useEffect, useMemo, useState } from 'react';
import { submitComponentEvent } from '../client/ophan/ophan';
import { shouldHideSupportMessaging } from '../lib/contributions';
import { useIsSignedIn } from '../lib/useAuthStatus';
import { useCountryCode } from '../lib/useCountryCode';
import { usePageViewId } from '../lib/usePageViewId';
import type { TagType } from '../types/tag';
import { useConfig } from './ConfigContext';
import { GutterAsk } from './marketing/gutters/gutterAsk';
import type { ReactComponent } from './marketing/lib/ReactComponent';
import {
	addRegionIdAndTrackingParamsToSupportUrl,
	createClickEventFromTracking,
	createInsertEventFromTracking,
} from './marketing/lib/tracking';

// CSS Styling
// -------------------------------------------

// outer container handles the position and stickiness
const stickyLeft = css`
	background: ${palette.neutral[100]};
	position: sticky;
	top: ${space[3]}px;
	width: 220px;
	margin-left: ${space[5]}px;
	margin-top: ${space[6]}px;
`;

// -------------------------------------------

// StickyLiveblogAskWrapper to allow us to create story
interface StickyLiveblogAskWrapperProps {
	referrerUrl: string;
	shouldHideReaderRevenueOnArticle: boolean;
	sectionId: string | undefined;
	tags: TagType[];
	contributionsServiceUrl: string;
}

const whatAmI = 'sticky-liveblog-ask'; // TODO: eventually this will be renamed.

export const StickyLiveblogAskWrapper: ReactComponent<
	StickyLiveblogAskWrapperProps
> = ({
	referrerUrl,
	shouldHideReaderRevenueOnArticle,
	sectionId,
	tags,
	contributionsServiceUrl,
}) => {
	const { renderingTarget } = useConfig();
	const countryCode = useCountryCode(whatAmI);
	const pageViewId = usePageViewId(renderingTarget);

	const [showSupportMessagingForUser, setShowSupportMessaging] =
		useState<boolean>(false);
	const [supportGutterResponse, setSupportGutterResponse] =
		useState<ModuleData<GutterProps> | null>(null);

	const isSignedIn = useIsSignedIn();
	const tagIds = tags.map((tag) => tag.id);

	// get gutter props
	useEffect((): void => {
		if (isUndefined(countryCode) || isSignedIn === 'Pending') {
			return;
		}

		const payload: GutterPayload = {
			tracking: {
				ophanPageId: window.guardian.config.ophan.pageViewId,
				platformId: 'GUARDIAN_WEB',
				referrerUrl: window.location.origin + window.location.pathname,
				clientName: 'dcr',
			},
			targeting: {
				showSupportMessaging: showSupportMessagingForUser,
				countryCode,
				mvtId: Number(
					getCookie({ name: 'GU_mvt_id', shouldMemoize: true }),
				),
				isSignedIn,
				tagIds,
				sectionId,
			},
		};

		getGutterLiveblog(contributionsServiceUrl, payload)
			.then((response: ModuleDataResponse<GutterProps>) => {
				if (!response.data) {
					throw new Error('Not response.data returned'); // TODO: appropriate?
				}

				const { module } = response.data;
				setSupportGutterResponse(module);
			})
			.catch((error) => {
				const msg = `Error importing Gutter Props: ${String(error)}`;
				console.log(msg);
				// TODO: where to log this?
			});
	}, [
		contributionsServiceUrl,
		countryCode,
		isSignedIn,
		sectionId,
		showSupportMessagingForUser,
		tagIds,
	]);

	useEffect(() => {
		if (isSignedIn !== 'Pending') {
			setShowSupportMessaging(
				shouldHideSupportMessaging(isSignedIn) === false,
			);
		}
	}, [isSignedIn]);

	// tracking
	const tracking: Tracking = useMemo(() => {
		return {
			ophanPageId: pageViewId ?? '',
			platformId: 'GUARDIAN_WEB',
			clientName: 'dcr',
			referrerUrl,
			// message tests
			abTestName: '', // TODO: pull this from SDC
			abTestVariant: '', // TODO: pull this from SDC
			campaignCode: whatAmI,
			componentType: 'ACQUISITIONS_OTHER', // TODO - this will change in future
		};
	}, [pageViewId, referrerUrl]);

	const baseUrl = supportGutterResponse?.props.content.cta!.baseUrl; // TODO: forced to be defined - correct?
	const urlWithRegionAndTracking = addRegionIdAndTrackingParamsToSupportUrl(
		baseUrl!, // TODO: forced to be defined - correct?
		tracking,
		undefined,
		countryCode,
	);

	const canShow =
		showSupportMessagingForUser && !shouldHideReaderRevenueOnArticle;

	// send event regardless of variant or control
	// but only where they *could* see the component.
	useEffect(() => {
		if (canShow) {
			// For ophan
			void submitComponentEvent(
				createInsertEventFromTracking(tracking, tracking.campaignCode),
				renderingTarget,
			);
		}
	}, [tracking, renderingTarget, canShow]);

	const onCtaClick = () => {
		void submitComponentEvent(
			createClickEventFromTracking(tracking, tracking.campaignCode),
			renderingTarget,
		);
	};

	return (
		<>
			{canShow && (
				<div css={stickyLeft}>
					<GutterAsk
						variant={supportGutterResponse?.props.content}
						enrichedUrl={urlWithRegionAndTracking}
						onCtaClick={onCtaClick}
					/>
				</div>
			)}
		</>
	);
};
