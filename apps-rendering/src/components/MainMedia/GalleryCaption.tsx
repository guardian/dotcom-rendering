// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { from, remSpace, textSans } from '@guardian/source-foundations';
import type { Option } from '@guardian/types';
import { OptionKind } from '@guardian/types';
import Caption from 'components/caption';
import { grid } from 'grid/grid';
import { maybeRender } from 'lib';
import type { MainMedia } from 'mainMedia';
import { MainMediaKind } from 'mainMedia';
import { background, text } from 'palette';
import type { FC } from 'react';
import { darkModeCss } from 'styles';

// ----- Component ----- //

const styles = (format: ArticleFormat): SerializedStyles => css`
	${textSans.xsmall()}
	background-color: ${background.articleContent(format)};
	${grid.column.centre}
	padding-bottom: ${remSpace[9]};

	${from.leftCol} {
		${grid.column.left}
		padding-top: ${remSpace[9]};
		padding-bottom: 0;
		grid-row: 6;
		padding-top: ${remSpace[1]};
	}

	&,
	span {
		color: ${text.gallery(format)};
	}

	${darkModeCss`
		background-color: ${background.articleContentDark(format)};

		&,
		span {
			color: ${text.galleryDark(format)};
		}
	`}
`;

type Props = {
	mainMedia: Option<MainMedia>;
	format: ArticleFormat;
};

const GalleryCaption: FC<Props> = ({ mainMedia, format }) =>
	maybeRender(mainMedia, (media) => {
		if (media.kind === MainMediaKind.Video || media.kind === MainMediaKind.Cartoon) {
			return null;
		}

		const { caption, credit } = media.image;

		if (
			caption.kind === OptionKind.None &&
			credit.kind === OptionKind.None
		) {
			return null;
		}

		return (
			<div css={styles(format)}>
				<Caption caption={caption} format={format} />{' '}
				{maybeRender(credit, (cred) => (
					<>{cred}</>
				))}
			</div>
		);
	});

// ----- Exports ----- //

export default GalleryCaption;
