import KeyEvents, {
	KeyEvent,
} from '@guardian/common-rendering/src/components/keyEvents';
import { useEffect, useState } from 'react';

type Props = {
	keyEvents: Block[];
	format: ArticleFormat;
};

export const KeyEventsContainer = ({ keyEvents, format }: Props) => {
	const [filterKeyEvents, setFilterKeyEvents] = useState(false);

	useEffect(() => {
		setFilterKeyEvents(
			window.location.search.includes('filterKeyEvents=true'),
		);
	}, [setFilterKeyEvents]);

	const transformedKeyEvents: KeyEvent[] = keyEvents
		.filter((keyEvent) => {
			return keyEvent.title && keyEvent.blockFirstPublished;
		})
		.map((keyEvent) => {
			return {
				text: keyEvent.title || '', // We fallback to '' here purely to keep ts happy
				url: `?filterKeyEvents=${filterKeyEvents}&page=with:block-${keyEvent.id}#block-${keyEvent.id}`,
				date: new Date(keyEvent.blockFirstPublished || ''), // We fallback to '' here purely to keep ts happy
			};
		});

	return (
		<KeyEvents
			theme={format.theme}
			keyEvents={transformedKeyEvents}
			supportsDarkMode={false}
		/>
	);
};
