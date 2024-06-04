import { css } from '@emotion/react';
import { ArticleDesign, isNonNullable } from '@guardian/libs';
import { decideTrail } from '../lib/decideTrail';
import { useApi } from '../lib/useApi';
import { addDiscussionIds } from '../lib/useCommentCount';
import { palette } from '../palette';
import type { OnwardsSource } from '../types/onwards';
import type { FETrailType, TrailType } from '../types/trails';
import { Carousel } from './Carousel.importable';
import { Placeholder } from './Placeholder';

type Props = {
	url: string;
	limit: number; // Limit the number of items shown (the api often returns more)
	onwardsSource: OnwardsSource;
	format: ArticleFormat;
	discussionApiUrl: string;
	absoluteServerTimes: boolean;
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

export const FetchOnwardsData = ({
	url,
	limit,
	onwardsSource,
	format,
	discussionApiUrl,
	absoluteServerTimes,
}: Props) => {
	const { data, error } = useApi<OnwardsResponse>(url);

	const buildTrails = (
		trails: FETrailType[],
		trailLimit: number,
	): TrailType[] => {
		return trails.slice(0, trailLimit).map(decideTrail);
	};

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
				backgroundColor={palette('--onward-placeholder-background')}
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
			<Carousel
				heading={data.heading || data.displayname} // Sometimes the api returns heading as 'displayName'
				trails={buildTrails(data.trails, limit)}
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
			/>
		</div>
	);
};
