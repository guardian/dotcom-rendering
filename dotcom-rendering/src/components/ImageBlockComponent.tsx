import type { ArticleFormat } from '../lib/articleFormat';
import type { EditionId } from '../lib/edition';
import type { ServerSideTests } from '../types/config';
import type { ImageBlockElement, StarRating } from '../types/content';
import { ImageComponent } from './ImageComponent';

type Props = {
	format: ArticleFormat;
	element: ImageBlockElement;
	hideCaption?: boolean;
	title?: string;
	isMainMedia?: boolean;
	starRating?: StarRating;
	isAvatar?: boolean;
	isTimeline?: boolean;
	abTests: ServerSideTests;
	editionId: EditionId;
};

export const ImageBlockComponent = ({
	format,
	element,
	hideCaption,
	title,
	isMainMedia,
	starRating,
	isAvatar,
	isTimeline = false,
	abTests,
	editionId,
}: Props) => {
	const { role } = element;
	return (
		<ImageComponent
			element={element}
			format={format}
			hideCaption={hideCaption}
			isMainMedia={isMainMedia}
			starRating={starRating}
			role={role}
			title={title}
			isAvatar={isAvatar}
			isTimeline={isTimeline}
			abTests={abTests}
			editionId={editionId}
		/>
	);
};
