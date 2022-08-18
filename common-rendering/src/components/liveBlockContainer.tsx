import { css } from '@emotion/react';
import {
	neutral,
	from,
	space,
	headline,
	body,
} from '@guardian/source-foundations';
import { FirstPublished } from './FirstPublished';
import { darkModeCss } from '../lib';
import { background, border } from '../editorialPalette';
import { ArticleFormat } from '@guardian/libs';

type BlockContributor = {
	name: string;
	imageUrl?: string;
	largeImageUrl?: string;
};

type Props = {
	id: string;
	children: React.ReactNode;
	format: ArticleFormat;
	blockTitle?: string;
	blockFirstPublished?: number;
	blockFirstPublishedDisplay: string;
	blockId: string;
	isLiveUpdate?: boolean;
	contributors?: BlockContributor[];
	isPinnedPost: boolean;
	supportsDarkMode: boolean;
	isOriginalPinnedPost?: boolean;
	host?: string;
	pageId?: string;
};

const LEFT_MARGIN_DESKTOP = 60;
const SIDE_MARGIN = space[5];
const SIDE_MARGIN_MOBILE = 10;

const Header = ({ children }: { children: React.ReactNode }) => {
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

const BlockTitle = ({ title }: { title: string }) => {
	return (
		<h2
			css={css`
				${headline.xxsmall({ fontWeight: 'bold' })}
				margin-bottom: ${space[2]}px;
			`}
		>
			{title}
		</h2>
	);
};

const BlockByline = ({
	name,
	imageUrl,
	format,
}: {
	name: string;
	format: ArticleFormat;
	imageUrl?: string;
}) => {
	return (
		<div
			css={css`
				display: flex;
				flex-direction: row;
				padding-bottom: ${space[1]}px;
			`}
		>
			{imageUrl && (
				<div style={{ width: '2.25rem', height: '2.25rem' }}>
					<img
						src={imageUrl}
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
			)}
			<span
				css={css`
					${body.medium()}
					display: flex;
					align-items: center;
					padding-left: ${imageUrl ? space[1] : 0}px;
				`}
			>
				{name}
			</span>
		</div>
	);
};

const LiveBlockContainer = ({
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
}: Props) => {
	return (
		<article
			/**
			 * Pinned posts are not the cannonical source for a post, they're a copy. Only the *true* post
			 * should get the id. This will prevent two elements on the page having the same id.
			 * */
			id={!isPinnedPost ? `block-${id}` : undefined}
			key={id}
			/**
			 *   Classnames
			 *   ----------
			 * - 'block' is used by Spacefinder as a possible candidate before which it can insert an inline ad
			 * - 'pending' is used to mark blocks that have been inserted as part of a live update. We use this
			 *    to animate the reveal as well as for enhancing twitter embeds
			 */
			className={`block ${isLiveUpdate && 'pending'}`}
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
				{blockFirstPublished && (
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
				)}
				{blockTitle ? <BlockTitle title={blockTitle} /> : null}
				{contributors &&
					contributors.map((contributor) => (
						<BlockByline
							name={contributor.name}
							imageUrl={
								contributor.largeImageUrl
									? contributor.largeImageUrl
									: contributor.imageUrl
							}
							format={format}
						/>
					))}
			</Header>
			{children}
		</article>
	);
};

export default LiveBlockContainer;
export type { BlockContributor };
