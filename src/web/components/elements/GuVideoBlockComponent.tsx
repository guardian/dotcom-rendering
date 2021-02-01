/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { css } from 'emotion';
import { unescapeData } from '@root/src/lib/escapeData';
import { Caption } from '@root/src/web/components/Caption';

export const GuVideoBlockComponent: React.FC<{
	html: string;
	format: Format;
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
		<div className={embedContainer}>
			<div dangerouslySetInnerHTML={{ __html: unescapeData(html) }} />

			{caption && (
				<Caption
					captionText={caption}
					format={format}
					credit={credit}
				/>
			)}
		</div>
	);
};
