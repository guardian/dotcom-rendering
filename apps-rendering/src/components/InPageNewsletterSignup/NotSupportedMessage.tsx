// ----- Imports ----- //

import { InlineError } from '@guardian/source-react-components';
import type { FC } from 'react';

// ----- Component ----- //

const NotSupportedMessage: FC = () => {
	return (
		<InlineError>
			Your version of the app does not support newsletter sign-ups.
		</InlineError>
	);
};

// ----- Exports ----- //

export default NotSupportedMessage;
