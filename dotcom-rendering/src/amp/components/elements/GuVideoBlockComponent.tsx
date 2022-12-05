import type { GuVideoBlockElement } from '../../../types/content';
import { Caption } from '../Caption';

type Props = {
	element: GuVideoBlockElement;
	pillar: ArticleTheme;
};

export const GuVideoBlockComponent = ({ element, pillar }: Props) => {
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
