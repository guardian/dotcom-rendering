import { css } from '@emotion/react';
import {
	palette,
	space,
	textSans12,
	textSansBold12,
} from '@guardian/source/foundations';
import { SvgPinned } from '@guardian/source/react-components';
import { palette as themePalette } from '../palette';
import type { RenderingTarget } from '../types/renderingTarget';
import { useConfig } from './ConfigContext';
import { DateTime } from './DateTime';

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
	absoluteServerTimes: boolean;
};

const href = (blockId: string, renderingTarget: RenderingTarget): string => {
	const params = new URLSearchParams({
		page: `with:block-${blockId}`,
	});

	if (renderingTarget === 'Apps') {
		params.append('dcr', 'apps');
	}

	return `?${params.toString()}#block-${blockId}`;
};

const FirstPublished = ({
	firstPublished,
	firstPublishedDisplay,
	blockId,
	isPinnedPost,
	isOriginalPinnedPost,
	absoluteServerTimes,
}: Props) => {
	const publishedDate = new Date(firstPublished);
	const { renderingTarget } = useConfig();

	return (
		<div
			css={css`
				display: flex;
			`}
		>
			<a
				href={href(blockId, renderingTarget)}
				data-ignore="global-link-styling"
				css={css`
					${textSansBold12}
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
							color: ${palette.neutral[46]};
							font-weight: bold;
							margin-right: ${space[2]}px;
						`}
					>
						<DateTime
							date={new Date(firstPublished)}
							display="relative"
							absoluteServerTimes={absoluteServerTimes}
							showWeekday={false}
							showDate={true}
							showTime={false}
						/>
					</span>
				)}
				<span
					css={css`
						${textSans12};
						color: ${palette.neutral[46]};
					`}
				>
					{firstPublishedDisplay ?? fallbackDate(publishedDate)}
				</span>
			</a>
			{isOriginalPinnedPost && (
				<a
					href={`#pinned-post`}
					data-ignore="global-link-styling"
					css={css`
						${textSansBold12}
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
							background-color: ${themePalette(
								'--live-block-border-top',
							)};
							align-self: center;
							margin-left: ${space[2]}px;
							svg {
								fill: ${palette.neutral[100]};
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
