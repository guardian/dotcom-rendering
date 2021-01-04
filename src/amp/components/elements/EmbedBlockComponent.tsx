import React from 'react';

export const EmbedBlockComponent: React.FC<{
	element: EmbedBlockElement;
}> = ({ element }) => {
	if (element.isMandatory) {
		throw new Error(
			'This page cannot be rendered due to incompatible content that is marked as mandatory.',
		);
	}
	return null;
};
