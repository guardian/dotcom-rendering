import { css } from '@emotion/react';
import type { Edition } from '@guardian/apps-rendering-api-models/edition';
import type { ArticleFormat } from '@guardian/libs';
import { timeAgo } from '@guardian/libs';
import {
	neutral,
	space,
	textSans12,
	textSansBold12,
} from '@guardian/source/foundations';
import { SvgPinned } from '@guardian/source/react-components';
import { timestampFormat } from 'datetime';
import { border } from 'palette';

import { darkModeCss } from 'styles';

type Props = {
	firstPublished: Date;
	blockId: string;
	isPinnedPost: boolean;
	isOriginalPinnedPost: boolean;
	format: ArticleFormat;
	edition: Edition;
};

const FirstPublished = ({
	firstPublished,
	blockId,
	isPinnedPost,
	isOriginalPinnedPost,
	format,
	edition,
}: Props) => (
	<div
		css={css`
			display: flex;
		`}
	>
		<a
			href={`?page=with:block-${blockId}#block-${blockId}`}
			data-ignore="global-link-styling"
			css={css`
				${textSansBold12};
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
					dateTime={firstPublished.toISOString()}
					data-relativeformat="med"
					css={css`
						color: ${neutral[46]};
						font-weight: bold;
						margin-right: ${space[2]}px;

						${darkModeCss`
							color: ${neutral[60]};
						`}
					`}
				>
					{timeAgo(firstPublished.getTime())}
				</time>
			)}
			<span
				css={css`
					${textSans12};
					color: ${neutral[46]};

					${darkModeCss`
						color: ${neutral[60]};
					`}
				`}
			>
				{timestampFormat(edition)(firstPublished)}
			</span>
		</a>
		{isOriginalPinnedPost && (
			<a
				href="#pinned-post"
				data-ignore="global-link-styling"
				css={css`
					${textSansBold12};
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

export default FirstPublished;
