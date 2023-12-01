import { useEffect, useState } from 'react';
import { getOphan } from '../client/ophan/ophan';
import type { RenderingTarget } from '../types/renderingTarget';

export const usePageViewId = (
	renderingTarget: RenderingTarget,
): string | undefined => {
	const [id, setId] = useState<string>();

	useEffect(() => {
		getOphan(renderingTarget)
			.then(({ pageViewId }) => {
				setId(pageViewId);
			})
			.catch(() => {
				setId('no-page-view-id-available');
			});
	}, [renderingTarget]);

	return id;
};
