import { palette } from '@guardian/source-foundations';
import type { GroupedNewsletters } from '../types/newslettersPage';
import { CarouselForNewsletters } from './CarouselForNewsletters.importable';
import { Island } from './Island';
import { Section } from './Section';

interface Props {
	groupedNewsletters: GroupedNewsletters;
}

export const GroupedNewslettersList = ({ groupedNewsletters }: Props) => {
	return (
		<>
			{groupedNewsletters.groups.map((group, index) => (
				<Section fullWidth={true} key={group.title}>
					<Island defer={{ until: 'idle' }}>
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
