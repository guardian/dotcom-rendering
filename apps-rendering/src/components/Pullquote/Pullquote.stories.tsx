import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { some } from '../../../vendor/@guardian/types/index';
import type { FC } from 'react';
import Pullquote from './';

const standard = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: ArticlePillar.News,
};

const Default: FC = () => (
	<Pullquote
		format={standard}
		attribution={some('Lorem ipsum')}
		quote="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eu nunc dolor. Suspendisse vestibulum non turpis eget porta. Duis pretium est pretium tellus facilisis, eget tempor nibh condimentum. Sed non odio vel tortor rhoncus faucibus sed vel enim. Aliquam eu felis nunc. Phasellus a dui tellus. Suspendisse vel tellus porta, tincidunt massa id, tincidunt erat. Donec congue rutrum justo. Mauris condimentum tellus sit amet purus euismod, ac eleifend tortor tempor. Maecenas tristique auctor est, vitae hendrerit dolor elementum non. Pellentesque porttitor finibus interdum. Etiam hendrerit purus quis risus auctor porttitor quis ut nibh. Sed dictum ex non diam vestibulum aliquet. Ut vel enim at diam suscipit sodales eu sed leo."
	/>
);

export default {
	component: Pullquote,
	title: 'AR/Pullquote',
};

export { Default };
