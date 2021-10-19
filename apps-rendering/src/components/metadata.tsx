// ----- Imports ----- //

import { css } from '@emotion/react';
import {
	Lines,
	ToggleSwitch,
} from '@guardian/source-react-components-development-kitchen';
import { neutral, remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { Design, Display } from '@guardian/types';
import Avatar from 'components/avatar';
import Byline from 'components/byline';
import CommentCount from 'components/commentCount';
import Dateline from 'components/dateline';
import Follow from 'components/follow';
import type { Item } from 'item';
import { FC, useState } from 'react';
import { darkModeCss } from 'styles';

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
	margin-bottom: ${remSpace[5]};
`;

const metaButtomStyles = css`
	display: flex;
	border-top: 1px solid rgba(255, 255, 255, 0.4);
`;

const alertStyles = css`
	flex-grow: 1;
	padding-top: ${remSpace[2]};
	padding-left: ${remSpace[3]};
	padding-right: ${remSpace[3]};
	${from.phablet} {
		padding-left: 0px;
	}
	${from.tablet} {
		padding-left: ${remSpace[5]};
	}
`;

const liveSidePadding = css`
	padding-left: 10px;
	padding-right: 10px;
	padding-bottom: 8px;
	padding-top: 3px;

	${from.phablet} {
		padding-left: 0px;
		padding-right: 0px;
	}
`;

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

const lineStyles = css`
	div {
		${darkModeCss`
			background-image: repeating-linear-gradient( 
				to bottom, 
				rgba(255, 255, 255, 0.4), 
				rgba(255, 255, 255, 0.4) 1px, 
				transparent 1px, 
				transparent 0.25rem );
			`}

		${from.tablet} {
			${from.mobileLandscape} {
				background-image: repeating-linear-gradient(
					to bottom,
					${neutral[86]},
					${neutral[86]} 1px,
					transparent 1px,
					transparent 0.25rem
				);
			}
		}
	}
`;

const MetadataWithAlertSwitch: FC<Props> = ({ item }: Props) => {
	const [checked, setChecked] = useState<boolean>(false);
	return (
		<div css={css(styles, withBylineStyles, blogStyles)}>
			<div css={lineStyles}>
				<Lines count={4} color={'rgba(255, 255, 255, 0.4)'} />
			</div>
			<Avatar {...item} />
			<div css={css(textStyles, withBylineTextStyles, liveSidePadding)}>
				<Byline {...item} />
				<Dateline date={item.publishDate} format={item} />
				<Follow {...item} />
			</div>
			<div css={metaButtomStyles}>
				<div css={alertStyles}>
					<ToggleSwitch
						checked={checked}
						label={'Get alerts on this story'}
						onClick={(e): void => {
							setChecked(!checked);
							console.log('changed toggle');
						}}
					></ToggleSwitch>
				</div>
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
