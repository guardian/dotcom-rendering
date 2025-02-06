import { css } from '@emotion/react';
import type { OphanComponentEvent } from '@guardian/libs';
import { getCookie, isUndefined, log, storage } from '@guardian/libs';
import { space } from '@guardian/source/foundations';
import { getEpicViewLog } from '@guardian/support-dotcom-components';
import type { EpicPayload } from '@guardian/support-dotcom-components/dist/dotcom/types';
import type {
	EpicProps,
	Tracking,
} from '@guardian/support-dotcom-components/dist/shared/types';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { submitComponentEvent } from '../client/ophan/ophan';
import { useArticleCounts } from '../lib/articleCount';
import {
	shouldHideSupportMessaging,
	useHasOptedOutOfArticleCount,
} from '../lib/contributions';
import { useIsSignedIn } from '../lib/useAuthStatus';
import { useCountryCode } from '../lib/useCountryCode';
import { usePageViewId } from '../lib/usePageViewId';
import { useSDCLiveblogEpic } from '../lib/useSDC';
import type { RenderingTarget } from '../types/renderingTarget';
import type { TagType } from '../types/tag';

type Props = {
	sectionId: string;
	shouldHideReaderRevenue: boolean;
	isPaidContent: boolean;
	tags: TagType[];
	contributionsServiceUrl: string;
	pageId: string;
	keywordIds: string;
	renderingTarget: RenderingTarget;
};

const useEpic = ({ name }: { name: string }) => {
	// Using state here to store the Epic component that gets imported allows
	// us to render it with React (instead of inserting it into the dom manually)
	const [Epic, setEpic] = useState<React.ElementType<EpicProps>>();

	useEffect(() => {
		import(
			/* webpackChunkName: "contributions-liveblog-epic" */ `./marketing/epics/ContributionsLiveblogEpic`
		)
			.then((epicModule) => {
				setEpic(() => epicModule.ContributionsLiveblogEpic);
			})
			.catch((err) => {
				const msg = `Error importing LiveBlog epic: ${String(err)}`;
				window.guardian.modules.sentry.reportError(
					new Error(msg),
					'liveblog-epic',
				);
			});
	}, [name]);

	return { Epic };
};

const useMvtId = (isDev = false): number => {
	const [mvtId, setMvtId] = useState<number>(0);

	useEffect(() => {
		const cookie = getCookie({ name: 'GU_mvt_id', shouldMemoize: true });

		if (cookie === null) return;

		const id = Number(cookie) || 0;

		setMvtId(id);
	}, [isDev]);

	return mvtId;
};

/**
 * usePayload
 *
 * takes a series of CAPI values, reads consent, the users country, some cookie
 * values and then constructs a config object with `tracking` and `targeting`
 * properties
 *
 * @returns the payload object required to make the POST request to contributions
 */
const usePayload = ({
	shouldHideReaderRevenue,
	sectionId,
	isPaidContent,
	tags,
	pageId,
	ophanPageViewId,
	pageUrl,
}: {
	shouldHideReaderRevenue: boolean;
	sectionId: string;
	isPaidContent: boolean;
	tags: TagType[];
	host?: string;
	pageId: string;
	keywordIds: string;
	ophanPageViewId?: string;
	pageUrl: string;
}): EpicPayload | undefined => {
	const articleCounts = useArticleCounts(pageId, tags, 'LiveBlog');
	const hasOptedOutOfArticleCount = useHasOptedOutOfArticleCount();
	const countryCode = useCountryCode('liveblog-epic');
	const mvtId = useMvtId();
	const isSignedIn = useIsSignedIn();

	if (!ophanPageViewId) return;
	if (isSignedIn === 'Pending') return;
	const hideSupportMessagingForUser = shouldHideSupportMessaging(isSignedIn);
	if (hideSupportMessagingForUser === 'Pending') return;
	if (articleCounts === 'Pending') return;
	if (hasOptedOutOfArticleCount === 'Pending') return;
	log('dotcom', 'LiveBlogEpic has consent state');
	if (!countryCode) return;
	log('dotcom', 'LiveBlogEpic has countryCode');

	return {
		tracking: {
			ophanPageId: ophanPageViewId,
			platformId: 'GUARDIAN_WEB',
			clientName: 'dcr',
			referrerUrl: pageUrl,
		},
		targeting: {
			contentType: 'LiveBlog',
			sectionId,
			shouldHideReaderRevenue,
			isMinuteArticle: true,
			isPaidContent,
			tags,
			showSupportMessaging: !hideSupportMessagingForUser,
			mvtId,
			countryCode,
			epicViewLog: getEpicViewLog(storage.local),
			weeklyArticleHistory: articleCounts?.weeklyArticleHistory,
			hasOptedOutOfArticleCount,
			url: pageUrl,
			isSignedIn,
		},
	};
};

/**
 * Render
 *
 * Dynamically imports and renders a given module
 *
 * @param props
 * @param name string - The name of the component
 * @param props.props object - The props of the component
 * @returns The resulting react component
 */
const Render = ({ name, props }: { name: string; props: EpicProps }) => {
	const { Epic } = useEpic({ name });

	if (isUndefined(Epic)) return null;
	log('dotcom', 'LiveBlogEpic has the Epic');

	return (
		<aside
			css={css`
				margin-bottom: ${space[3]}px;
			`}
		>
			{}
			<Epic {...props} />
		</aside>
	);
};

/**
 * Using the payload, make a fetch request to contributions service
 */
const Fetch = ({
	payload,
	contributionsServiceUrl,
	ophanPageViewId,
	renderingTarget,
	pageUrl,
}: {
	payload: EpicPayload;
	contributionsServiceUrl: string;
	ophanPageViewId: string;
	renderingTarget: RenderingTarget;
	pageUrl: string;
}) => {
	const response = useSDCLiveblogEpic(contributionsServiceUrl, payload);

	// If we didn't get a module in response (or we're still waiting) do nothing. If
	// no epic should be shown the response is equal to {}, hence the Object.keys
	if (!response?.data || Object.keys(response).length === 0) {
		return null;
	}
	log('dotcom', 'LiveBlogEpic has a module');

	const { props } = response.data.module;

	const tracking: Tracking = {
		...props.tracking,
		ophanPageId: ophanPageViewId,
		platformId: 'GUARDIAN_WEB',
		referrerUrl: pageUrl,
	};

	// Add submitComponentEvent function to props to enable Ophan tracking in the component
	const enrichedProps: EpicProps = {
		...props,
		tracking,
		submitComponentEvent: (componentEvent: OphanComponentEvent) =>
			submitComponentEvent(componentEvent, renderingTarget),
	};

	// Take any returned module and render it
	return <Render name={response.data.module.name} props={enrichedProps} />;
};

function insertAfter(referenceNode: HTMLElement, newNode: Element) {
	referenceNode.parentNode?.insertBefore(newNode, referenceNode.nextSibling);
}

/**
 * LiveBlogEpic is the support epic which appears in-between blocks in blogs
 *
 * There are three main steps to create this epic:
 *
 * 1. usePayload - Build the payload. The config object we send to contributions
 * 2. Fetch - POST the payload to the contributions endpoint
 * 3. Render - Take the props and name data we got in response to our fetch and dynamically import
 *    and render the Epic component using it
 *
 * ## Why does this need to be an Island?
 *
 * All behaviour is client-side.
 *
 * ---
 *
 * (No visual story exist)
 */
export const LiveBlogEpic = ({
	sectionId,
	shouldHideReaderRevenue,
	isPaidContent,
	tags,
	contributionsServiceUrl,
	pageId,
	keywordIds,
	renderingTarget,
}: Props) => {
	log('dotcom', 'LiveBlogEpic started');

	const ophanPageViewId = usePageViewId(renderingTarget);

	const [pageUrl, setPageUrl] = useState<string | undefined>();

	useEffect(() => {
		setPageUrl(window.location.origin + window.location.pathname);
	}, []);

	// First construct the payload
	const payload = usePayload({
		shouldHideReaderRevenue,
		sectionId,
		isPaidContent,
		tags,
		pageId,
		keywordIds,
		ophanPageViewId,
		pageUrl,
	});
	if (!ophanPageViewId || !payload || !pageUrl) return null;

	/**
	 * Here we decide where to insert the epic.
	 *
	 * If the url contains a permalink then we
	 * want to insert it immediately after that block to prevent any CLS issues.
	 *
	 * Otherwise, we choose a random position near the top of the blog
	 */
	const epicPlaceholder = document.createElement('article');
	if (window.location.href.includes('#block-')) {
		// Because we're using a permalink there's a possibility the epic will render in
		// view. To prevent confusing layout shift we initially hide the message so that
		// we can reveal (animate in) it once it has been rendered
		epicPlaceholder.classList.add('pending');
		const blockId = window.location.hash.slice(1);
		const blockLinkedTo = document.getElementById(blockId);
		if (blockLinkedTo) {
			insertAfter(blockLinkedTo, epicPlaceholder);
		}
		epicPlaceholder.classList.add('reveal');
		epicPlaceholder.classList.remove('pending');
	} else {
		// This is a simple page load so we simply insert the epic somewhere near the top
		// of the blog
		const randomPosition = Math.floor(Math.random() * 3) + 1; // 1, 2 or 3
		const aBlockNearTheTop =
			document.querySelectorAll<HTMLElement>('article.block')[
				randomPosition
			];
		if (aBlockNearTheTop) {
			insertAfter(aBlockNearTheTop, epicPlaceholder);
		}
	}

	return createPortal(
		<Fetch
			payload={payload}
			contributionsServiceUrl={contributionsServiceUrl}
			ophanPageViewId={ophanPageViewId}
			renderingTarget={renderingTarget}
			pageUrl={pageUrl}
		/>,
		epicPlaceholder,
	);
};
