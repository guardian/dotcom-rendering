// ----- Imports ----- //

import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import { background } from '@guardian/common-rendering/src/editorialPalette';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import {
	breakpoints,
	from,
	neutral,
	remSpace,
	until,
} from '@guardian/source-foundations';
import {
	StraightLines,
	ToggleSwitchApps,
} from '@guardian/source-react-components-development-kitchen';
import Avatar from 'components/Avatar';
import Byline from 'components/Byline';
import CommentCount from 'components/CommentCount';
import Dateline from 'components/Dateline';
import Follow from 'components/Follow';
import Logo from 'components/Logo';
import type { Item } from 'item';
import { getFormat } from 'item';
import type { FC } from 'react';
import { useState } from 'react';
import { darkModeCss } from 'styles';
import GalleryMetadata from './GalleryMetadata';
import ImmersiveMetadata from './ImmersiveMetadata';

// ----- Component ----- //

interface Props {
	item: Item;
}

const styles = css`
	display: flex;
	margin-bottom: ${remSpace[5]};
`;

const withBylineStyles = css`
	margin-bottom: ${remSpace[5]};
`;

const textStyles = css`
	flex-grow: 1;
`;

const withBylineTextStyles = css`
	padding-top: ${remSpace[1]};
`;

const blogStyles = css`
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

const liveBlogPadding = css`
	padding-left: ${remSpace[3]};
	padding-right: ${remSpace[3]};
	padding-bottom: ${remSpace[2]};

	${from.mobileLandscape} {
		padding-left: 0;
		padding-right: 0;
	}
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

const liveBylineStyles = css`
	margin-bottom: ${remSpace[2]};
	${from.desktop} {
		margin-bottom: ${remSpace[6]};
	}
`;

const linesStyles = css`
	display: none;
	${until.desktop} {
		display: block;
	}
`;

const linesDesktopStyles = css`
	display: none;
	${from.desktop} {
		display: block;
	}
	${darkModeCss`${from.desktop} {display: none;}`}
`;

const linesDarkStyles = css`
	display: none;
	${darkModeCss`${from.desktop} {display: block;}`}
`;

const isLive = (design: ArticleDesign): boolean =>
	design === ArticleDesign.LiveBlog;

// This styling function is only temprarily used and will be removed
// after the liveblog header is completed and background colours
// are added
const tempraryBackgroundStyle = (format: ArticleFormat): SerializedStyles => {
	switch (format.design) {
		case ArticleDesign.DeadBlog:
			return css`
				background-color: ${neutral[93]};
				${from.desktop} {
					background-color: ${neutral[97]};
				}

				${darkModeCss`
					background-color: ${background.articleContentDark(format)};
				`}
			`;
		default:
			return css`
				background-color: ${background.liveblogMetadata(format)};

				${from.desktop} {
					background-color: ${neutral[97]};
				}

				${darkModeCss`
					background-color: ${background.articleContentDark(format)};
				`}
			`;
	}
};

const BlogLines: FC<Item> = (item: Item) => (
	<>
		<StraightLines
			color={
				isLive(item.design)
					? 'rgba(255, 255, 255, 0.4)'
					: 'rgba(153, 153, 153, 0.4)'
			}
			cssOverrides={linesStyles}
		/>
		<StraightLines color={neutral[86]} cssOverrides={linesDesktopStyles} />
		<StraightLines
			color={
				isLive(item.design) ? neutral[20] : 'rgba(237, 237, 237, 0.4)'
			}
			cssOverrides={linesDarkStyles}
		/>
	</>
);

const MetadataWithByline: FC<Props> = ({ item }: Props) => (
	<div css={css(styles, withBylineStyles)}>
		<Avatar {...item} />
		<div css={css(textStyles, withBylineTextStyles)}>
			<Byline {...item} />
			<Dateline
				date={item.publishDate}
				format={item}
				edition={item.edition}
			/>
			<Follow format={getFormat(item)} contributors={item.contributors} />
		</div>
		<CommentCount count={item.commentCount} {...item} />
	</div>
);

const ShortMetadata: FC<Props> = ({ item }: Props) => (
	<div css={styles}>
		<div css={textStyles}>
			<Dateline
				date={item.publishDate}
				format={item}
				edition={item.edition}
			/>
			<Follow format={getFormat(item)} contributors={item.contributors} />
		</div>
		<CommentCount count={item.commentCount} {...item} />
	</div>
);

const MetadataWithAlertSwitch: FC<Props> = ({ item }: Props) => {
	const { design } = item;
	const [checked, setChecked] = useState<boolean>(false);
	return (
		<div
			css={css(
				styles,
				withBylineStyles,
				blogStyles,
				tempraryBackgroundStyle(item),
			)}
		>
			<BlogLines {...item} />
			<Logo item={item} />
			<Avatar {...item} />
			<div css={css(textStyles, withBylineTextStyles, liveBlogPadding)}>
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
			<div css={metaBottomStyles(isLive(design))}>
				{isLive(design) && (
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
						></ToggleSwitchApps>
					</div>
				)}
				<CommentCount count={item.commentCount} {...item} />
			</div>
		</div>
	);
};

const Metadata: FC<Props> = (props: Props) => {
	const { display, design } = props.item;

	if (display === ArticleDisplay.Immersive) {
		return (
			<ImmersiveMetadata
				format={getFormat(props.item)}
				publishDate={props.item.publishDate}
				commentCount={props.item.commentCount}
				contributors={props.item.contributors}
				commentable={props.item.commentable}
				edition={props.item.edition}
			/>
		);
	}

	if (design === ArticleDesign.Gallery) {
		return (
			<GalleryMetadata
				format={getFormat(props.item)}
				publishDate={props.item.publishDate}
				commentCount={props.item.commentCount}
				contributors={props.item.contributors}
				commentable={props.item.commentable}
				edition={props.item.edition}
			/>
		);
	} else if (
		design === ArticleDesign.Comment ||
		design === ArticleDesign.Letter ||
		design === ArticleDesign.Editorial ||
		design === ArticleDesign.Analysis
	) {
		return <ShortMetadata {...props} />;
	} else if (
		design === ArticleDesign.LiveBlog ||
		design === ArticleDesign.DeadBlog
	) {
		return <MetadataWithAlertSwitch {...props} />;
	}

	return <MetadataWithByline {...props} />;
};

// ----- Exports ----- //

export default Metadata;
