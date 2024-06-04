import { css } from '@emotion/react';
import {
	lineHeights,
	palette,
	space,
	textSans14,
	textSansBold14,
} from '@guardian/source/foundations';
import { decideContainerOverrides } from '../lib/decideContainerOverrides';
import { revealStyles } from '../lib/revealStyles';
import { useApi } from '../lib/useApi';
import { palette as themePalette } from '../palette';
import type { DCRContainerPalette } from '../types/front';
import { WithLink } from './CardHeadline';
import { ContainerOverrides } from './ContainerOverrides';
import { DateTime } from './DateTime';

type Props = {
	id: string;
	direction: 'horizontal' | 'vertical';
	absoluteServerTimes: boolean;
	isDynamo?: true;
	containerPalette?: DCRContainerPalette;
};

const horizontal = css`
	flex-direction: row;
`;
const vertical = css`
	flex-direction: column;
	padding: 0 ${space[1]}px;
`;

const linkStyles = css`
	${textSans14}
	overflow: hidden;
	flex: 1; /* Distribute space evenly.  */
`;

const dividerStyles = css`
	border-top: 1px solid currentColor;
	border-left: 1px solid currentColor;
`;

const bold = css`
	${textSansBold14};

	:before {
		content: '';
		height: 0.75em;
		width: 0.75em;
		margin-right: ${space[1]}px;
		display: inline-block;
		background-color: currentColor;
		border-radius: 100%;
	}
`;

const transparent = css`
	color: transparent;
`;

const THREE_LINES_AS_CHARACTERS = 75;

/**
 * We cannot rely on [`text-overflow: ellipsis`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow)
 * because that only applies to single lines of text without whitespace wrapping
 */
const extractAboutThreeLines = (text: string) =>
	text.length <= THREE_LINES_AS_CHARACTERS
		? text
		: text
				.slice(0, THREE_LINES_AS_CHARACTERS) // take a few characters
				.split(' ') // split by words
				.slice(0, -1) // drop the last word as it’s likely a partial one
				.join(' ') + '…'; // join with spaces and add an ellipsis

/**
 * Display the last three blocks from a Liveblog when the fronts
 * tool has enabled showing live updates.
 *
 * ## Why does this need to be an Island?
 *
 * We make an API call to retrieve the latest blocks,
 * constantly updating when new data comes in.
 *
 * ---
 *
 * [`LatestLinks` on Chromatic](https://www.chromatic.com/component?appId=63e251470cfbe61776b0ef19&csfId=components-latestlinks&buildNumber=2967)
 */
export const LatestLinks = ({
	id,
	direction,
	isDynamo,
	containerPalette,
	absoluteServerTimes,
}: Props) => {
	const { data } = useApi<{
		blocks: Array<{
			id: string;
			title: string;
			publishedDateTime: number;
			lastUpdatedDateTime: number;
			body: string;
		}>;
	}>(`https://api.nextgen.guardianapps.co.uk${id}.json?rendered=false`, {
		refreshInterval: 9_600,
	});

	const dividerColour = css`
		color: ${containerPalette
			? decideContainerOverrides(containerPalette).border.container
			: palette.neutral[86]};
	`;

	/** Reserve space for the latest links to avoid CLS while loading */
	const minHeight = isDynamo
		? `calc(${space[1]}px + 4 * ${lineHeights.regular}em);`
		: `calc(4 * ${lineHeights.regular}em);`;

	const ulStyle = css`
		display: flex;
		gap: ${space[1]}px;
		box-sizing: border-box;
		min-height: ${minHeight};
	`;

	return (
		<ul
			css={[
				ulStyle,
				revealStyles,
				!!isDynamo || direction === 'horizontal'
					? horizontal
					: vertical,
				css`
					color: ${themePalette('--card-headline-trail-text')};
				`,
			]}
		>
			{data && data.blocks.length >= 3 ? (
				data.blocks
					.filter((block) => block.body.trim() !== '')
					.slice(0, 3)
					.map((block, index) => (
						<>
							<ContainerOverrides
								containerPalette={containerPalette}
							>
								{index > 0 && (
									<li
										key={block.id + ' : divider'}
										css={[dividerStyles, dividerColour]}
									></li>
								)}
								<li
									key={block.id}
									css={linkStyles}
									className={'reveal'}
								>
									<WithLink
										linkTo={`${id}?page=with:block-${block.id}#block-${block.id}`}
										isDynamo={isDynamo}
									>
										<div
											css={bold}
											style={{
												color: themePalette(
													'--card-kicker-text',
												),
											}}
										>
											<DateTime
												date={
													new Date(
														block.publishedDateTime,
													)
												}
												display="relative"
												absoluteServerTimes={
													absoluteServerTimes
												}
												editionId={'UK'}
												showWeekday={false}
												showDate={true}
												showTime={false}
											/>
										</div>
										<span className="show-underline">
											{extractAboutThreeLines(block.body)}
										</span>
									</WithLink>
								</li>
							</ContainerOverrides>
						</>
					))
			) : (
				<>
					<li css={linkStyles} />
					<li css={[dividerStyles, transparent]} />
					<li css={linkStyles} />
					<li css={[dividerStyles, transparent]} />
					<li css={linkStyles} />
				</>
			)}
		</ul>
	);
};
