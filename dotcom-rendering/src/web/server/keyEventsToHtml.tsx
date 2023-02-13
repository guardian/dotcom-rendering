import { renderToString } from 'react-dom/server';
import { KeyEventsContainer } from '../components/KeyEventsContainer';
import { decideFormat } from '../lib/decideFormat';

/**
 * keyEventsToHtml is used by the /KeyEvents endpoint as part of keeping liveblogs live
 * It takes an array of json key-event blocks and returns the resulting html string
 *
 * @returns string (the html)
 */
export const keyEventsToHtml = ({
	keyEvents,
	format: FEFormat,
	filterKeyEvents,
}: FEKeyEventsRequest): string => {
	const html = renderToString(
		<KeyEventsContainer
			keyEvents={keyEvents}
			format={decideFormat(FEFormat)}
			filterKeyEvents={filterKeyEvents}
		/>,
	);

	return html;
};
