import { palette } from '@guardian/source-foundations';
import type { GroupedNewsletters } from '../types/newslettersPage.ts';
import { CarouselForNewsletters } from './CarouselForNewsletters.importable.tsx';
import { Island } from './Island.tsx';
import { Section } from './Section.tsx';

interface Props {
	groupedNewsletters: GroupedNewsletters;
}

export const GroupedNewslettersList = ({ groupedNewsletters }: Props) => {
	return (
		<>
			{groupedNewsletters.groups.map((group, index) => (
				<Section fullWidth={true} key={group.title}>
					<Island deferUntil="idle">
						<CarouselForNewsletters
							heading={group.title}
							onwardsSource="newsletters-page"
							newsletters={group.newsletters}
							leftColSize="wide"
							activeDotColour={palette.brand[400]}
							titleHighlightColour={palette.neutral[7]}
							carouselPosition={index}
						/>
					</Island>
				</Section>
			))}
		</>
	);
};
