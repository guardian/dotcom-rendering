import { css } from '@emotion/react';
import { isNonNullable, isObject } from '@guardian/libs';
import { useEffect, useState } from 'react';
import { decideFormat } from '../lib/articleFormat';
import { getDataLinkNameCard } from '../lib/getDataLinkName';
import { addDiscussionIds } from '../lib/useCommentCount';
import { palette } from '../palette';
import { type DCRFrontImage } from '../types/front';
import { type MainMedia } from '../types/mainMedia';
import type { FETrailType, TrailType } from '../types/trails';
import { MoreGalleries } from './MoreGalleries';
import { Placeholder } from './Placeholder';

type Props = {
	limit: number; // Limit the number of items shown (the api often returns more)
	discussionApiUrl: string;
	absoluteServerTimes: boolean;
	isAdFreeUser: boolean;
	ajaxUrl: string;
	guardianBaseUrl: string;
};

type MoreGalleriesResponse = {
	heading: string;
	trails: FETrailType[];
};

const minHeight = css`
	min-height: 300px;
`;

const getMedia = (galleryCount?: number): MainMedia | undefined => {
	if (typeof galleryCount === 'number') {
		return { type: 'Gallery', count: galleryCount.toString() };
	}
	return undefined;
};

const toGalleryTrail = (trail: FETrailType, index: number): TrailType => {
	const format = decideFormat(trail.format);
	const image: DCRFrontImage | undefined = trail.masterImage
		? {
				src: trail.masterImage,
				altText: '',
		  }
		: undefined;

	return {
		...trail,
		image,
		format,
		dataLinkName: getDataLinkNameCard(format, '0', index),
		mainMedia: getMedia(trail.galleryCount),
	};
};

const buildTrails = (
	trails: FETrailType[],
	trailLimit: number,
	isAdFreeUser: boolean,
): TrailType[] => {
	return trails
		.filter(
			(trailType) =>
				!(
					trailType.branding?.brandingType?.name === 'paid-content' &&
					isAdFreeUser
				),
		)
		.slice(0, trailLimit)
		.map(toGalleryTrail);
};

const fetchJson = async (ajaxUrl: string): Promise<MoreGalleriesResponse> => {
	const url = `${ajaxUrl}/gallery/most-viewed.json?dcr=true`;
	const fetchResponse = await fetch(url);
	if (!fetchResponse.ok) {
		throw new Error(`HTTP error! status: ${fetchResponse.status}`);
	}

	const responseJson: unknown = await fetchResponse.json();

	if (isObject(responseJson)) {
		// TODO: we need to properly validate this data in a future PR
		return responseJson as MoreGalleriesResponse;
	} else {
		throw new Error(
			'Failed to parse JSON MoreGalleriesResponse as an object',
		);
	}
};

export const FetchMoreGalleriesData = ({
	limit,
	discussionApiUrl,
	absoluteServerTimes,
	isAdFreeUser,
	ajaxUrl,
	guardianBaseUrl,
}: Props) => {
	const [data, setData] = useState<MoreGalleriesResponse | undefined>(
		undefined,
	);
	const [error, setError] = useState<Error | undefined>(undefined);

	useEffect(() => {
		fetchJson(ajaxUrl)
			.then((fetchedData) => {
				setData(fetchedData);
				setError(undefined);
			})
			.catch((err) => {
				setError(
					err instanceof Error ? err : new Error('Unknown error'),
				);
				setData(undefined);
			});
	}, [ajaxUrl]);

	if (error) {
		// Send the error to Sentry and then prevent the element from rendering
		window.guardian.modules.sentry.reportError(error, 'more-galleries');
		return undefined;
	}

	if (!data?.trails) {
		return (
			<Placeholder
				// Since the height of the 'MoreGalleries' component could vary quite a lot
				// on different breakpoints, we provide a map of heights for each breakpoint
				// in order to prevent layout shift
				heights={
					new Map([
						['mobile', 1020],
						['mobileMedium', 1040],
						['mobileLandscape', 1100],
						['phablet', 1200],
						['tablet', 700],
						['desktop', 800],
						['leftCol', 740],
						['wide', 790],
					])
				}
				shouldShimmer={false}
				backgroundColor={palette('--onward-background')}
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
			<MoreGalleries
				absoluteServerTimes={absoluteServerTimes}
				trails={buildTrails(data.trails, limit, isAdFreeUser)}
				discussionApiUrl={discussionApiUrl}
				headingLink={`${guardianBaseUrl}/inpictures/all`}
			/>
		</div>
	);
};
