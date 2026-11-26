import type { LayoutType } from '../layouts/lib/articleArrangements';
import type { ArticleFormat } from '../lib/articleFormat';
import type { ImageBlockElement } from '../types/content';
import { ImageComponent } from './ImageComponent';

type Props = {
	format: ArticleFormat;
	element: ImageBlockElement;
	hideCaption?: boolean;
	title?: string;
	isMainMedia?: boolean;
	isAvatar?: boolean;
	isTimeline?: boolean;
	articleArrangement?: LayoutType;
};

export const ImageBlockComponent = ({
	format,
	element,
	hideCaption,
	title,
	isMainMedia,
	isAvatar,
	isTimeline = false,
	articleArrangement,
}: Props) => {
	const { role } = element;
	return (
		<ImageComponent
			element={element}
			format={format}
			hideCaption={hideCaption}
			isMainMedia={isMainMedia}
			role={role}
			title={title}
			isAvatar={isAvatar}
			isTimeline={isTimeline}
			articleArrangement={articleArrangement}
		/>
	);
};
