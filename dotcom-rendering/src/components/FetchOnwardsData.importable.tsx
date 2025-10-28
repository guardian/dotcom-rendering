import { css } from '@emotion/react';
import { isNonNullable } from '@guardian/libs';
import type { ComponentEvent } from '@guardian/ophan-tracker-js';
import { useEffect, useState } from 'react';
import { submitComponentEvent } from '../client/ophan/ophan';
import { ArticleDesign, type ArticleFormat } from '../lib/articleFormat';
import { decideTrail, dedupeTrail } from '../lib/decideTrail';
import { useApi } from '../lib/useApi';
import { addDiscussionIds } from '../lib/useCommentCount';
import { useIsInView } from '../lib/useIsInView';
import { palette } from '../palette';
import type { OnwardsSource } from '../types/onwards';
import type { RenderingTarget } from '../types/renderingTarget';
import type { FETrailType, TrailType } from '../types/trails';
import { Carousel } from './Carousel.importable';
import { Placeholder } from './Placeholder';

type Props = {
	url: string;
	limit: number; // Limit the number of items shown (the api often returns more)
	onwardsSource: OnwardsSource;
	format: ArticleFormat;
	discussionApiUrl: string;
	serverTime?: number;
	renderingTarget: RenderingTarget;
	isAdFreeUser: boolean;
	containerPosition: string;
	webURL: string;
};

type OnwardsResponse = {
	trails: FETrailType[];
	heading: string;
	displayname: string;
	description: string;
};

const minHeight = css`
	min-height: 300px;
`;

const isTrailPaidContent = (trailType: FETrailType) =>
	trailType.branding?.brandingType?.name === 'paid-content';

const buildTrails = (
	trails: FETrailType[],
	trailLimit: number,
	isAdFreeUser: boolean,
	webURL: string,
): TrailType[] => {
	return trails
		.filter((trailType) => !(isTrailPaidContent(trailType) && isAdFreeUser))
		.filter((trailType) => dedupeTrail(trailType, webURL))
		.slice(0, trailLimit)
		.map(decideTrail);
};

export const FetchOnwardsData = ({
	url,
	limit,
	onwardsSource,
	format,
	discussionApiUrl,
	serverTime,
	renderingTarget,
	isAdFreeUser,
	containerPosition,
	webURL,
}: Props) => {
	const [hasBeenSeen, setIsInViewRef] = useIsInView({ rootMargin: `-100px` });

	const [hasTrackedView, setHasTrackedView] = useState(false);

	useEffect(() => {
		if (hasBeenSeen && !hasTrackedView) {
			const ophanComponentEvent: ComponentEvent = {
				component: {
					componentType: 'CONTAINER',
					id: `onwards-${onwardsSource}-${containerPosition}`,
				},
				action: 'VIEW',
			};

			void submitComponentEvent(ophanComponentEvent, renderingTarget);

			setHasTrackedView(true);
		}
	}, [
		hasBeenSeen,
		hasTrackedView,
		renderingTarget,
		onwardsSource,
		containerPosition,
	]);

	const { data, error } = useApi<OnwardsResponse>(url);

	if (error) {
		// Send the error to Sentry and then prevent the element from rendering
		window.guardian.modules.sentry.reportError(error, 'onwards-lower');
		return null;
	}

	if (!data?.trails) {
		return (
			<Placeholder
				heights={new Map([['mobile', 340]])} // best guess at typical height
				shouldShimmer={false}
				backgroundColor={palette('--article-background')}
			/>
		);
	}

	addDiscussionIds(
		data.trails
			.map((trail) => trail.discussion?.discussionId)
			.filter(isNonNullable),
	);

	const trails = buildTrails(data.trails, limit, isAdFreeUser, webURL);

	return (
		<div ref={setIsInViewRef} css={minHeight}>
			<Carousel
				heading={data.heading || data.displayname} // Sometimes the api returns heading as 'displayName'
				trails={trails}
				description={data.description}
				onwardsSource={onwardsSource}
				format={format}
				leftColSize={
					format.design === ArticleDesign.LiveBlog ||
					format.design === ArticleDesign.DeadBlog
						? 'wide'
						: 'compact'
				}
				discussionApiUrl={discussionApiUrl}
				serverTime={serverTime}
				renderingTarget={renderingTarget}
			/>
		</div>
	);
};
