import { css } from '@emotion/react';
import { ArticleSpecial } from '@guardian/libs';
import {
	between,
	from,
	headline,
	remSpace,
	textSans,
} from '@guardian/source-foundations';
import type { Item } from 'item';
import { wideContentWidth } from 'styles';
import { DefaultHeadline, defaultStyles } from './Headline.defaults';

const immersiveStyles = css`
	${headline.medium({ fontWeight: 'bold' })}
	font-weight: 700;
	padding: ${remSpace[1]} ${remSpace[3]} ${remSpace[6]} ${remSpace[3]};
	margin: calc(80vh - 5rem) 0 0;
	position: relative;
	display: inline-block;
	min-height: 112px;
	box-sizing: border-box;

	${between.phablet.and.wide} {
		width: ${wideContentWidth}px;
	}

	${from.desktop} {
		${headline.xlarge({ fontWeight: 'bold' })}
		margin-top: calc(80vh - 7rem);
	}

	${from.wide} {
		width: 100%;
		margin-left: calc(
			((100% - ${wideContentWidth}px) / 2) - ${remSpace[3]}
		);
		padding-left: ${remSpace[3]};

		span {
			display: block;
			width: ${wideContentWidth}px;
		}
	}
`;

const immersiveLabs = css`
	${textSans.xxxlarge({ lineHeight: 'regular', fontWeight: 'bold' })}
	${from.desktop} {
		${textSans.xxxlarge({ lineHeight: 'regular', fontWeight: 'bold' })}
	}
`;

interface Props {
	item: Item;
}

const ImmersiveHeadline: React.FC<Props> = ({ item }) => (
	<DefaultHeadline
		item={item}
		styles={css(
			defaultStyles(item),
			immersiveStyles,
			item.theme === ArticleSpecial.Labs ? immersiveLabs : null,
		)}
	/>
);

export default ImmersiveHeadline;
