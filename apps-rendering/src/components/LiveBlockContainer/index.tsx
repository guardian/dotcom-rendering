import { css } from '@emotion/react';
import type { Edition } from '@guardian/apps-rendering-api-models/edition';
import type { ArticleFormat } from '@guardian/libs';
import {
	from,
	neutral,
	space,
	article17,
	headlineBold20,
} from '@guardian/source-foundations';
import FirstPublished from 'components/FirstPublished';
import type { Contributor } from 'contributor';
import type { Image } from 'image';
import { Optional } from 'optional';
import { background, border } from 'palette';
import type { FC, ReactNode } from 'react';
import { darkModeCss } from 'styles';

type Props = {
	id: string;
	children: ReactNode;
	format: ArticleFormat;
	blockTitle: Optional<string>;
	blockFirstPublished: Date;
	blockId: string;
	isLiveUpdate: boolean;
	contributors: Contributor[];
	isPinnedPost: boolean;
	isOriginalPinnedPost: boolean;
	edition: Edition;
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
				${headlineBold20};
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

							${darkModeCss`
								background-color: ${background.avatarDark(format)};
							`}
						`}
					/>
				</div>
			))}
			<span
				css={css`
					${article17};
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
	blockId,
	isLiveUpdate,
	contributors,
	isPinnedPost,
	isOriginalPinnedPost,
	edition,
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

				${darkModeCss`
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
					blockId={blockId}
					isPinnedPost={isPinnedPost}
					isOriginalPinnedPost={isOriginalPinnedPost}
					format={format}
					edition={edition}
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
