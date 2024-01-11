/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/a482b35a25ca59f66501c4de02de817046206298/packages/modules/src/hooks/useArticleCountOptOut.ts
 */
import { useState } from 'react';
import {
	addArticleCountOptOutCookie,
	hasArticleCountOptOutCookie,
	removeArticleCountFromLocalStorage,
	removeArticleCountOptOutCookie,
} from '../lib/articleCountOptOut';

interface ArticleCountOptOut {
	hasOptedOut: boolean;
	onArticleCountOptOut: () => void;
	onArticleCountOptIn: () => void;
}

export function useArticleCountOptOut(): ArticleCountOptOut {
	const [hasOptedOut, setHasOptedOut] = useState(
		hasArticleCountOptOutCookie(),
	);

	function onArticleCountOptOut() {
		setHasOptedOut(true);
		addArticleCountOptOutCookie();
		removeArticleCountFromLocalStorage();
	}

	function onArticleCountOptIn() {
		setHasOptedOut(false);
		removeArticleCountOptOutCookie();
	}

	return { hasOptedOut, onArticleCountOptOut, onArticleCountOptIn };
}
