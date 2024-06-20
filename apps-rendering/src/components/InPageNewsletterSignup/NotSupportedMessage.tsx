// ----- Imports ----- //

import { InlineError } from '@guardian/source/react-components';

// ----- Component ----- //

const NotSupportedMessage = () => {
	return (
		<InlineError>
			Your version of the app does not support newsletter sign-ups.
		</InlineError>
	);
};

// ----- Exports ----- //

export default NotSupportedMessage;
