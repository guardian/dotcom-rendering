import { Button } from '@guardian/source-react-components';

type Props = {
	filter: Filter;
};
const AutomaticFilterButton = ({ filter }: Props) => {
	return (
		<Button
			id="automatic-filter-button"
			onClick={() => {
				const blogBody =
					document.querySelector<HTMLElement>('#liveblog-body');
				const allBlocks =
					blogBody?.querySelectorAll<HTMLElement>('article .block');

				allBlocks?.forEach((block) => {
					console.log('>>> block >>>', block);
					const blockIds = filter.blocks.map(
						(blockId) => `block-${blockId}`,
					);
					if (blockIds.includes(block.id)) {
						console.log('>>> revealing block.id >>>', block.id);
						block.classList.add('reveal');
						block.classList.remove('pending');
					} else {
						console.log('>>> hiding block.id >>>', block.id);
						block.classList.add('pending');
						block.classList.remove('reveal');
					}
				});

				console.log(
					'>>> allBlocks updated >>>',
					blogBody?.querySelectorAll<HTMLElement>('article .block'),
				);
			}}
		>
			{filter.name}
		</Button>
	);
};

export default AutomaticFilterButton;
