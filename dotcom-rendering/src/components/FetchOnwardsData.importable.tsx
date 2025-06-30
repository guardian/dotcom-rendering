import { css } from '@emotion/react';
import { isNonNullable } from '@guardian/libs';
import { ArticleDesign, type ArticleFormat } from '../lib/articleFormat';
import {decideOnwardsTrail, decideTrail} from '../lib/decideTrail';
import { useApi } from '../lib/useApi';
import { addDiscussionIds } from '../lib/useCommentCount';
import { palette } from '../palette';
import type { OnwardsSource } from '../types/onwards';
import type { RenderingTarget } from '../types/renderingTarget';
import type { FETrailType, TrailType } from '../types/trails';
import { Carousel } from './Carousel.importable';
import { Placeholder } from './Placeholder';
import {FlexibleGeneral} from "./FlexibleGeneral";
import {
	DCRFrontCard,
	DCRFrontImage,
	DCRGroupedTrails,
	DCRSlideshowImage,
	DCRSnapType,
	DCRSupportingContent
} from "../types/front";
import type {BoostLevel, StarRating} from "../types/content";
import type {MainMedia} from "../types/mainMedia";
import type {Branding} from "../types/branding";
import {ScrollableMedium} from "./ScrollableMedium.importable";
import {GroupedTrails} from "../types/tagPage";

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
): TrailType[] => {
	return trails
		.filter((trailType) => !(isTrailPaidContent(trailType) && isAdFreeUser))
		.slice(0, trailLimit)
		.map(decideTrail);
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





	const trails = makeTrails(data.trails, limit, isAdFreeUser);
	return (
		<div css={minHeight}>
			<FlexibleGeneral groupedTrails={trails} absoluteServerTimes={absoluteServerTimes} imageLoading={"lazy"} containerType={"scrollable/medium"} aspectRatio={"5:4"} sectionId={"111"}></FlexibleGeneral>
		</div>
	);
};

const makeTrails = (
	trails: FETrailType[],
	trailLimit: number,
	isAdFreeUser: boolean,
): DCRGroupedTrails => {
	const t =  trails
		.filter((trailType) => !(isTrailPaidContent(trailType) && isAdFreeUser))
		.slice(0, trailLimit)
		.map(decideOnwardsTrail);

	return {
		snap:[],
		huge:[],
		veryBig:[
		],
		big:[
		],
		standard: t.slice(1,4),
		splash: t.slice(0,1)

}


};

// <Carousel
// 	heading={data.heading || data.displayname} // Sometimes the api returns heading as 'displayName'
// 	trails={buildTrails(data.trails, limit, isAdFreeUser)}
// 	description={data.description}
// 	onwardsSource={onwardsSource}
// 	format={format}
// 	leftColSize={
// 		format.design === ArticleDesign.LiveBlog ||
// 		format.design === ArticleDesign.DeadBlog
// 			? 'wide'
// 			: 'compact'
// 	}
// 	discussionApiUrl={discussionApiUrl}
// 	absoluteServerTimes={absoluteServerTimes}
// 	renderingTarget={renderingTarget}
// />
