// ----- Imports ----- //

import type { FC } from 'react';
import Example from './example';

// ----- Stories ----- //

const Default: FC = () =>
	<Example
		person={{
			firstName: 'CP',
			lastName: 'Scott',
		}}
	/>

// ----- Exports ----- //

export default {
	component: Example,
	title: 'Common/Components/Example',
}

export {
	Default,
}
