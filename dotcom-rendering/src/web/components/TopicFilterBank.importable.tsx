import { css } from '@emotion/react';
import { from, headline, space, textSans } from '@guardian/source-foundations';
import { decidePalette } from '../lib/decidePalette';
import { FilterButton } from './FilterButton.importable';

type Props = {
	availableTopics: Topic[];
	selectedTopics?: Topic[];
	format: ArticleFormat;
	filterKeyEvents: boolean;
	keyEvents?: Block[];
	id: 'key-events-carousel-desktop' | 'key-events-carousel-mobile';
};

const containerStyles = css`
	padding: ${space[3]}px 0;
	width: 100%;
`;
const headlineStyles = css`
	${headline.xxxsmall({ fontWeight: 'bold', lineHeight: 'tight' })}
	padding-bottom: ${space[3]}px;
`;

const headlineAccentStyles = (palette: Palette) => css`
	color: ${palette.text.betaLabel};
	${textSans.xxsmall({ fontWeight: 'regular', lineHeight: 'tight' })};
`;

const topicStyles = css`
	display: flex;
	align-items: flex-start;
	flex-direction: row;
	flex-wrap: wrap;
	column-gap: ${space[2]}px;
	row-gap: ${space[2]}px;
	${from.desktop} {
		flex-direction: column;
		flex-wrap: nowrap;
		column-gap: 0;
	}
`;

const handleTopicClick = (
	isActive: boolean,
	buttonParams: string,
	id: string,
) => {
	const urlParams = new URLSearchParams(window.location.search);

	if (!isActive) {
		urlParams.set('topics', buttonParams);
	} else {
		urlParams.delete('topics');
	}
	urlParams.delete('page'); // direct to the first page
	urlParams.delete('filterKeyEvents');

	window.location.hash = id;
	window.location.search = urlParams.toString();
};

const handleKeyEventClick = (filterKeyEvents: boolean, id: string) => {
	const urlParams = new URLSearchParams(window.location.search);

	urlParams.set('filterKeyEvents', filterKeyEvents ? 'false' : 'true');
	urlParams.delete('page'); // direct to the first page
	urlParams.delete('topics');

	window.location.hash = id;
	window.location.search = urlParams.toString();
};

const isEqual = (selectedTopic: Topic, availableTopic: Topic) =>
	availableTopic.type === selectedTopic.type &&
	availableTopic.value === selectedTopic.value;

export const TopicFilterBank = ({
	availableTopics,
	selectedTopics,
	format,
	keyEvents,
	filterKeyEvents = false,
	id,
}: Props) => {
	const palette = decidePalette(format);
	const selectedTopic = selectedTopics?.[0];
	const topFiveTopics = availableTopics.slice(0, 5);

	if (selectedTopic) {
		const selectedIndex = availableTopics.findIndex((availableTopic) =>
			isEqual(selectedTopic, availableTopic),
		);

		if (selectedIndex > 4) {
			topFiveTopics.splice(4, 1, availableTopics[selectedIndex]);
		}
	}

	return (
		<div css={containerStyles}>
			<div css={headlineStyles}>
				Filters <span css={headlineAccentStyles(palette)}>BETA</span>
			</div>
			<div css={topicStyles}>
				{keyEvents?.length ? (
					<FilterButton
						value={'Key events'}
						count={keyEvents.length}
						format={format}
						isActive={filterKeyEvents}
						onClick={() => {
							handleKeyEventClick(filterKeyEvents, id);
						}}
					/>
				) : (
					<></>
				)}

				{topFiveTopics.map((topic) => {
					const buttonParams = `${topic.type}:${topic.value}`;
					const isActive =
						!!selectedTopic && isEqual(selectedTopic, topic);

					return (
						<FilterButton
							value={topic.value}
							type={topic.type}
							count={topic.count}
							format={format}
							isActive={isActive}
							onClick={() =>
								handleTopicClick(isActive, buttonParams, id)
							}
						/>
					);
				})}
			</div>
		</div>
	);
};
