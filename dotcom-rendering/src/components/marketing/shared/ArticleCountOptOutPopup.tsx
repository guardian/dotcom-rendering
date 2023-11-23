/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/9c3eae7cb0b159db4a1c40679d6b37710b0bb937/packages/modules/src/modules/shared/ArticleCountOptOutPopup.tsx
 */
import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { OphanComponentEvent, OphanComponentType } from '@guardian/libs';
import { from, space } from '@guardian/source-foundations';
import { useEffect, useState } from 'react';
import { useIsInView } from '../../../lib/useIsInView';
import {
	addArticleCountOptOutCookie,
	removeArticleCountFromLocalStorage,
} from '../lib/articleCountOptOut';
import type { ReactComponent } from '../lib/ReactComponent';
import { ArticleCountOptOutOverlay } from './ArticleCountOptOutOverlay';

const OPHAN_COMPONENT_ID_OPT_OUT_VIEW = 'article-count-opt-out-view';
const OPHAN_COMPONENT_ID_OPT_OUT_OPEN = 'article-count-opt-out-open';
const OPHAN_COMPONENT_ID_OPT_OUT_CLOSE = 'article-count-opt-out-close';
const OPHAN_COMPONENT_ID_OPT_OUT_CONFIRM = 'article-count-opt-out-confirm';

export const ophanComponentEventOptOutView = (
	componentType: OphanComponentType,
): OphanComponentEvent => ({
	component: {
		componentType: 'ACQUISITIONS_OTHER',
		id: OPHAN_COMPONENT_ID_OPT_OUT_VIEW,
	},
	action: 'VIEW',
	value: `article-count-opt-out-popup-${componentType}`,
});

export const ophanComponentEventOptOutOpen = (
	componentType: OphanComponentType,
): OphanComponentEvent => ({
	component: {
		componentType: 'ACQUISITIONS_OTHER',
		id: OPHAN_COMPONENT_ID_OPT_OUT_OPEN,
	},
	action: 'CLICK',
	value: `article-count-opt-out-popup-${componentType}`,
});

export const ophanComponentEventOptOutClose = (
	componentType: OphanComponentType,
): OphanComponentEvent => ({
	component: {
		componentType: 'ACQUISITIONS_OTHER',
		id: OPHAN_COMPONENT_ID_OPT_OUT_CLOSE,
	},
	action: 'CLICK',
	value: `article-count-opt-out-popup-${componentType}`,
});

export const ophanComponentEventOptOutConfirm = (
	componentType: OphanComponentType,
): OphanComponentEvent => ({
	component: {
		componentType: 'ACQUISITIONS_OTHER',
		id: OPHAN_COMPONENT_ID_OPT_OUT_CONFIRM,
	},
	action: 'CLICK',
	value: `article-count-opt-out-popup-${componentType}`,
});

export type ArticleCountOptOutType =
	| 'epic'
	| 'banner'
	| 'investigations-moment-banner'
	| 'us-eoy-moment-banner'
	| 'global-new-year-moment-banner'
	| 'election-au-moment-banner';
const isBanner = (type: ArticleCountOptOutType): boolean =>
	type === 'banner' ||
	type === 'investigations-moment-banner' ||
	type === 'us-eoy-moment-banner' ||
	type === 'global-new-year-moment-banner' ||
	type === 'election-au-moment-banner';

const optOutContainer = (type: ArticleCountOptOutType): SerializedStyles => css`
	display: inline-block;

	${from.tablet} {
		${!isBanner(type) ? 'position: relative;' : ''}
	}
`;

const articleCountButton = css`
	background: none;
	border: none;
	padding: 0;
	cursor: pointer;
	border-bottom: 1px solid;
	/* stylelint-disable-next-line property-disallowed-list */
	font-family: inherit;
	font-size: inherit;
	font-weight: inherit;
	font-style: inherit;
	color: inherit;
	&:focus {
		/* stylelint-disable-next-line declaration-no-important */
		outline: none !important;
	}
`;

const overlayContainer = (
	type: ArticleCountOptOutType,
): SerializedStyles => css`
	position: absolute;
	z-index: 100;
	${isBanner(type)
		? css`
				top: 0px;
				left: 0px;
		  `
		: css`
				left: ${space[4]}px;
				right: ${space[4]}px;
				${isBanner(type) ? 'bottom: 21px;' : ''}
		  `}
	display: block;

	${from.tablet} {
		${isBanner(type)
			? css`
					top: 10px;
					left: 10px;
					width: 450px;
			  `
			: css`
					width: 400px;
					left: 0;
			  `}
	}
`;

export interface OphanTracking {
	componentType: OphanComponentType;
	submitComponentEvent: (componentEvent: OphanComponentEvent) => void;
}

export interface ArticleCountOptOutProps {
	numArticles: number;
	nextWord: string | null;
	type: ArticleCountOptOutType;
	tracking?: OphanTracking;
}

export const ArticleCountOptOutPopup: ReactComponent<
	ArticleCountOptOutProps
> = ({ numArticles, nextWord, type, tracking }: ArticleCountOptOutProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [hasOptedOut, setHasOptedOut] = useState(false);
	const [hasBeenSeen, setNode] = useIsInView({
		debounce: true,
		rootMargin: '-18px',
		threshold: 0,
	});

	useEffect(() => {
		if (hasBeenSeen && tracking) {
			tracking.submitComponentEvent(
				ophanComponentEventOptOutView(tracking.componentType),
			);
		}
	}, [hasBeenSeen, tracking]);

	const onOptOut = (): void => {
		addArticleCountOptOutCookie();
		removeArticleCountFromLocalStorage();
		setHasOptedOut(true);
		if (tracking) {
			tracking.submitComponentEvent(
				ophanComponentEventOptOutConfirm(tracking.componentType),
			);
		}
	};

	const onOpen = (): void => {
		setIsOpen(true);
		if (tracking) {
			tracking.submitComponentEvent(
				ophanComponentEventOptOutOpen(tracking.componentType),
			);
		}
	};

	const onClose = (): void => {
		setIsOpen(false);
		if (tracking) {
			tracking.submitComponentEvent(
				ophanComponentEventOptOutClose(tracking.componentType),
			);
		}
	};

	const onToggle = (): void => (isOpen ? onClose() : onOpen());

	return (
		<div ref={setNode} css={optOutContainer(type)}>
			<button css={articleCountButton} onClick={onToggle}>
				{`${numArticles}${nextWord ? nextWord : ''}`}
			</button>
			{isOpen && (
				<div css={overlayContainer(type)}>
					<ArticleCountOptOutOverlay
						type={type}
						hasOptedOut={hasOptedOut}
						onOptOut={onOptOut}
						onClose={onClose}
					/>
				</div>
			)}
		</div>
	);
};
