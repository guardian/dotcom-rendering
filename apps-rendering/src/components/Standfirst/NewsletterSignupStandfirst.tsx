import { css } from '@emotion/react';
import { headlineLight20 } from '@guardian/source/foundations';
import type { Item } from 'item';
import { getFormat } from 'item';
import type { FC } from 'react';
import DefaultStandfirst, { defaultStyles } from './Standfirst.defaults';

const styles = css`
	p {
		padding: 0;
	}

	${headlineLight20}
`;

interface Props {
	item: Item;
}

const NewsletterSignupStandfirst: FC<Props> = ({ item }) => (
	<DefaultStandfirst
		item={item}
		css={css(defaultStyles(getFormat(item)), styles)}
	/>
);

export default NewsletterSignupStandfirst;
