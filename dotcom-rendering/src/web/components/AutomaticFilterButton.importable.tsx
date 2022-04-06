import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import { Button } from '@guardian/source-react-components';

type Props = {
	filter: Filter;
	selectedFilter: string;
	setSelectedFilter: (name: string) => void;
	pinnedPostId?: string;
};
const AutomaticFilterButton = ({
	filter,
	selectedFilter,
	setSelectedFilter,
	pinnedPostId,
}: Props) => {
	const handleClick = () => {
		setSelectedFilter(filter.name);
		const blogBody = document.querySelector<HTMLElement>('#liveblog-body');
		const allBlocks =
			blogBody?.querySelectorAll<HTMLElement>('article .block');

		if (filter.name === 'Show All') {
			allBlocks?.forEach((block) => {
				block.classList.add('reveal');
				block.classList.remove('filter');
				block.classList.remove('pending');
			});
		} else {
			allBlocks?.forEach((block) => {
				const blockIds = filter.blocks.map(
					(blockId) => `block-${blockId}`,
				);

				if (block.id === `block-${pinnedPostId}`) return;

				if (blockIds.includes(block.id)) {
					block.classList.add('reveal');
					block.classList.add('filter');
					block.classList.remove('pending');
				} else {
					block.classList.add('pending');
					block.classList.remove('filter');
					block.classList.remove('reveal');
				}
			});
		}
	};
	return (
		<Button
			priority={selectedFilter === filter.name ? 'primary' : 'tertiary'}
			id="automatic-filter-button"
			value={filter.blocks[0]}
			onClick={handleClick}
			cssOverrides={css`
				margin-top: ${space[1]}px;
				margin-bottom: ${space[1]}px;
			`}
		>
			{filter.name}
		</Button>
	);
};

export default AutomaticFilterButton;
