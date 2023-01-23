import { css } from '@emotion/react';
import { FirstPublished } from 'components/FirstPublished';
import {
	background,
	border,
} from '@guardian/common-rendering/src/editorialPalette';
import { darkModeCss } from '@guardian/common-rendering/src/lib';
import type { ArticleFormat } from '@guardian/libs';
import {
	body,
	from,
	headline,
	neutral,
	space,
} from '@guardian/source-foundations';
import type { Contributor } from 'contributor';
import type { Image } from 'image';
import { Optional } from 'optional';
import type { FC, ReactNode } from 'react';

type Props = {
	id: string;
	children: ReactNode;
	format: ArticleFormat;
	blockTitle: Optional<string>;
	blockFirstPublished: number;
	blockFirstPublishedDisplay: string;
	blockId: string;
	isLiveUpdate: boolean;
	contributors: Contributor[];
	isPinnedPost: boolean;
	supportsDarkMode: boolean;
	isOriginalPinnedPost: boolean;
	host?: string;
	pageId?: string;
};

const LEFT_MARGIN_DESKTOP = 60;
const SIDE_MARGIN = space[5];
const SIDE_MARGIN_MOBILE = 10;

const Header: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<header
			css={css`
				padding-right: ${space[3]}px;
				display: flex;
				flex-direction: column;
			`}
		>
			{children}
		</header>
	);
};

const BlockTitle: FC<{ blockTitle: Optional<string> }> = ({ blockTitle }) =>
	blockTitle.maybeRender((title) => (
		<h2
			css={css`
				${headline.xxsmall({ fontWeight: 'bold' })}
				margin-bottom: ${space[2]}px;
			`}
		>
			{title}
		</h2>
	));

const BlockByline: FC<{
	name: string;
	format: ArticleFormat;
	image: Optional<Image>;
}> = ({ name, image, format }) => {
	return (
		<div
			css={css`
				display: flex;
				flex-direction: row;
				padding-bottom: ${space[1]}px;
			`}
		>
			{image.maybeRender((img) => (
				<div style={{ width: '2.25rem', height: '2.25rem' }}>
					<img
						src={img.src}
						alt={name}
						css={css`
							border-radius: 100%;
							object-fit: cover;
							height: 2.25rem;
							width: 2.25rem;
							background-color: ${background.avatar(format)};
						`}
					/>
				</div>
			))}
			<span
				css={css`
					${body.medium()}
					display: flex;
					align-items: center;
					padding-left: ${image.isSome() ? space[1] : 0}px;
				`}
			>
				{name}
			</span>
		</div>
	);
};

const LiveBlockContainer: FC<Props> = ({
	id,
	children,
	format,
	blockTitle,
	blockFirstPublished,
	blockFirstPublishedDisplay,
	blockId,
	isLiveUpdate,
	contributors,
	isPinnedPost,
	supportsDarkMode,
	isOriginalPinnedPost = false,
	host,
	pageId,
}) => {
	return (
		<article
			/**
			 * Pinned posts are not the cannonical source for a post, they're a
			 * copy. Only the *true* post should get the id. This will prevent
			 * two elements on the page having the same id.
			 * */
			id={!isPinnedPost ? `block-${id}` : undefined}
			key={id}
			/**
			 *   Classnames
			 *   ----------
			 * - 'block' is used by Spacefinder as a possible candidate before
			 *   which it can insert an inline ad
			 * - 'pending' is used to mark blocks that have been inserted as
			 *   part of a live update. We use this to animate the reveal as
			 *   well as for enhancing twitter embeds
			 */
			className={`block ${isLiveUpdate ? 'pending' : ''}`}
			css={css`
				padding: ${space[2]}px ${SIDE_MARGIN_MOBILE}px;
				box-sizing: border-box;
				margin-bottom: ${space[3]}px;
				background: ${neutral[100]};
				${!isPinnedPost &&
				`border-top: 1px solid ${border.liveBlock(format)};
				border-bottom: 1px solid ${neutral[86]};`}
				${from.tablet} {
					padding: ${space[2]}px ${SIDE_MARGIN}px;
					padding-left: ${LEFT_MARGIN_DESKTOP}px;
				}

				${darkModeCss(supportsDarkMode)`
					border-top: 1px solid ${border.liveBlockDark(format)};
					background-color: ${neutral[10]};
					color: ${neutral[100]};
					border-bottom: 0;
				`}
			`}
		>
			<Header>
				<FirstPublished
					firstPublished={blockFirstPublished}
					firstPublishedDisplay={blockFirstPublishedDisplay}
					blockId={blockId}
					isPinnedPost={isPinnedPost}
					supportsDarkMode={supportsDarkMode}
					isOriginalPinnedPost={isOriginalPinnedPost}
					format={format}
					host={host}
					pageId={pageId}
				/>
				<BlockTitle blockTitle={blockTitle} />
				{contributors.map((contributor) => (
					<BlockByline
						name={contributor.name}
						image={Optional.fromOption(contributor.image)}
						format={format}
						key={contributor.id}
					/>
				))}
			</Header>
			{children}
		</article>
	);
};

export default LiveBlockContainer;
