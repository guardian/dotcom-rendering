import { storage } from '@guardian/libs';
import { useEffect, useState } from 'react';
import { hideSupportMessaging } from '../client/userFeatures/cookies/hideSupportMessaging';
import type { EditionId } from '../lib/edition';
import { useAB } from '../lib/useAB';
import { FeastContextualNudge } from './FeastContextualNudge';

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
	compact?: boolean;
};

export const FeastContextualNudgeIsland = ({
	pageId,
	editionId,
	compact = false,
}: Props) => {
	const [shouldRender, setShouldRender] = useState(false);
	const abTestAPI = useAB()?.api;

	useEffect(() => {
		if (!abTestAPI?.isUserInVariant('FeastContextualNudge', 'variant'))
			return;
		if (isDismissed()) return;
		setShouldRender(true);
	}, [abTestAPI]);

	if (!shouldRender) return null;

	const subscriberVariant = hideSupportMessaging()
		? 'hvsSubscriber'
		: editionId === 'US'
		? 'usNonSubscriber'
		: 'default';

	return (
		<FeastContextualNudge
			pageId={pageId}
			editionId={editionId}
			subscriberVariant={subscriberVariant}
			onDismiss={recordDismissal}
			compact={compact}
		/>
	);
};
