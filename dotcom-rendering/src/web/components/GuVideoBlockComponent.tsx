/* eslint-disable jsx-a11y/media-has-caption */

import { css } from '@emotion/react';
import { unescapeData } from '../../lib/escapeData';
import { Caption } from './Caption';

export const GuVideoBlockComponent: React.FC<{
	html: string;
	format: ArticleFormat;
	credit: string;
	caption?: string;
}> = ({ html, format, credit, caption }) => {
	const embedContainer = css`
		width: 100%;
		margin-bottom: ${caption ? `0px` : `6px`};
		video {
			width: 100%;
		}
	`;

	return (
		<div css={embedContainer}>
			<div dangerouslySetInnerHTML={{ __html: unescapeData(html) }} />

			{caption && (
				<Caption
					captionText={caption}
					format={format}
					credit={credit}
					mediaType="Video"
				/>
			)}
		</div>
	);
};
