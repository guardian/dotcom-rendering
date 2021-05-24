/* eslint-disable jsx-a11y/media-has-caption */

import { css } from '@emotion/react';
import { unescapeData } from '@root/src/lib/escapeData';
import { Caption } from '@root/src/web/components/Caption';

export const GuVideoBlockComponent: React.FC<{
	html: string;
	format: Format;
	palette: Palette;
	credit: string;
	caption?: string;
}> = ({ html, format, palette, credit, caption }) => {
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
					palette={palette}
					credit={credit}
				/>
			)}
		</div>
	);
};
