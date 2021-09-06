// ----- Imports ----- //

import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import { remSpace } from '@guardian/src-foundations';
import Avatar from 'components/avatar';
import Byline from 'components/byline';
import CommentCount from 'components/commentCount';
import Dateline from 'components/dateline';
import Follow from 'components/follow';
import type { Item } from 'item';
import type { FC } from 'react';

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

const MetadataWithByline: FC<Props> = ({ item }: Props) => (
	<div css={css(styles, withBylineStyles)}>
		<Avatar {...item} />
		<div css={css(textStyles, withBylineTextStyles)}>
			<Byline {...item} />
			<Dateline date={item.publishDate} theme={item.theme} />
			<Follow {...item} />
		</div>
		<CommentCount count={item.commentCount} {...item} />
	</div>
);

const ShortMetadata: FC<Props> = ({ item }: Props) => (
	<div css={styles}>
		<div css={textStyles}>
			<Dateline date={item.publishDate} theme={item.theme} />
			<Follow {...item} />
		</div>
		<CommentCount count={item.commentCount} {...item} />
	</div>
);

const Metadata: FC<Props> = (props: Props) => {
	const { display, design } = props.item;

	if (
		display === ArticleDisplay.Immersive ||
		design === ArticleDesign.Comment ||
		design === ArticleDesign.Letter ||
		design === ArticleDesign.Editorial
	) {
		return <ShortMetadata {...props} />;
	}

	return <MetadataWithByline {...props} />;
};

// ----- Exports ----- //

export default Metadata;
