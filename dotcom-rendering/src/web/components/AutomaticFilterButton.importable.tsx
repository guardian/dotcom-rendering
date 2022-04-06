import { Button } from '@guardian/source-react-components';

type Props = {
	filter: Filter;
	selectedFilter: string;
	setSelectedFilter: (name: string) => void;
};
const AutomaticFilterButton = ({
	filter,
	selectedFilter,
	setSelectedFilter,
}: Props) => {
	const handleClick = () => {
		setSelectedFilter(filter.name);
		const blogBody = document.querySelector<HTMLElement>('#liveblog-body');
		const allBlocks =
			blogBody?.querySelectorAll<HTMLElement>('article .block');

		allBlocks?.forEach((block) => {
			const blockIds = filter.blocks.map((blockId) => `block-${blockId}`);
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
	};

	return (
		<Button
			priority={selectedFilter === filter.name ? 'primary' : 'tertiary'}
			id="automatic-filter-button"
			value={filter.blocks[0]}
			onClick={handleClick}
		>
			{filter.name}
		</Button>
	);
};

export default AutomaticFilterButton;
