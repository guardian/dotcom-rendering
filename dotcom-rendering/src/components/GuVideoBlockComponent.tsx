import { css } from '@emotion/react';
import { unescapeData } from '../lib/escapeData';
import type { ArticleFormat } from '../lib/format';
import { Caption } from './Caption';

type Props = {
	html: string;
	format: ArticleFormat;
	credit: string;
	isMainMedia: boolean;
	caption?: string;
};

export const GuVideoBlockComponent = ({
	html,
	format,
	credit,
	isMainMedia,
	caption,
}: Props) => {
	const embedContainer = css`
		width: 100%;
		margin-bottom: ${caption ? `0px` : `6px`};
		video {
			width: 100%;
		}
	`;
	const httpsHtml = html.replaceAll(
		new RegExp('http://cdn\\.theguardian\\.tv', 'g'),
		'https://cdn.theguardian.tv',
	);
	const sanitizedHtml = unescapeData(httpsHtml);
	return (
		<div css={embedContainer}>
			<div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />

			{!!caption && (
				<Caption
					captionText={caption}
					format={format}
					credit={credit}
					mediaType="Video"
					isMainMedia={isMainMedia}
				/>
			)}
		</div>
	);
};
