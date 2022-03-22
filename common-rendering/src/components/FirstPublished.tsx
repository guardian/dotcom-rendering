import { css } from '@emotion/react';
import { ArticleFormat, timeAgo } from '@guardian/libs';
import { neutral, space, textSans } from '@guardian/source-foundations';
import { SvgPinned } from '@guardian/source-react-components';
import { border } from '../editorialPalette';
import { darkModeCss } from '../lib';

// TODO: update this code to use shared version when it is available
const padString = (time: number) => (time < 10 ? `0${time}` : time);

const FirstPublished = ({
	firstPublished,
	blockLink,
	isPinnedPost,
	supportsDarkMode,
	isOriginalPinnedPost,
	format,
}: {
	firstPublished: number;
	blockLink: string;
	isPinnedPost: boolean;
	supportsDarkMode: boolean;
	isOriginalPinnedPost: boolean;
	format: ArticleFormat;
}) => {
	const publishedDate = new Date(firstPublished);
	return (
		<a
			href={blockLink}
			data-ignore="global-link-styling"
			css={css`
				${textSans.xxsmall({ fontWeight: 'bold' })}
				margin-bottom: ${space[1]}px;
				padding-top: ${space[1]}px;
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
				{`${padString(publishedDate.getHours())}:${padString(
					publishedDate.getMinutes(),
				)}`}
			</span>
			{isOriginalPinnedPost && (
				<span
					css={css`
						width: 0.875rem;
						height: 0.875rem;
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
			)}
		</a>
	);
};

export { FirstPublished };
