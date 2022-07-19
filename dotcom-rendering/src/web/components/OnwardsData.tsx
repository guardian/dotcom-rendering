import { css } from '@emotion/react';
import { useEffect } from 'react';
import { decideTrail } from '../lib/decideTrail';
import { revealStyles } from '../lib/revealStyles';
import { useApi } from '../lib/useApi';
import { Carousel } from './Carousel';
import { Placeholder } from './Placeholder';

type Props = {
	url: string;
	limit: number; // Limit the number of items shown (the api often returns more)
	ophanComponentName: OphanComponentName;
	format: ArticleFormat;
	isCuratedContent?: boolean;
};

type OnwardsResponse = {
	trails: CAPITrailType[];
	heading: string;
	displayname: string;
	description: string;
};

const minHeight = css`
	min-height: 300px;
`;

export const OnwardsData = ({
	url,
	limit,
	ophanComponentName,
	format,
	isCuratedContent,
}: Props) => {
	const { data, loading, error } = useApi<OnwardsResponse>(url);

	const buildTrails = (
		trails: CAPITrailType[],
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
						ophanComponentName={ophanComponentName}
						format={format}
						isCuratedContent={isCuratedContent}
					/>
				</div>
			</div>
		);
	}

	return null;
};
