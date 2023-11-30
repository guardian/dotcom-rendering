import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { isString } from '@guardian/libs';
import { body, from, headline, space } from '@guardian/source-foundations';
import { palette } from '../palette';
import { FirstPublished } from './FirstPublished';

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
	blockFirstPublishedDisplay?: string;
	blockId: string;
	isLiveUpdate?: boolean;
	contributors?: BlockContributor[];
	isPinnedPost: boolean;
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
}: {
	name: string;
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
			{!!imageUrl && (
				<div
					css={css`
						height: ${space[9]}px;
						width: ${space[9]}px;
					`}
				>
					<img
						src={imageUrl}
						alt={name}
						css={css`
							border-radius: 100%;
							display: block;
							width: 100%;
							height: 100%;
							object-fit: cover;
							background-color: ${palette('--avatar-background')};
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

const liveBlockContainerStyles = () => css`
	padding: ${space[2]}px ${SIDE_MARGIN_MOBILE}px;
	box-sizing: border-box;
	margin-bottom: ${space[3]}px;
	background: ${palette('--live-block-container-background')};
	${from.tablet} {
		padding: ${space[2]}px ${SIDE_MARGIN}px;
		padding-left: ${LEFT_MARGIN_DESKTOP}px;
	}
`;

const liveBlockBorderStyles = css`
	border-top: 1px solid ${palette('--live-block-border-top')};
	border-bottom: 1px solid ${palette('--live-block-border-bottom')};
`;

export const LiveBlockContainer = ({
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
			className={['block', isLiveUpdate && 'pending']
				.filter(isString)
				.join(' ')}
			css={[
				liveBlockContainerStyles,
				!isPinnedPost && liveBlockBorderStyles,
			]}
		>
			<Header>
				{blockFirstPublished !== undefined && (
					<FirstPublished
						firstPublished={blockFirstPublished}
						firstPublishedDisplay={blockFirstPublishedDisplay}
						blockId={blockId}
						isPinnedPost={isPinnedPost}
						isOriginalPinnedPost={isOriginalPinnedPost}
						host={host}
						pageId={pageId}
					/>
				)}
				{blockTitle ? <BlockTitle title={blockTitle} /> : null}
				{contributors?.map((contributor) => (
					<BlockByline
						key={[contributor.name, contributor.imageUrl].join(',')}
						name={contributor.name}
						imageUrl={
							contributor.largeImageUrl
								? contributor.largeImageUrl
								: contributor.imageUrl
						}
					/>
				))}
			</Header>
			{children}
		</article>
	);
};
