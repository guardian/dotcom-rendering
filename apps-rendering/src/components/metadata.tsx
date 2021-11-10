// ----- Imports ----- //

import { css, SerializedStyles } from '@emotion/react';
import {
	Lines,
	ToggleSwitch,
} from '@guardian/source-react-components-development-kitchen';
import { neutral, remSpace } from '@guardian/src-foundations';
import { from, until } from '@guardian/src-foundations/mq';
import { Design, Display } from '@guardian/types';
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
	liveblogPhabletSidePadding,
	sidePadding,
	wideColumnWidth,
} from 'styles';

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
	${from.desktop} {
		width: ${wideColumnWidth}px;
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

const liveblogSidePadding = css`
	${sidePadding}

	padding-bottom: ${remSpace[2]};

	${liveblogPhabletSidePadding}

	${from.desktop} {
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

const isLive = (design: Design): boolean => design === Design.LiveBlog;

const BlogLines: FC<Item> = (item: Item) => (
	<div>
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
	</div>
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
		<div css={css(styles, withBylineStyles, blogStyles)}>
			<BlogLines {...item} />
			<Avatar {...item} />
			<div
				css={css(textStyles, withBylineTextStyles, liveblogSidePadding)}
			>
				<div css={liveBylineStyles}>
					<Byline {...item} />
				</div>
				<Dateline date={item.publishDate} format={item} />
				<Follow {...item} />
			</div>
			<div css={metaBottomStyles(isLive(design))}>
				{isLive(design) && (
					<div css={css(toggleStyles, liveblogSidePadding)}>
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
		display === Display.Immersive ||
		design === Design.Comment ||
		design === Design.Letter ||
		design === Design.Editorial
	) {
		return <ShortMetadata {...props} />;
	} else if (design === Design.LiveBlog || design === Design.DeadBlog) {
		return <MetadataWithAlertSwitch {...props} />;
	}

	return <MetadataWithByline {...props} />;
};

// ----- Exports ----- //

export default Metadata;
