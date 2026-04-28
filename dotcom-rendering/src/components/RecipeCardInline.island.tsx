import { storage } from '@guardian/libs';
import { useEffect, useState } from 'react';
import type { EditionId } from '../lib/edition';
import type { RecipeBlockElement } from '../types/content';
import { useConfig } from './ConfigContext';
import { RecipeCardInline } from './RecipeCardInline';

const DISMISSED_KEY = 'gu.feast-nudge.dismissed';
const DISMISS_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

const isDismissed = (): boolean => {
	const value = storage.local.get(DISMISSED_KEY);
	if (typeof value !== 'string') return false;
	return Date.now() - new Date(value).getTime() < DISMISS_DURATION_MS;
};

const recordDismissal = (): void => {
	storage.local.set(DISMISSED_KEY, new Date().toISOString());
};

type Props = {
	pageId: string;
	editionId: EditionId;
	recipe?: RecipeBlockElement;
	recipeName: string;
};

/**
 * Island wrapper for RecipeCardInline.
 *
 * Manages localStorage dismiss state (30-day suppression window) and passes
 * darkModeAvailable from ConfigContext.  No AB test gate — the card is always
 * shown unless previously dismissed.
 */
export const RecipeCardInlineIsland = ({
	pageId,
	recipe,
	recipeName,
}: Props) => {
	const [isVisible, setIsVisible] = useState(false);
	const { darkModeAvailable } = useConfig();

	useEffect(() => {
		if (!isDismissed()) setIsVisible(true);
	}, []);

	if (!isVisible) return null;

	const handleDismiss = () => {
		setIsVisible(false);
		recordDismissal();
	};

	return (
		<RecipeCardInline
			pageId={pageId}
			recipe={recipe}
			recipeName={recipeName}
			onDismiss={handleDismiss}
			shouldShowLeftColCard={true}
			darkModeAvailable={darkModeAvailable}
		/>
	);
};
