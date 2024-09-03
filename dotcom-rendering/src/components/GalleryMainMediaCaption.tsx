import { css } from '@emotion/react';
import { from, space, textSans14 } from '@guardian/source/foundations';
import { grid } from '../grid';
import { palette } from '../palette';
import type { FEElement, ImageBlockElement } from '../types/content';
import { CaptionText } from './CaptionText';

const getMainMediaImage = (
	elements: FEElement[],
): ImageBlockElement | undefined =>
	elements.filter(
		(element) =>
			element._type ===
			'model.dotcomrendering.pageElements.ImageBlockElement',
	)[0];

const styles = css`
	${grid.column.centre}
	${textSans14}
    color: ${palette('--caption-text')};
	padding-top: ${space[1]}px;

	${from.leftCol} {
		${grid.column.left}
		grid-row: 5 / span 4;
		display: block;
	}
`;

type Props = {
	elements: FEElement[];
};

export const GalleryMainMediaCaption = ({ elements }: Props) => {
	const mainMedia = getMainMediaImage(elements);

	if (mainMedia === undefined) {
		return null;
	}

	const captionHtml = mainMedia.data.caption;
	const credit = mainMedia.data.credit;
	const emptyCaption = captionHtml === undefined || captionHtml.trim() === '';
	const hideCredit =
		mainMedia.displayCredit === false ||
		credit === undefined ||
		credit === '';

	if (emptyCaption && hideCredit) {
		return null;
	}

	return (
		<p css={styles}>
			{emptyCaption ? null : <CaptionText html={captionHtml} />}
			{hideCredit ? null : <small>{credit}</small>}
		</p>
	);
};
