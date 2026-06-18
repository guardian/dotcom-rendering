import { css } from '@emotion/react';
import {
	between,
	from,
	space,
	textSans14,
	textSans15,
} from '@guardian/source/foundations';
import { grid } from '../grid';
import { ArticleDesign, type ArticleFormat } from '../lib/articleFormat';
import { palette } from '../palette';
import { CaptionText } from './CaptionText';
import { Island } from './Island';
import { ShareButton } from './ShareButton.island';

type Props = {
	captionHtml?: string;
	credit?: string;
	displayCredit?: boolean;
	format: ArticleFormat;
	pageId: string;
	webTitle: string;
	/** Position of the image in the gallery used to build share fragment */
	position?: number;
	imagesLength?: number;
};

const styles = css`
	${grid.column.centre}
	color: ${palette('--caption-text')};
	${textSans14}
	padding-bottom: ${space[6]}px;

	${between.tablet.and.desktop} {
		padding-left: ${space[5]}px;
		padding-right: ${space[5]}px;
	}

	${between.desktop.and.leftCol} {
		${grid.column.right}
	}

	${from.leftCol} {
		${grid.column.left}
	}
`;

export const GalleryCaption = ({
	captionHtml,
	credit,
	displayCredit,
	format,
	pageId,
	webTitle,
	position,
	imagesLength,
}: Props) => {
	const emptyCaption = captionHtml === undefined || captionHtml.trim() === '';
	const hideCredit =
		displayCredit === false || credit === undefined || credit === '';
	const isHostedGallery = format.design === ArticleDesign.HostedGallery;

	if (emptyCaption && hideCredit) {
		return null;
	}

	return (
		<figcaption css={styles}>
			{isHostedGallery &&
			typeof position === 'number' &&
			imagesLength !== undefined ? (
				<small
					css={css`
						${textSans15}
						display: block;
						padding: ${space[2]}px 0 ${space[1]}px;
					`}
				>
					{position - 1}&#47;{imagesLength}
				</small>
			) : null}
			{emptyCaption ? null : <CaptionText html={captionHtml} />}
			{hideCredit ? null : (
				<small
					css={css`
						display: block;
						padding: ${space[2]}px 0 ${space[2]}px;
					`}
				>
					{credit}
				</small>
			)}

			{!isHostedGallery && (
				<div
					css={css`
						padding-top: ${space[2]}px;
					`}
				>
					<Island priority="feature" defer={{ until: 'visible' }}>
						<ShareButton
							format={format}
							pageId={pageId}
							webTitle={webTitle}
							context="ImageCaption"
							hash={
								typeof position === 'number'
									? `img-${position}`
									: undefined
							}
						/>
					</Island>
				</div>
			)}
		</figcaption>
	);
};
