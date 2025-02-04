/**
 * @file
 * This is a hard coded support ask as a test to see if it works.
 * If it does, it may become a more standard feature.
 */
import { css } from '@emotion/react';
import { palette, space } from '@guardian/source/foundations';
import type { Tracking } from '@guardian/support-dotcom-components/dist/shared/types/props/shared';
import { useEffect, useMemo, useState } from 'react';
import { submitComponentEvent } from '../client/ophan/ophan';
import { shouldHideSupportMessaging } from '../lib/contributions';
import { useIsSignedIn } from '../lib/useAuthStatus';
import { useCountryCode } from '../lib/useCountryCode';
import { usePageViewId } from '../lib/usePageViewId';
import { useConfig } from './ConfigContext';
import { GutterAsk } from './marketing/gutters/gutterAsk';
import { props } from './marketing/gutters/utils/storybook';
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
}

const { variant } = props; // TODO: temporary - to be replaced when SDC ready
const whatAmI = 'sticky-liveblog-ask'; // TODO: eventually this will be renamed.

export const StickyLiveblogAskWrapper: ReactComponent<
	StickyLiveblogAskWrapperProps
> = ({ referrerUrl, shouldHideReaderRevenueOnArticle }) => {
	const { renderingTarget } = useConfig();
	const countryCode = useCountryCode(whatAmI);
	const pageViewId = usePageViewId(renderingTarget);

	// should we show ourselves?
	const [showSupportMessagingForUser, setShowSupportMessaging] =
		useState<boolean>(false);
	const isSignedIn = useIsSignedIn();

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
			abTestName: '', // stop tracking AB test.
			abTestVariant: '', // stop tracking AB test.
			campaignCode: whatAmI,
			componentType: 'ACQUISITIONS_OTHER', // TODO - this will change in future
		};
	}, [pageViewId, referrerUrl]);

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

	useEffect(() => {
		const baseUrl = variant.content.cta.baseUrl;
		variant.content.cta.baseUrl = addRegionIdAndTrackingParamsToSupportUrl(
			baseUrl,
			tracking,
			undefined,
			countryCode,
		);
	}, [countryCode, tracking]);

	return (
		<>
			{canShow && (
				<div css={stickyLeft}>
					<GutterAsk variant={variant} onCtaClick={onCtaClick} />
				</div>
			)}
		</>
	);
};
