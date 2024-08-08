import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import type { TagType } from '../types/tag';
import { OnwardContainer } from './OnwardContainer.amp';

const wrapper = css`
	background-color: white;
	padding-top: 24px;
`;

const innerContainerStyles = css`
	padding-left: 10px;
	padding-right: 10px;
`;

const sectionHasMostViewed = (sectionID: string): boolean => {
	const allowed = new Set([
		'commentisfree',
		'sport',
		'football',
		'fashion',
		'lifeandstyle',
		'education',
		'culture',
		'business',
		'technology',
		'politics',
		'environment',
		'travel',
		'film',
		'media',
		'money',
		'society',
		'science',
		'music',
		'books',
		'stage',
		'cities',
		'tv-and-radio',
		'artanddesign',
		'global-development',
	]);

	return allowed.has(sectionID);
};

type Props = {
	pageID: string;
	sectionID?: string;
	hasStoryPackage: boolean;
	hasRelated: boolean;
	seriesTags: TagType[];
	guardianBaseURL: string;
};

export const Onward = ({
	pageID,
	sectionID,
	hasStoryPackage,
	hasRelated,
	seriesTags,
	guardianBaseURL,
}: Props) => {
	const ampBaseURL = 'https://amp.theguardian.com';

	const container = (path: string, componentName: string) => (
		<OnwardContainer
			key={path}
			componentName={componentName}
			guardianBaseURL={guardianBaseURL}
			path={path}
		/>
	);

	const storyPackage = hasStoryPackage
		? [
				container(
					`${ampBaseURL}/story-package-mf2/${pageID}.json`,
					'more-on-this-story',
				),
		  ]
		: [];

	const series = seriesTags.map((tag) =>
		container(`${ampBaseURL}/series-mf2/${tag.id}.json`, 'series'),
	);

	const related =
		hasRelated && !hasStoryPackage && series.length < 1
			? [
					container(
						`${ampBaseURL}/related-mf2/${pageID}.json`,
						'related-stories',
					),
			  ]
			: [];

	// Frontend:
	const mostRead = container(
		`${ampBaseURL}/most-read-mf2.json`,
		'most-popular',
	);

	const hasSectionMostViewed =
		!isUndefined(sectionID) && sectionHasMostViewed(sectionID);
	const sectionMostViewed =
		sectionID && hasSectionMostViewed
			? container(
					`${ampBaseURL}/container/count/1/offset/0/section/${sectionID}/mf2.json`,
					`most-viewed-in-${sectionID}`,
			  )
			: container(
					`${ampBaseURL}/container/count/1/offset/0/mf2.json`,
					'most-viewed',
			  );

	const headlines = container(
		`${ampBaseURL}/container/count/3/offset/${
			hasSectionMostViewed ? 0 : 1 // TODO not entirely sure why this is needed
		}/mf2.json`,
		'headlines',
	);

	const containers = storyPackage.concat(
		series,
		related,
		sectionMostViewed,
		mostRead,
		headlines,
	);

	return <div css={[wrapper, innerContainerStyles]}>{containers}</div>;
};
