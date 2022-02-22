import { renderToString } from 'react-dom/server';
import { KeyEventsContainer } from '../components/KeyEventsContainer';
import { decideDesign } from '../lib/decideDesign';
import { decideDisplay } from '../lib/decideDisplay';
import { decideTheme } from '../lib/decideTheme';

/**
 * keyEventsToHtml is used by the /KeyEvents endpoint as part of keeping liveblogs live
 * It takes an array of json key-event blocks and returns the resulting html string
 *
 * @returns string (the html)
 */
export const keyEventsToHtml = ({
	keyEvents,
	format: CAPIFormat,
	filterKeyEvents,
}: KeyEventsRequest): string => {
	const format: ArticleFormat = {
		display: decideDisplay(CAPIFormat),
		design: decideDesign(CAPIFormat),
		theme: decideTheme(CAPIFormat),
	};

	const html = renderToString(
		<KeyEventsContainer
			keyEvents={keyEvents}
			format={format}
			filterKeyEvents={filterKeyEvents}
		/>,
	);

	return html;
};
