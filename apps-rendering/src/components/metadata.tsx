// ----- Imports ----- //

import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import {
	Lines,
	ToggleSwitch,
} from '@guardian/source-react-components-development-kitchen';
import { breakpoints, neutral, remSpace } from '@guardian/src-foundations';
import { from, until } from '@guardian/src-foundations/mq';
import Avatar from 'components/avatar';
import Byline from 'components/byline';
import CommentCount from 'components/commentCount';
import Dateline from 'components/dateline';
import Follow from 'components/follow';
import type { Item } from 'item';
import type { FC } from 'react';
import { useState } from 'react';
import {
	darkModeCss,
} from 'styles';
import { getThemeStyles } from 'themeStyles';

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
		margin-bottom: ${remSpace[2]};
	}
`;

const metaBottomStyles = (isLive: boolean): SerializedStyles => css`
	display: flex;
	border-top: 1px solid rgba(255, 255, 255, 0.4);

	${from.desktop} {
		border-top: 1px solid ${neutral[86]};
	}

	${!isLive && `border-top: 1px solid rgba(153, 153, 153, 0.4);`}
`;

const toggleStyles = css`
	flex-grow: 1;
`;

const liveBlogPadding = css`
	padding-left: ${remSpace[3]};
	padding-right: ${remSpace[3]};
	
	${from.mobileLandscape} {
		padding-left: 0;
		padding-right: 0;
	}
`;

const toggleOverrideStyles = css`
	padding-right: ${remSpace[1]};

	${until.desktop} {
		button[aria-checked='false'] {
			background-color: rgba(255, 255, 255, 0.5);
		}

		label {
			color: ${neutral[100]};
		}
	}
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
// after the liveblog header is completed and ackground colours
// are added
const tempraryBackgroundStyle = (format: ArticleFormat): SerializedStyles => {
	const themeStyles = getThemeStyles(format.theme);
	switch (format.design) {
		case ArticleDesign.DeadBlog:
			return css`
				background-color: ${neutral[93]};
				${from.desktop} {
					background-color: ${neutral[97]};
				}
				@media (prefers-color-scheme: dark) {
					background-color: ${neutral[10]};
				}
			`;
		default:
			return css`
				background-color: ${themeStyles.liveblogBackground};
				${from.desktop} {
					background-color: ${neutral[97]};
				}
				@media (prefers-color-scheme: dark) {
					background-color: ${themeStyles.liveblogDarkBackground};
					${from.desktop} {
						background-color: ${neutral[10]};
					}
				}
			`;
	}
};

const BlogLines: FC<Item> = (item: Item) => (
	<>
		<Lines
			color={
				isLive(item.design)
					? 'rgba(255, 255, 255, 0.4)'
					: 'rgba(153, 153, 153, 0.4)'
			}
			cssOverrides={linesStyles}
		/>
		<Lines color={neutral[86]} cssOverrides={linesDesktopStyles} />
		<Lines
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
			<Dateline date={item.publishDate} format={item} />
			<Follow {...item} />
		</div>
		<CommentCount count={item.commentCount} {...item} />
	</div>
);

const ShortMetadata: FC<Props> = ({ item }: Props) => (
	<div css={styles}>
		<div css={textStyles}>
			<Dateline date={item.publishDate} format={item} />
			<Follow {...item} />
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
			<Avatar {...item} />
			<div
				css={css(textStyles, withBylineTextStyles, liveBlogPadding)}
			>
				<div css={liveBylineStyles}>
					<Byline {...item} />
				</div>
				<Dateline date={item.publishDate} format={item} />
				<Follow {...item} />
			</div>
			<div css={metaBottomStyles(isLive(design))}>
				{isLive(design) && (
					<div css={css(toggleStyles, liveBlogPadding)}>
						<ToggleSwitch
							checked={checked}
							label={'Get alerts on this story'}
							cssOverrides={toggleOverrideStyles}
							onClick={(e): void => {
								setChecked(!checked);
								console.log('changed toggle');
							}}
						></ToggleSwitch>
					</div>
				)}
				<CommentCount count={item.commentCount} {...item} />
			</div>
		</div>
	);
};

const Metadata: FC<Props> = (props: Props) => {
	const { display, design } = props.item;

	if (
		display === ArticleDisplay.Immersive ||
		design === ArticleDesign.Comment ||
		design === ArticleDesign.Letter ||
		design === ArticleDesign.Editorial
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
