import type { GroupedNewsletters } from '../../types/newslettersPage';
import { Section } from './Section';

export interface NewslettersListProps {
	groupedNewsletters: GroupedNewsletters;
}

export const GroupedNewslettersList = ({
	groupedNewsletters,
}: NewslettersListProps) => {
	return (
		<>
			{groupedNewsletters.groups.map((group) => (
				<Section title={group.title} padBottom={true} key={group.title}>
					<table>
						<thead>
							<tr>
								<th>name</th>
								<th>region</th>
								<th>frequency</th>
							</tr>
						</thead>
						<tbody>
							{group.newsletters.map((newsletter) => {
								return (
									<tr key={newsletter.name}>
										<td>{newsletter.name}</td>
										<td>{newsletter.regionFocus}</td>
										<td>{newsletter.frequency}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</Section>
			))}
		</>
	);
};
