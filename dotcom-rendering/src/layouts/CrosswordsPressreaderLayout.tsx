import { isUndefined, joinUrl } from '@guardian/libs';
import { Fragment } from 'react';
import { DecideContainerByTrails } from '../components/DecideContainerByTrails';
import { FrontSection } from '../components/FrontSection';
import { TagPageHeader } from '../components/TagPageHeader';
import type { DCRTagPageType, GroupedTrails } from '../types/tagPage';

interface Props {
	tagPage: DCRTagPageType;
}

const isNonEmptyContainer = (container: GroupedTrails) =>
	container.trails.length > 0;

const isQuickOrCrypticCrossword = (url: string): boolean => {
	try {
		const urlParts = url.split('/');
		const crosswordType = urlParts[urlParts.length - 2];
		return crosswordType === 'quick' || crosswordType === 'cryptic';
	} catch (e) {
		return false;
	}
};

export const CrosswordsPressreaderLayout = ({ tagPage }: Props) => {
	const filteredCrosswordTrails = tagPage.groupedTrails
		.map((groupedTrail) => {
			return {
				...groupedTrail,
				trails: groupedTrail.trails.filter((trail) =>
					isQuickOrCrypticCrossword(trail.url),
				),
			};
		})
		.filter(isNonEmptyContainer);

	return (
		<main data-layout="TagPageLayout" id="maincontent">
			<TagPageHeader
				title={tagPage.header.title}
				description={tagPage.header.description}
				image={tagPage.header.image}
			/>
			{filteredCrosswordTrails.map((groupedTrails, index) => {
				const imageLoading = index > 1 ? 'lazy' : 'eager';

				const title = isUndefined(groupedTrails.day)
					? [groupedTrails.month, groupedTrails.year].join(' ')
					: [
							groupedTrails.day,
							groupedTrails.month,
							groupedTrails.year,
					  ].join(' ');

				const containerId = title.replaceAll(' ', '-').toLowerCase();

				const url = groupedTrails.day
					? '/' +
					  joinUrl(
							tagPage.pageId,
							groupedTrails.year,
							groupedTrails.month.slice(0, 3).toLowerCase(),
							groupedTrails.day.padStart(2, '0'),
							'all',
					  )
					: undefined;

				return (
					<Fragment key={containerId}>
						<FrontSection
							title={title}
							url={url}
							isTagPage={true}
							collectionBranding={
								index === 0 ? tagPage.branding : undefined
							}
							showTopBorder={true}
							ophanComponentLink={`container-${index} | ${containerId}`}
							ophanComponentName={containerId}
							sectionId={containerId}
							toggleable={false}
							pageId={tagPage.pageId}
							editionId={tagPage.editionId}
							canShowMore={false}
							ajaxUrl={tagPage.config.ajaxUrl}
							pagination={
								index === tagPage.groupedTrails.length - 1
									? tagPage.pagination
									: undefined
							}
							discussionApiUrl={tagPage.config.discussionApiUrl}
						>
							<DecideContainerByTrails
								trails={groupedTrails.trails}
								speed={tagPage.speed}
								imageLoading={imageLoading}
								isTagPage={true}
							/>
						</FrontSection>
					</Fragment>
				);
			})}
		</main>
	);
};
