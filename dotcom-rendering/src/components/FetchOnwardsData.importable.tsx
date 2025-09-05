import { css } from '@emotion/react';
import { isNonNullable } from '@guardian/libs';
import { ArticleDesign, type ArticleFormat } from '../lib/articleFormat';
import { decideTrail, decideTrailWithMasterImage } from '../lib/decideTrail';
import { useApi } from '../lib/useApi';
import { addDiscussionIds } from '../lib/useCommentCount';
import { palette } from '../palette';
import type { OnwardsSource } from '../types/onwards';
import type { RenderingTarget } from '../types/renderingTarget';
import type { FETrailType, TrailType } from '../types/trails';
import { Carousel } from './Carousel.importable';
import { MoreGalleries } from './MoreGalleries';
import { Placeholder } from './Placeholder';

type Props = {
	url: string;
	limit: number; // Limit the number of items shown (the api often returns more)
	onwardsSource: OnwardsSource;
	format: ArticleFormat;
	discussionApiUrl: string;
	absoluteServerTimes: boolean;
	renderingTarget: RenderingTarget;
	isAdFreeUser: boolean;
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
	withMasterImage = false,
): TrailType[] => {
	return trails
		.filter((trailType) => !(isTrailPaidContent(trailType) && isAdFreeUser))
		.slice(0, trailLimit)
		.map(withMasterImage ? decideTrailWithMasterImage : decideTrail);
};

export const FetchOnwardsData = ({
	url,
	limit,
	onwardsSource,
	format,
	discussionApiUrl,
	absoluteServerTimes,
	renderingTarget,
	isAdFreeUser,
}: Props) => {
	const { data, error } = useApi<OnwardsResponse>(url);

	if (error) {
		// Send the error to Sentry and then prevent the element from rendering
		window.guardian.modules.sentry.reportError(error, 'onwards-lower');
		return null;
	}

	if (!data?.trails) {
		return (
			<Placeholder
				height={340} // best guess at typical height
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

	return (
		<div css={minHeight}>
			{onwardsSource === 'more-galleries' ? (
				<MoreGalleries
					absoluteServerTimes={absoluteServerTimes}
					trails={buildTrails(data.trails, limit, isAdFreeUser, true)}
					discussionApiUrl={discussionApiUrl}
					heading="More galleries"
					onwardsSource={onwardsSource}
				/>
			) : (
				<Carousel
					heading={data.heading || data.displayname} // Sometimes the api returns heading as 'displayName'
					trails={buildTrails(data.trails, limit, isAdFreeUser)}
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
					absoluteServerTimes={absoluteServerTimes}
					renderingTarget={renderingTarget}
				/>
			)}
		</div>
	);
};
