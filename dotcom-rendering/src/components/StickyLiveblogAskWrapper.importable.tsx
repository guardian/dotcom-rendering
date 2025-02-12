/**
 * @file
 * This is a hard coded support ask as a test to see if it works.
 * If it does, it may become a more standard feature.
 */
import { css } from '@emotion/react';
import type { OphanComponentEvent } from '@guardian/libs';
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
import { useEffect, useState } from 'react';
import { submitComponentEvent } from '../client/ophan/ophan';
import { shouldHideSupportMessaging } from '../lib/contributions';
import { useIsSignedIn } from '../lib/useAuthStatus';
import { useCountryCode } from '../lib/useCountryCode';
import { usePageViewId } from '../lib/usePageViewId';
import type { TagType } from '../types/tag';
import { useConfig } from './ConfigContext';
import { GutterWrapper } from './marketing/gutters/gutterAsk';

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
	shouldHideReaderRevenueOnArticle: boolean;
	sectionId: string | undefined;
	tags: TagType[];
	contributionsServiceUrl: string;
	pageUrl: string;
}

interface GutterAskBuilderProps {
	shouldHideReaderRevenueOnArticle: boolean;
	sectionId: string | undefined;
	tags: TagType[];
	contributionsServiceUrl: string;
	countryCode: string;
	pageViewId: string;
	pageUrl: string;
}

const GutterAskBuilder = ({
	shouldHideReaderRevenueOnArticle,
	sectionId,
	tags,
	contributionsServiceUrl,
	countryCode,
	pageViewId,
	pageUrl,
}: GutterAskBuilderProps) => {
	const [supportGutterResponse, setSupportGutterResponse] =
		useState<ModuleData<GutterProps> | null>(null);

	const { renderingTarget } = useConfig();
	const isSignedIn = useIsSignedIn();

	// get gutter props
	useEffect((): void => {
		if (isUndefined(countryCode) || isSignedIn === 'Pending') {
			return;
		}
		const tagIds = tags.map((tag) => tag.id);

		const hideSupportMessagingForUser =
			shouldHideSupportMessaging(isSignedIn);
		if (hideSupportMessagingForUser === 'Pending') {
			// We don't yet know the user's supporter status
			return;
		}

		const payload: GutterPayload = {
			targeting: {
				showSupportMessaging:
					shouldHideSupportMessaging(isSignedIn) === false,
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
		countryCode,
		isSignedIn,
		contributionsServiceUrl,
		pageViewId,
		pageUrl,
		sectionId,
		tags,
	]);

	const canShow = !shouldHideReaderRevenueOnArticle; // TODO: anything else?

	if (supportGutterResponse) {
		const { props } = supportGutterResponse;

		const tracking: Tracking = {
			...props.tracking,
			ophanPageId: pageViewId,
			platformId: 'GUARDIAN_WEB',
			referrerUrl: pageUrl,
		};

		const enrichedProps: GutterProps = {
			...props,
			tracking,
			countryCode,
			submitComponentEvent: (componentEvent: OphanComponentEvent) =>
				submitComponentEvent(componentEvent, renderingTarget),
		};

		return (
			<>
				{canShow && (
					<div css={stickyLeft}>
						<GutterWrapper {...enrichedProps} />
					</div>
				)}
			</>
		);
	} else {
		return <></>;
	}
};

export const StickyLiveblogAskWrapper = ({
	shouldHideReaderRevenueOnArticle,
	sectionId,
	tags,
	contributionsServiceUrl,
	pageUrl,
}: StickyLiveblogAskWrapperProps) => {
	const whatAmI = 'sticky-liveblog-ask'; // TODO: eventually this will be renamed.
	const { renderingTarget } = useConfig();
	const countryCode = useCountryCode(whatAmI);
	const pageViewId = usePageViewId(renderingTarget);

	if (isUndefined(countryCode) || isUndefined(pageViewId)) return null;

	return (
		<GutterAskBuilder
			shouldHideReaderRevenueOnArticle={shouldHideReaderRevenueOnArticle}
			sectionId={sectionId}
			tags={tags}
			contributionsServiceUrl={contributionsServiceUrl}
			countryCode={countryCode}
			pageViewId={pageViewId}
			pageUrl={pageUrl}
		/>
	);
};
