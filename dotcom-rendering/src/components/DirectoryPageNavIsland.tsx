import type { TagType } from '../types/tag';
import { useConfig } from './ConfigContext';
import { DirectoryPageNav } from './DirectoryPageNav.island';
import { Island } from './Island';

type Props = {
	pageId: string;
	pageTags?: TagType[];
};

export const DirectoryPageNavIsland = (args: Props) => {
	const { renderingTarget } = useConfig();
	return (
		<Island priority="feature" defer={{ until: 'visible' }}>
			<DirectoryPageNav {...args} renderingTarget={renderingTarget} />
		</Island>
	);
};
