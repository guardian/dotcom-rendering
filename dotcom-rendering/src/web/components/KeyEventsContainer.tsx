import KeyEvents, {
	KeyEvent,
} from '@guardian/common-rendering/src/components/keyEvents';

type Props = {
	keyEvents: Block[];
	format: ArticleFormat;
};

export const KeyEventsContainer = ({ keyEvents, format }: Props) => {
	const transformedKeyEvents: KeyEvent[] = keyEvents.reduce(
		(acc: KeyEvent[], keyEvent) => {
			if (keyEvent.title && keyEvent.blockFirstPublishedDisplay) {
				acc.push({
					text: keyEvent.title,
					url: `?page=with:block-${keyEvent.id}#block-${keyEvent.id}`,
					time: keyEvent.blockFirstPublishedDisplay,
				});
			}
			return acc;
		},
		[],
	);
	return (
		<KeyEvents
			theme={format.theme}
			keyEvents={transformedKeyEvents}
			supportsDarkMode={false}
		/>
	);
};
