import { NotRenderableInDCR } from '../lib/errors/not-renderable-in-dcr.ts';
import type { EmbedBlockElement } from '../types/content.ts';

type Props = {
	element: EmbedBlockElement;
};

export const EmbedBlockComponent = ({ element }: Props) => {
	if (element.isMandatory) {
		throw new NotRenderableInDCR();
	}
	return null;
};
