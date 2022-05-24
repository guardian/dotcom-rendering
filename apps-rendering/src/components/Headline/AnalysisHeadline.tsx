import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { border } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import { from, headline, neutral } from '@guardian/source-foundations';
import type { Item } from 'item';
import { darkModeCss } from 'styles';
import { DefaultHeadline, defaultStyles } from './Headline.defaults';

const analysisStyles = (format: ArticleFormat): SerializedStyles => css`
	${headline.small({ lineHeight: 'regular', fontWeight: 'light' })}

	${from.tablet} {
		${headline.medium({ lineHeight: 'regular', fontWeight: 'light' })}
	}

	span {
		box-shadow: inset 0 -0.025rem ${border.articleLink(format)};
		padding-bottom: 0.2rem;

		${darkModeCss`
            box-shadow: inset 0 -0.025rem ${neutral[46]};
        `}
	}
`;

interface Props {
	item: Item;
}

const AnalysisHeadline: React.FC<Props> = ({ item }) => (
	<DefaultHeadline
		item={item}
		styles={css(defaultStyles(item), analysisStyles(item))}
	/>
);

export default AnalysisHeadline;
