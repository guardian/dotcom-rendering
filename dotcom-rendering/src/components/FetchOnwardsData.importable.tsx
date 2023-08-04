import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { useEffect } from 'react';
import { decideTrail } from '../lib/decideTrail.ts';
import { revealStyles } from '../lib/revealStyles.ts';
import { useApi } from '../lib/useApi.tsx';
import type { OnwardsSource } from '../types/onwards.ts';
import type { FETrailType, TrailType } from '../types/trails.ts';
import { Carousel } from './Carousel.importable.tsx';
import { Placeholder } from './Placeholder.tsx';

type Props = {
	url: string;
	limit: number; // Limit the number of items shown (the api often returns more)
	onwardsSource: OnwardsSource;
	format: ArticleFormat;
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
			pendingElements.forEach((element) => {
				element.classList.add('reveal');
				element.classList.remove('pending');
			});
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
					/>
				</div>
			</div>
		);
	}

	return null;
};
