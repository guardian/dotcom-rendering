import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { joinUrl } from '@guardian/libs';
import { neutral, space, textSans } from '@guardian/source-foundations';
import { SvgPinned } from '@guardian/source-react-components';
import { decidePalette } from '../lib/decidePalette';
import { Island } from './Island';
import { RelativeTime } from './RelativeTime.importable';

const fallbackDate = (date: Date) =>
	[date.getHours(), date.getMinutes()]
		.map((time) => time.toString().padStart(2, '0'))
		.join('.');

type Props = {
	firstPublished: number;
	firstPublishedDisplay?: string;
	blockId: string;
	isPinnedPost: boolean;
	isOriginalPinnedPost: boolean;
	format: ArticleFormat;
	host?: string;
	pageId?: string;
};

const FirstPublished = ({
	firstPublished,
	firstPublishedDisplay,
	blockId,
	isPinnedPost,
	isOriginalPinnedPost,
	format,
	host,
	pageId,
}: Props) => {
	const baseHref = host && pageId ? joinUrl(host, pageId) : '';
	const { border } = decidePalette(format);
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
					<span
						css={css`
							color: ${neutral[46]};
							font-weight: bold;
							margin-right: ${space[2]}px;
						`}
					>
						<Island
							priority="enhancement"
							defer={{ until: 'visible' }}
						>
							<RelativeTime
								epoch={firstPublished}
								format="short"
							></RelativeTime>
						</Island>
					</span>
				)}
				<span
					css={css`
						${textSans.xxsmall()};
						color: ${neutral[46]};
					`}
				>
					{firstPublishedDisplay ?? fallbackDate(publishedDate)}
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

						&:hover {
							span {
								transform: scale(1.2);
							}
						}
					`}
				>
					<span
						css={css`
							width: 14px;
							height: 14px;
							border-radius: 50%;
							background-color: ${border.liveBlock};
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
