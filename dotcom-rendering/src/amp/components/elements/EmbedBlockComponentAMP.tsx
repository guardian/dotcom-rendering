import { NotRenderableInDCR } from '../../../lib/errors/not-renderable-in-dcr';
import type { EmbedBlockElement } from '../../../types/content';

type Props = {
	element: EmbedBlockElement;
};

export const EmbedBlockComponentAMP = ({ element }: Props) => {
	if (element.isMandatory) {
		throw new NotRenderableInDCR();
	}
	return null;
};
