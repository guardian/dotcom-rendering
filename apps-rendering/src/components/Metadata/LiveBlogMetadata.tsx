import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign } from '@guardian/libs';
import {
	breakpoints,
	from,
	neutral,
	remSpace,
	until,
} from '@guardian/source-foundations';
import { ToggleSwitchApps } from '@guardian/source-react-components-development-kitchen';
import Avatar from 'components/Avatar';
import Byline from 'components/Byline';
import CommentCount from 'components/CommentCount';
import Dateline from 'components/Dateline';
import Follow from 'components/Follow';
import LiveblogMetadataLines from 'components/LiveblogMetadataLines';
import Logo from 'components/Logo';
import type { Item } from 'item';
import { getFormat } from 'item';
import { background } from 'palette';
import type { FC } from 'react';
import { useState } from 'react';
import { darkModeCss } from 'styles';
import { defaultStyles } from './Metadata.defaults';

const wrapperStyles = css`
	display: flex;
	margin-bottom: ${remSpace[5]};
	border: 1px solid lilac;
`;

const blogStyles = (format: ArticleFormat): SerializedStyles => css`
	background-color: ${format.design === ArticleDesign.DeadBlog
		? neutral[93]
		: background.liveblogMetadata(format)};

	${from.desktop} {
		background-color: ${neutral[97]};
	}

	${darkModeCss`
		background-color: ${background.articleContentDark(format)};
	`}

	display: block;
	margin-bottom: 0;

	${from.mobileLandscape} {
		padding: 0 ${remSpace[5]};
	}

	${from.tablet} {
		width: ${breakpoints.tablet}px;
		margin: 0 auto;
	}

	${from.desktop} {
		padding: 0;
		width: 100%;
	}
`;

const liveBlogPadding = css`
	padding-left: ${remSpace[3]};
	padding-right: ${remSpace[3]};
	padding-bottom: ${remSpace[2]};

	${from.mobileLandscape} {
		padding-left: 0;
		padding-right: 0;
	}
`;

const liveBylineStyles = css`
	margin-bottom: ${remSpace[2]};
	${from.desktop} {
		margin-bottom: ${remSpace[6]};
	}
`;

const metaBottomStyles = (isLive: boolean): SerializedStyles => css`
	display: flex;
	border-top: 1px solid rgba(255, 255, 255, 0.4);

	${from.desktop} {
		border-top: 1px solid ${neutral[86]};
	}

	${!isLive && `border-top: 1px solid rgba(153, 153, 153, 0.4);`}

	${darkModeCss`
		border-top-color: ${neutral[20]};
	`}
`;

const toggleStyles = css`
	flex-grow: 1;
`;

const toggleOverrideStyles = css`
	padding-right: ${remSpace[1]};

	button {
		margin-top: 8px;
		margin-bottom: 8px;
	}

	${until.desktop} {
		color: ${neutral[100]};

		button[aria-checked='false'] {
			background-color: rgba(255, 255, 255, 0.5);
		}
	}

	${darkModeCss`
		color: ${neutral[93]};
	`}
`;

type Props = {
	item: Item;
};

const LiveBlogMetadata: FC<Props> = ({ item }: Props) => {
	const [checked, setChecked] = useState<boolean>(false);
	const isLive = item.design === ArticleDesign.LiveBlog;

	return (
		<div css={css(wrapperStyles, blogStyles(getFormat(item)))}>
			<LiveblogMetadataLines isLive={isLive} />
			<Logo item={item} />
			<Avatar {...item} />
			<div css={css(defaultStyles, liveBlogPadding)}>
				<div css={liveBylineStyles}>
					<Byline {...item} />
				</div>
				<Dateline
					date={item.publishDate}
					format={item}
					edition={item.edition}
				/>
				<Follow
					format={getFormat(item)}
					contributors={item.contributors}
				/>
			</div>
			<div css={metaBottomStyles(isLive)}>
				{isLive && (
					<div css={css(toggleStyles, liveBlogPadding)}>
						<ToggleSwitchApps
							platform="ios"
							checked={checked}
							label={'Get alerts on this story'}
							cssOverrides={toggleOverrideStyles}
							onClick={(e): void => {
								setChecked(!checked);
								console.log('changed toggle');
							}}
						/>
					</div>
				)}
				<CommentCount count={item.commentCount} {...item} />
			</div>
		</div>
	);
};

export default LiveBlogMetadata;
