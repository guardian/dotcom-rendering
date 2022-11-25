import type React from 'react';
import { NotRenderableInDCR } from '../../../lib/errors/not-renderable-in-dcr';
import type { EmbedBlockElement } from '../../../types/content';

export const EmbedBlockComponentAMP: React.FC<{
	element: EmbedBlockElement;
}> = ({ element }) => {
	if (element.isMandatory) {
		throw new NotRenderableInDCR();
	}
	return null;
};
