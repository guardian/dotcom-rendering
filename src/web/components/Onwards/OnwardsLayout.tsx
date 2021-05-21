import { Flex } from '@frontend/web/components/Flex';
import { LeftColumn } from '@frontend/web/components/LeftColumn';
import { Hide } from '@frontend/web/components/Hide';

import { useComments } from '@root/src/web/lib/useComments';
import { formatAttrString } from '@frontend/web/lib/formatAttrString';

import { Display } from '@guardian/types';
import { ContainerTitle } from '../ContainerTitle';
import { OnwardsContainer } from './OnwardsContainer';
import { MoreThanFive } from './MoreThanFive';
import { ExactlyFive } from './ExactlyFive';
import { FourOrLess } from './FourOrLess';
import { Spotlight } from './Spotlight';

const decideLayout = (trails: TrailType[]) => {
	switch (trails.length) {
		case 1:
			return <Spotlight content={trails} />;
		case 2:
		case 3:
		case 4:
			return <FourOrLess content={trails} />;
		case 5:
			return <ExactlyFive content={trails} />;
		case 6:
		case 7:
		case 8:
		default:
			return <MoreThanFive content={trails} />;
	}
};

export const OnwardsLayout: React.FC<OnwardsType> = (data: OnwardsType) => {
	const sections = useComments([data]);

	/**
	 * Why are we overriding display like this?
	 *
	 * Good question. Basically, we had a production issue and this was the easiest and
	 * quickest way to fix it rather than fixing Card's properly 😱
	 *
	 * Carousels use display.Immersive to change some Card styles and this was bleeding
	 * into normal onwards cards that linked through to Immersive articles.
	 *
	 * Once:
	 * 1. Cards have been refactored to remove `isFullSizeImage`
	 * 2. We support the concept of a container type and
	 * 3. We  and are able to handle Carousels natively - in
	 *    the model
	 * Then this should be removed.
	 */
	const sectionsForcedToStandard = sections.map((section) => {
		return {
			...section,
			trails: section.trails.map((trail) => {
				return {
					...trail,
					format: {
						...trail.format,
						display: Display.Standard,
					},
				};
			}),
		};
	});

	return (
		<>
			{sectionsForcedToStandard.map((section, index) => (
				<Flex key={`${section.heading}-${index}`}>
					<LeftColumn
						showRightBorder={false}
						showPartialRightBorder={true}
					>
						<ContainerTitle
							title={section.heading}
							description={section.description}
							url={section.url}
						/>
					</LeftColumn>
					<OnwardsContainer
						dataComponentName={section.ophanComponentName}
						dataLinkName={formatAttrString(section.heading)}
					>
						<Hide when="above" breakpoint="leftCol">
							<ContainerTitle
								title={section.heading}
								description={section.description}
								url={section.url}
							/>
						</Hide>
						{decideLayout(section.trails.slice(0, 8))}
					</OnwardsContainer>
				</Flex>
			))}
		</>
	);
};
