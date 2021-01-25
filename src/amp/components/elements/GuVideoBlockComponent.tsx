import React from 'react';
import { Caption } from '@root/src/amp/components/Caption';

export const GuVideoBlockComponent: React.FC<{
	element: GuVideoBlockElement;
	pillar: Theme;
}> = ({ element, pillar }) => {
	return (
		<Caption captionText={element.caption} pillar={pillar}>
			<amp-video controls="" width="16" height="9" layout="responsive">
				<div fallback="">
					Sorry, your browser is unable to play this video.
					<br />
					Please <a href="http://whatbrowser.org/">upgrade</a> to a
					modern browser and try again.
				</div>
				{element.assets.map(
					(encoding) =>
						encoding.mimeType.includes('video') && (
							<source
								src={encoding.url.replace('http:', 'https:')} // Force https as CAPI doesn't always send them
								type={encoding.mimeType}
							/>
						),
				)}
			</amp-video>
		</Caption>
	);
};
