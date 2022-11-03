import { EditionId } from '../../types/edition';
import { Logo } from './Logo';

const editionIds: EditionId[] = ['UK', 'US', 'AU', 'INT'];

export const Logos = () => (
	<ul style={{ listStyleType: 'none', padding: '0' }}>
		{editionIds.map((editionId) => (
			<li>
				<Logo editionId={editionId} />
			</li>
		))}
	</ul>
);
Logos.story = { name: 'Logos for all editions' };

export default {
	component: Logos,
	title: 'Components/Logo',
};
