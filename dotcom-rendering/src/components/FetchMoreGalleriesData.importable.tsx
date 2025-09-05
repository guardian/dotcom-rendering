import { css } from '@emotion/react';
import { isNonNullable } from '@guardian/libs';
import { useEffect, useState } from 'react';
import { array, object, type Output, safeParse, string } from 'valibot';
import { decideFormat } from '../lib/articleFormat';
import { getDataLinkNameCard } from '../lib/getDataLinkName';
import { addDiscussionIds } from '../lib/useCommentCount';
import { palette } from '../palette';
import { type DCRFrontImage } from '../types/front';
import { type MainMedia } from '../types/mainMedia';
import type { OnwardsSource } from '../types/onwards';
import type { FETrailType, TrailType } from '../types/trails';
import { FETrailTypeSchema } from '../types/valibotSchemas/trails';
import { MoreGalleries } from './MoreGalleries';
import { Placeholder } from './Placeholder';

type Props = {
	url: string;
	limit: number; // Limit the number of items shown (the api often returns more)
	onwardsSource: OnwardsSource;
	discussionApiUrl: string;
	absoluteServerTimes: boolean;
	isAdFreeUser: boolean;
};

type MoreGalleriesResponse = Output<typeof MoreGalleriesResponseSchema>;

const MoreGalleriesResponseSchema = object({
	trails: array(FETrailTypeSchema),
	heading: string(),
});

const minHeight = css`
	min-height: 300px;
`;

const getMedia = (galleryCount: number | undefined): MainMedia | undefined => {
	if (typeof galleryCount === 'number') {
		return { type: 'Gallery', count: galleryCount.toString() };
	}
	return undefined;
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
		.map((trail, index) => {
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
		});
};

const fetchJson = async (ajaxUrl: string): Promise<MoreGalleriesResponse> => {
	const fetchResponse = await fetch(ajaxUrl);
	if (!fetchResponse.ok) {
		throw new Error(`HTTP error! status: ${fetchResponse.status}`);
	}
	const responseJson: unknown = await fetchResponse.json();
	const result = safeParse(MoreGalleriesResponseSchema, responseJson, {
		abortEarly: true, // Avoid parsing the rest of the object after facing the first error
	});
	if (result.success) {
		return result.output;
	} else {
		const errorMessages = result.issues
			.map(
				(issue) =>
					`${issue.path?.map((p) => p.key).join('.') ?? 'root'}: ${
						issue.message
					}`,
			)
			.join('; ');
		throw new Error(
			`Failed to parse MoreGalleriesResponse: ${errorMessages}`,
		);
	}
};

export const FetchMoreGalleriesData = ({
	url,
	limit,
	onwardsSource,
	discussionApiUrl,
	absoluteServerTimes,
	isAdFreeUser,
}: Props) => {
	const [data, setData] = useState<MoreGalleriesResponse | undefined>(
		undefined,
	);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		fetchJson(url)
			.then((fetchedData) => {
				setData(fetchedData);
				setError(null);
			})
			.catch((err) => {
				setError(
					err instanceof Error ? err : new Error('Unknown error'),
				);
				setData(undefined);
			});
	}, [url]);

	if (error) {
		// Send the error to Sentry and then prevent the element from rendering
		window.guardian.modules.sentry.reportError(error, 'more-galleries');
		return null;
	}

	if (!data?.trails) {
		return (
			<Placeholder
				height={720} // best guess at typical height // TODO: this is different value for different breakpoints!!!
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
				heading="More galleries"
				onwardsSource={onwardsSource}
			/>
		</div>
	);
};
