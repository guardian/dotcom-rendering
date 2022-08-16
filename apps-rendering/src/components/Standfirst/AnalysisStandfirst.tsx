import { css } from '@emotion/react';
import { headline } from '@guardian/source-foundations';
import type { Item } from 'item';
import { getFormat } from 'item';
import DefaultStandfirst, { defaultStyles } from './Standfirst.defaults';

interface Props {
	item: Item;
}

const AnalysisStandfirst: React.FC<Props> = ({ item }) => (
	<>
		<p
			css={css`
				${headline.xxxsmall({ fontWeight: 'bold' })}
			`}
		>
			Analysis
		</p>
		<DefaultStandfirst
			item={item}
			css={css(
				defaultStyles(getFormat(item)),
				css`
					p:first-child {
						padding-top: 0;
					}
				`,
			)}
		/>
	</>
);

export default AnalysisStandfirst;
