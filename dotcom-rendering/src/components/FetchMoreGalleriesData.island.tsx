import { isNonNullable, isObject } from '@guardian/libs';
import { useEffect, useState } from 'react';
import { type ArticleFormat, decideFormat } from '../lib/articleFormat';
import { getDataLinkNameCard } from '../lib/getDataLinkName';
import { addDiscussionIds } from '../lib/useCommentCount';
import { palette } from '../palette';
import { type DCRFrontImage } from '../types/front';
import { type MainMedia } from '../types/mainMedia';
import type { FETrailType, TrailType } from '../types/trails';
import { MoreGalleries } from './MoreGalleries';
import { Placeholder } from './Placeholder';

type Props = {
	discussionApiUrl: string;
	serverTime?: number;
	isAdFreeUser: boolean;
	ajaxUrl: string;
	guardianBaseUrl: string;
	format: ArticleFormat;
};

type MoreGalleriesResponse = {
	heading: string;
	trails: FETrailType[];
};

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

	const trailMedia = getMedia(trail.galleryCount);
	return {
		...trail,
		image,
		format,
		dataLinkName: getDataLinkNameCard(format, '0', index),
		mainMedia: trailMedia,
		articleMedia: trailMedia,
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
	discussionApiUrl,
	serverTime,
	isAdFreeUser,
	ajaxUrl,
	guardianBaseUrl,
	format,
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
				addDiscussionIds(
					fetchedData.trails
						.map((trail) => trail.discussion?.discussionId)
						.filter(isNonNullable),
				);
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
		return null;
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

	return (
		<MoreGalleries
			serverTime={serverTime}
			trails={buildTrails(data.trails, 5, isAdFreeUser)}
			discussionApiUrl={discussionApiUrl}
			guardianBaseUrl={guardianBaseUrl}
			format={format}
		/>
	);
};
