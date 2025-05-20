import { css } from '@emotion/react';
import { getCookie, isUndefined } from '@guardian/libs';
import type { ComponentEvent } from '@guardian/ophan-tracker-js';
import { palette, space } from '@guardian/source/foundations';
import { getGutterLiveblog } from '@guardian/support-dotcom-components';
import type {
	ModuleData,
	ModuleDataResponse,
} from '@guardian/support-dotcom-components/dist/dotcom/types';
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

interface LiveblogGutterAskBuilderProps {
	sectionId: string | undefined;
	tags: TagType[];
	contributionsServiceUrl: string;
	countryCode: string;
	pageViewId: string;
	pageUrl: string;
	pageId?: string;
}

const LiveblogGutterAskBuilder = ({
	sectionId,
	tags,
	contributionsServiceUrl,
	countryCode,
	pageViewId,
	pageUrl,
	pageId,
}: LiveblogGutterAskBuilderProps) => {
	const [gutterVariantResponse, setGutterVariantResponse] =
		useState<ModuleData<GutterProps> | null>(null);
	const [GutterWrapperComponent, setGutterWrapperComponent] =
		useState<React.ElementType<GutterProps>>();

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

		// CALL the API
		const payload: GutterPayload = {
			targeting: {
				showSupportMessaging: !hideSupportMessagingForUser,
				countryCode,
				mvtId: Number(
					getCookie({ name: 'GU_mvt_id', shouldMemoize: true }),
				),
				isSignedIn,
				tagIds,
				sectionId,
				pageId,
			},
		};

		getGutterLiveblog(contributionsServiceUrl, payload)
			.then((response: ModuleDataResponse<GutterProps>) => {
				if (response.data) {
					const { module } = response.data;
					setGutterVariantResponse(module);

					import(`./marketing/gutters/GutterAskWrapper`)
						.then((gutterModule) => {
							setGutterWrapperComponent(
								() => gutterModule.GutterAskWrapper,
							);
						})
						.catch((err) => {
							const msg = `Error importing GutterLiveBlog: ${String(
								err,
							)}`;
							window.guardian.modules.sentry.reportError(
								new Error(msg),
								'rr-gutter-liveblog-dynamic-import',
							);
						});
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
		pageId,
	]);

	if (gutterVariantResponse && !isUndefined(GutterWrapperComponent)) {
		const { props } = gutterVariantResponse;

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
			submitComponentEvent: (componentEvent: ComponentEvent) =>
				submitComponentEvent(componentEvent, renderingTarget),
		};

		return (
			<>
				<div css={stickyLeft}>
					<GutterWrapperComponent {...enrichedProps} />
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

interface LiveblogGutterAskWrapperProps {
	shouldHideReaderRevenueOnArticle: boolean;
	sectionId: string | undefined;
	tags: TagType[];
	contributionsServiceUrl: string;
	pageUrl: string;
	pageId?: string;
}

export const LiveblogGutterAskWrapper = ({
	shouldHideReaderRevenueOnArticle,
	sectionId,
	tags,
	contributionsServiceUrl,
	pageUrl,
	pageId,
}: LiveblogGutterAskWrapperProps) => {
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
		<LiveblogGutterAskBuilder
			sectionId={sectionId}
			tags={tags}
			contributionsServiceUrl={contributionsServiceUrl}
			countryCode={countryCode}
			pageViewId={pageViewId}
			pageUrl={pageUrl}
			pageId={pageId}
		/>
	);
};
