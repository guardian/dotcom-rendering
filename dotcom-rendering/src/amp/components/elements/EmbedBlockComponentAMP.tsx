import React from 'react';
import { NotRenderableInDCR } from '../../../lib/errors/not-renderable-in-dcr';

export const EmbedBlockComponentAMP: React.FC<{
	element: EmbedBlockElement;
}> = ({ element }) => {
	if (element.isMandatory) {
		throw new NotRenderableInDCR();
	}
	return null;
};
