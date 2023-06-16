import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
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
			{groupedNewsletters.groups.map((group) => (
				<Section fullWidth={true} key={group.title}>
					<Island deferUntil="idle">
						<CarouselForNewsletters
							heading={group.title}
							onwardsSource="unknown-source"
							newsletters={group.newsletters}
							format={{
								design: ArticleDesign.Standard,
								theme: ArticlePillar.News,
								display: ArticleDisplay.Standard,
							}}
						/>
					</Island>
				</Section>
			))}
		</>
	);
};
