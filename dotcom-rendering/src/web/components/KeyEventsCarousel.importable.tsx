import { css } from '@emotion/react';
import { ArticleFormat } from '@guardian/libs';
import { KeyEventsCard } from './KeyEventsCards';

interface Props {
	keyEvents: Block[];
	filterKeyEvents: boolean;
	format: ArticleFormat;
}

const containerStyles = css`
	overflow: hidden;
	scroll-snap-type: x mandatory;
	scroll-behavior: smooth;
	overflow-x: auto;
	overflow-y: hidden;
`;
const carouselStyles = css`
	display: flex;
	justify-content: space-between;
	position: relative;
	flex-direction: row;
	align-items: stretch;
	width: fit-content;
`;

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
		<div css={containerStyles}>
			<span css={carouselStyles}>
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
			</span>
		</div>
	);
};
