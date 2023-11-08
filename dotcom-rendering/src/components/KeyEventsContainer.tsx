import type { KeyEvent } from './KeyEvents';
import { KeyEvents } from './KeyEvents';

type Props = {
	keyEvents: Block[];
	format: ArticleFormat;
	filterKeyEvents: boolean;
};

type ValidBlock = Block & {
	title: string;
	blockFirstPublished: number;
};

const isValidKeyEvent = (keyEvent: Block): keyEvent is ValidBlock => {
	return (
		typeof keyEvent.title === 'string' &&
		typeof keyEvent.blockFirstPublished === 'number'
	);
};

export const KeyEventsContainer = ({
	keyEvents,
	format,
	filterKeyEvents,
}: Props) => {
	const transformedKeyEvents: KeyEvent[] = keyEvents
		.filter(isValidKeyEvent)
		.map((keyEvent) => {
			return {
				text: keyEvent.title,
				url: `?filterKeyEvents=${String(
					filterKeyEvents,
				)}&page=with:block-${keyEvent.id}#block-${keyEvent.id}`,
				date: new Date(keyEvent.blockFirstPublished),
			};
		});

	return <KeyEvents format={format} keyEvents={transformedKeyEvents} />;
};
