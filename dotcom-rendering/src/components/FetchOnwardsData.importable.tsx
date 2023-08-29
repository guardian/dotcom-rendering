import { css } from '@emotion/react';
import { ArticleDesign, isNonNullable } from '@guardian/libs';
import { useEffect } from 'react';
import { decideTrail } from '../lib/decideTrail';
import { revealStyles } from '../lib/revealStyles';
import { useApi } from '../lib/useApi';
import { addDiscussionIds } from '../lib/useCommentCount';
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
	renderingTarget: RenderingTarget;
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
	renderingTarget,
}: Props) => {
	const { data, loading, error } = useApi<OnwardsResponse>(url);

	const buildTrails = (
		trails: FETrailType[],
		trailLimit: number,
	): TrailType[] => {
		return trails.slice(0, trailLimit).map(decideTrail);
	};

	useEffect(() => {
		if (data) {
			const pendingElements = document.querySelectorAll<HTMLElement>(
				'.onwards > .pending',
			);
			for (const element of pendingElements) {
				element.classList.add('reveal');
				element.classList.remove('pending');
			}
		}
	});

	if (error) {
		// Send the error to Sentry and then prevent the element from rendering
		window.guardian.modules.sentry.reportError(error, 'onwards-lower');
		return null;
	}

	if (loading) {
		return (
			<Placeholder
				// 300 is a best guess
				height={300}
				shouldShimmer={false}
				backgroundColor="white"
			/>
		);
	}

	if (data?.trails) {
		addDiscussionIds(
			data.trails
				.map((trail) => trail.discussion?.discussionId)
				.filter(isNonNullable),
		);
		return (
			<div css={[minHeight, revealStyles]} className="onwards">
				<div className="pending">
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
						renderingTarget={renderingTarget}
					/>
				</div>
			</div>
		);
	}

	return null;
};
