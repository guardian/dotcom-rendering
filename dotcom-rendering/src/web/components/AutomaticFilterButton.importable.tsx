import { Button } from '@guardian/source-react-components';

type Props = {
	filter: Filter;
};
const AutomaticFilterButton = ({ filter }: Props) => {
	const handleClick = () => {
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
			id="automatic-filter-button"
			value={filter.blocks[0]}
			onClick={handleClick}
		>
			{filter.name}
		</Button>
	);
};

export default AutomaticFilterButton;
