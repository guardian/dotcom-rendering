// ----- Imports ----- //

import type { ReactElement } from 'react';
import Placeholder from './index';

// ----- Stories ----- //

const text =
	'Sorry, we couldn’t load this video. Please ensure you’re online in order to watch it.';

const Default = (): ReactElement => <Placeholder text={text} />;

// ----- Exports ----- //

export default {
	component: Placeholder,
	title: 'Editions/Placeholder',
};

export { Default };
