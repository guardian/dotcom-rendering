import { css } from '@emotion/react';
import {
	from,
	headlineBold17,
	space,
	textSans12,
} from '@guardian/source-foundations';
import { decidePalette } from '../lib/decidePalette';
import type { Palette } from '../types/palette';
import { FilterLink } from './FilterLink';

type Props = {
	availableTopics?: Topic[];
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
	${headlineBold17};
	padding-bottom: ${space[3]}px;
`;

const headlineAccentStyles = (palette: Palette) => css`
	color: ${palette.text.betaLabel};
	${textSans12};
	/**
	 * Typography preset styles should not be overridden.
	 * This has been done because the styles do not directly map to the new presets.
	 * Please speak to your team's designer and update this to use a more appropriate preset.
	*/
	line-height: 1.15;
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

const getTopicLink = (isActive: boolean, topics: string, id: Props['id']) => {
	// If active, remove the search params. Otherwise use them.
	const urlParams = new URLSearchParams(isActive ? {} : { topics });
	return `?${urlParams.toString()}#${id}`;
};
const getKeyEventLink = (filterKeyEvents: boolean, id: Props['id']) => {
	const urlParams = new URLSearchParams({
		filterKeyEvents: filterKeyEvents ? 'false' : 'true',
	});

	return `?${urlParams.toString()}#${id}`;
};

const isEqual = (selectedTopic: Topic, availableTopic: Topic) =>
	availableTopic.type === selectedTopic.type &&
	availableTopic.value === selectedTopic.value;

// get top 5 only if they occur in more than 2 blocks
const getTopFiveTopics = (availableTopics: Topic[]) => {
	return availableTopics
		.slice(0, 5)
		.filter((topic) => topic.count !== undefined && topic.count > 2);
};

export const hasRelevantTopics = (availableTopics?: Topic[]) => {
	return !!(availableTopics && getTopFiveTopics(availableTopics).length);
};

export const getTopFiveIncludingSelected = (
	selectedTopic: Topic | undefined,
	availableTopics: Topic[],
) => {
	const topFiveTopics = getTopFiveTopics(availableTopics);

	const selectedIndex = selectedTopic
		? availableTopics.findIndex((availableTopic) =>
				isEqual(selectedTopic, availableTopic),
		  )
		: -1;

	// if selected topic is not within the top 5,
	// replacing the last topic of top 5 with the selected topic
	if (selectedIndex > 4) {
		const remaining = topFiveTopics.slice(0, topFiveTopics.length - 1);

		const selected = availableTopics[selectedIndex];

		if (selected) return remaining.concat([selected]);
	}

	return topFiveTopics;
};

/**
 * # Topic Filter Bank
 *
 * A wrapper of filter links.
 *
 * ---
 *
 * [`TopicFilterBank` on Chromatic](https://www.chromatic.com/component?appId=63e251470cfbe61776b0ef19&csfId=components-topicfilterbank)
 */
export const TopicFilterBank = ({
	availableTopics = [],
	selectedTopics,
	format,
	keyEvents,
	filterKeyEvents = false,
	id,
}: Props) => {
	const hasKeyEvents = keyEvents !== undefined && keyEvents.length > 0;

	if (!hasRelevantTopics(availableTopics) && !hasKeyEvents) return null;
	const palette = decidePalette(format);
	const selectedTopic = selectedTopics?.[0];
	const topFiveTopics = getTopFiveIncludingSelected(
		selectedTopic,
		availableTopics,
	);

	return (
		<div css={containerStyles}>
			<div css={headlineStyles}>
				Filters <span css={headlineAccentStyles(palette)}>BETA</span>
			</div>
			<div css={topicStyles}>
				{hasKeyEvents ? (
					<FilterLink
						value={'Key events'}
						count={keyEvents.length}
						format={format}
						isActive={filterKeyEvents}
						href={getKeyEventLink(filterKeyEvents, id)}
					/>
				) : null}

				{topFiveTopics.map((topic) => {
					const linkParams = `${topic.type}:${topic.value}`;
					const isActive =
						!!selectedTopic && isEqual(selectedTopic, topic);

					return (
						<FilterLink
							value={topic.value}
							type={topic.type}
							count={topic.count}
							format={format}
							isActive={isActive}
							href={getTopicLink(isActive, linkParams, id)}
							key={`filter-${topic.value}`}
						/>
					);
				})}
			</div>
		</div>
	);
};
