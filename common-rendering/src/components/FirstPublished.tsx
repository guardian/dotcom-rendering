import { css } from '@emotion/react';
import { ArticleFormat, joinUrl, timeAgo } from '@guardian/libs';
import { neutral, space, textSans } from '@guardian/source-foundations';
import { SvgPinned } from '@guardian/source-react-components';
import { border } from '../editorialPalette';
import { darkModeCss } from '../lib';

const FirstPublished = ({
	firstPublished,
	firstPublishedDisplay,
	blockId,
	isPinnedPost,
	supportsDarkMode,
	isOriginalPinnedPost,
	format,
	host,
	pageId,
}: {
	firstPublished: number;
	firstPublishedDisplay: string;
	blockId: string;
	isPinnedPost: boolean;
	supportsDarkMode: boolean;
	isOriginalPinnedPost: boolean;
	format: ArticleFormat;
	host?: string;
	pageId?: string;
}) => {
	const baseHref = host && pageId ? joinUrl(host, pageId) : '';

	const publishedDate = new Date(firstPublished);
	return (
		<div
			css={css`
				display: flex;
			`}
		>
			<a
				href={`${baseHref}?page=with:block-${blockId}#block-${blockId}`}
				data-ignore="global-link-styling"
				css={css`
					${textSans.xxsmall({ fontWeight: 'bold' })}
					margin-bottom: ${space[1]}px;
					display: flex;
					width: fit-content;
					flex-direction: row;
					text-decoration: none;

					:hover {
						filter: brightness(30%);
					}
				`}
			>
				{!isPinnedPost && (
					<time
						dateTime={publishedDate.toISOString()}
						data-relativeformat="med"
						css={css`
							color: ${neutral[46]};
							font-weight: bold;
							margin-right: ${space[2]}px;

							${darkModeCss(supportsDarkMode)`
							color: ${neutral[60]};
						`}
						`}
					>
						{timeAgo(firstPublished)}
					</time>
				)}
				<span
					css={css`
						${textSans.xxsmall()};
						color: ${neutral[46]};

						${darkModeCss(supportsDarkMode)`
						color: ${neutral[60]};
					`}
					`}
				>
					{firstPublishedDisplay}
				</span>
			</a>
			{isOriginalPinnedPost && (
				<a
					href={`${baseHref}#pinned-post`}
					data-ignore="global-link-styling"
					css={css`
						${textSans.xxsmall({ fontWeight: 'bold' })}
						margin-bottom: ${space[1]}px;
						text-decoration: none;
						display: flex;

						:hover {
							span {
								height: 16px;
								width: 16px;
							}
						}
					`}
				>
					<span
						css={css`
							width: 14px;
							height: 14px;
							border-radius: 50%;
							background-color: ${border.liveBlock(format)};
							align-self: center;
							margin-left: ${space[2]}px;
							svg {
								fill: ${neutral[100]};
							}
						`}
					>
						<SvgPinned />
					</span>
				</a>
			)}
		</div>
	);
};

export { FirstPublished };
