import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { between, from, space, textSans14 } from '@guardian/source/foundations';
import { grid } from '../grid';
import { palette } from '../palette';
import { CaptionText } from './CaptionText';
import { Island } from './Island';
import { ShareButton } from './ShareButton.importable';

const styles = css`
	${grid.column.centre}
	color: ${palette('--caption-text')};
	${textSans14}
	padding-bottom: ${space[6]}px;

	${between.tablet.and.desktop} {
		padding-left: ${space[5]}px;
		padding-right: ${space[5]}px;
	}

	${from.desktop} {
		${grid.column.right}
	}

	${from.leftCol} {
		${grid.column.left}
	}
`;

type Props = {
	captionHtml?: string;
	credit?: string;
	displayCredit?: boolean;
	format: ArticleFormat;
	pageId: string;
	webTitle: string;
};

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
					context="GalleryImage"
				/>
			</Island>
		</figcaption>
	);
};
