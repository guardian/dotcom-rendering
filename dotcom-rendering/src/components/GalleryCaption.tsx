import { css } from '@emotion/react';
import { between, from, space, textSans12 } from '@guardian/source/foundations';
import { grid } from '../grid';
import { type ArticleFormat } from '../lib/articleFormat';
import { palette } from '../palette';
import { CaptionText } from './CaptionText';
import { Island } from './Island';
import { ShareButton } from './ShareButton.importable';

type Props = {
	captionHtml?: string;
	credit?: string;
	displayCredit?: boolean;
	format: ArticleFormat;
	pageId: string;
	webTitle: string;
};

const styles = css`
	${grid.column.centre}
	color: ${palette('--caption-text')};
	${textSans12}
	padding-bottom: ${space[6]}px;

	${between.tablet.and.desktop} {
		padding-left: ${space[5]}px;
		padding-right: ${space[5]}px;
	}

	${between.desktop.and.leftCol} {
		${grid.column.right}

		position: relative; /* allows the ::before to be positioned relative to this */

		&::before {
			content: '';
			position: absolute;
			left: -10px; /* 10px to the left of this element */
			top: 0;
			bottom: 0;
			width: 1px;
			background-color: ${palette('--article-border')};
		}
	}

	${from.leftCol} {
		${grid.column.left}

		position: relative; /* allows the ::before to be positioned relative to this */

		&::after {
			content: '';
			position: absolute;
			right: -10px;
			top: 0;
			bottom: 0;
			width: 1px;
			background-color: ${palette('--article-border')};
		}
	}
`;

export const GalleryCaption = ({
	captionHtml,
	credit,
	displayCredit,
	format,
	pageId,
	webTitle,
}: Props) => {
	const emptyCaption = captionHtml === undefined || captionHtml.trim() === '';
	const hideCredit =
		displayCredit === false || credit === undefined || credit === '';

	if (emptyCaption && hideCredit) {
		return null;
	}

	return (
		<figcaption css={styles}>
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
			<Island priority="feature" defer={{ until: 'visible' }}>
				<ShareButton
					format={format}
					pageId={pageId}
					webTitle={webTitle}
					context="ArticleMeta" // TODO: update context to GalleryImage
				/>
			</Island>
		</figcaption>
	);
};
