import React from 'react';
import { Caption } from '@root/src/amp/components/Caption';

export const VideoFacebookBlockComponent: React.FC<{
	element: VideoFacebookBlockElement;
	pillar: CAPIPillar;
}> = ({ element, pillar }) => {
	return (
		<Caption captionText={element.caption} pillar={pillar}>
			<amp-facebook
				data-href={element.url}
				data-embed-as="video"
				layout="responsive"
				width="5"
				height="3"
			/>
		</Caption>
	);
};
