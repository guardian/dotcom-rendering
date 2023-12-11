// ----- Imports ----- //

import type { ArticleFormat } from '@guardian/libs';
import type { Option } from '../../../vendor/@guardian/types/index';
import type { FC } from 'react';
import DefaultMainMediaCaption, {
	defaultStyles,
} from './MainMediaCaption.defaults';

// ----- Component ----- //

type Props = {
	caption: Option<DocumentFragment>;
	credit: Option<string>;
	format: ArticleFormat;
	id: string;
};

const MainMediaCaption: FC<Props> = ({ caption, credit, format, id }) => {
	return (
		<DefaultMainMediaCaption
			caption={caption}
			credit={credit}
			css={defaultStyles}
			format={format}
			id={id}
		/>
	);
};

// ----- Exports ----- //

export default MainMediaCaption;
