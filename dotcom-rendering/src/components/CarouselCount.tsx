import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export const CarouselCount = ({
	sectionId,
	count,
	total,
}: {
	sectionId: string;
	count: number;
	total: number;
}) => {
	const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);

	useEffect(() => {
		const node = document.getElementById(`${sectionId}-carousel-count`);
		if (!node) {
			console.warn(
				`Portal node with ID "${sectionId}-carousel-count" not found.`,
			);
		}
		setPortalNode(node);
	}, [sectionId]);

	if (!portalNode) return null;

	return createPortal(
		<div>
			{count} of {total}
		</div>,
		portalNode,
	);
};
