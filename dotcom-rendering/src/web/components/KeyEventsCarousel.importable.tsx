import { ArticleFormat } from '@guardian/libs';
import { KeyEventsCard } from './KeyEventsCards';

interface Props {
	keyEvents: Block[];
	filterKeyEvents: boolean;
	format: ArticleFormat;
}

export const KeyEventsCarousel = ({
	keyEvents,
	filterKeyEvents,
	format,
}: Props) => {
	const transformedKeyEvents = keyEvents
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
		<div>
			{transformedKeyEvents.map((keyEvent) => {
				return (
					<KeyEventsCard
						text={keyEvent.text}
						url={keyEvent.url}
						date={keyEvent.date}
						format={format}
					/>
				);
			})}
		</div>
	);
};
