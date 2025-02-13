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
import { GutterAskWrapper } from './marketing/gutters/GutterAsk';

interface GutterLiveblogAskBuilderProps {
	sectionId: string | undefined;
	tags: TagType[];
	contributionsServiceUrl: string;
	countryCode: string;
	pageViewId: string;
	pageUrl: string;
}

const GutterLiveblogAskBuilder = ({
	sectionId,
	tags,
	contributionsServiceUrl,
	countryCode,
	pageViewId,
	pageUrl,
}: GutterLiveblogAskBuilderProps) => {
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
				showSupportMessaging: hideSupportMessagingForUser,
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
				if (response.data) {
					const { module } = response.data;
					setSupportGutterResponse(module);
				}
			})
			.catch((error) => {
				const msg = `Error fetching gutter-ask tests: ${String(error)}`;

				console.log(msg);
				window.guardian.modules.sentry.reportError(
					new Error(msg),
					'rr-gutter-liveblog-ask-fetch',
				);
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
				<div css={stickyLeft}>
					<GutterAskWrapper {...enrichedProps} />
				</div>
			</>
		);
	} else {
		return <></>;
	}
};

// -------------------------------------------------------

// CSS outer container handles the position and stickiness
const stickyLeft = css`
	background: ${palette.neutral[100]};
	position: sticky;
	top: ${space[3]}px;
	width: 220px;
	margin-left: ${space[5]}px;
	margin-top: ${space[6]}px;
`;

interface StickyLiveblogAskWrapperProps {
	shouldHideReaderRevenueOnArticle: boolean;
	sectionId: string | undefined;
	tags: TagType[];
	contributionsServiceUrl: string;
	pageUrl: string;
}

export const StickyLiveblogAskWrapper = ({
	shouldHideReaderRevenueOnArticle,
	sectionId,
	tags,
	contributionsServiceUrl,
	pageUrl,
}: StickyLiveblogAskWrapperProps) => {
	const { renderingTarget } = useConfig();
	const countryCode = useCountryCode('liveblog-gutter-ask');
	const pageViewId = usePageViewId(renderingTarget);

	if (
		shouldHideReaderRevenueOnArticle ||
		isUndefined(countryCode) ||
		isUndefined(pageViewId)
	) {
		return null;
	}

	return (
		<GutterLiveblogAskBuilder
			sectionId={sectionId}
			tags={tags}
			contributionsServiceUrl={contributionsServiceUrl}
			countryCode={countryCode}
			pageViewId={pageViewId}
			pageUrl={pageUrl}
		/>
	);
};
