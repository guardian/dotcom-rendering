// ----- Imports ----- //

import { ArticleDesign, ArticleDisplay, Pillar } from '../../articleFormat';
import Bullet from './';

// ----- Stories ----- //

const Default = () => (
	<Bullet
		format={{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
		}}
		text="• Lorem ipsum"
	/>
);

// ----- Exports ----- //

export default {
	component: Bullet,
	title: 'AR/Bullet',
};

export { Default };
