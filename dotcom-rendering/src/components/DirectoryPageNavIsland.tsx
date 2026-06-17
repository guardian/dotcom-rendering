import type { TagType } from '../types/tag';
import { DirectoryPageNav } from './DirectoryPageNav.island';
import { Island } from './Island';

type Props = {
	pageId: string;
	pageTags?: TagType[];
};

export const DirectoryPageNavIsland = (args: Props) => (
	<Island priority="feature" defer={{ until: 'visible' }}>
		<DirectoryPageNav {...args} />
	</Island>
);
