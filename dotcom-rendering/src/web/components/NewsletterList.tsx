import type { Newsletter } from '../../types/content';
import { Section } from './Section';

export interface NewslettersListProps {
	newsletters: Newsletter[];
}

export const NewslettersList = ({ newsletters }: NewslettersListProps) => {
	return (
		<Section fullWidth={true} padBottom={true}>
			<table>
				<thead>
					<tr>
						<th>name</th>
						<th>group</th>
						<th>region</th>
						<th>frequency</th>
					</tr>
				</thead>
				<tbody>
					{newsletters.map((newsletter) => {
						return (
							<tr key={newsletter.name}>
								<td>{newsletter.name}</td>
								<td>{newsletter.group}</td>
								<td>{newsletter.regionFocus}</td>
								<td>{newsletter.frequency}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</Section>
	);
};
