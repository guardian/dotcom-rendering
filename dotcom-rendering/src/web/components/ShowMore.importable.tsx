import { css } from '@emotion/react';
<<<<<<< HEAD
import {
	from,
	neutral,
	space,
	visuallyHidden,
} from '@guardian/source-foundations';
import {
	Button,
	InlineError,
	SvgCross,
	SvgPlus,
} from '@guardian/source-react-components';
import { useState } from 'react';
import type { DCRContainerPalette, FEFrontCard } from 'src/types/front';
import { enhanceCards } from '../../model/enhanceCards';
import { shouldPadWrappableRows } from '../lib/dynamicSlices';
import { useApi } from '../lib/useApi';
import { useOnce } from '../lib/useOnce';
=======
import { from, space } from '@guardian/source-foundations';
import { Button, SvgMinus, SvgPlus } from '@guardian/source-react-components';
import { useState } from 'react';
import type { FEFrontCard } from 'src/types/front';
import { enhanceCards } from '../../model/enhanceCards';
import { useApi } from '../lib/useApi';
>>>>>>> ccfeaf550 (WIP: Add ShowMore.importable component)
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import { FrontCard } from './FrontCard';

function decideButtonText({
	isOpen,
	loading,
	containerTitle,
}: {
	isOpen: boolean;
	loading: boolean;
	containerTitle: string;
}) {
	if (isOpen && loading) return 'Loading';
<<<<<<< HEAD
	if (isOpen) return `Less ${containerTitle}`;
=======
	if (isOpen) return 'Less';
>>>>>>> ccfeaf550 (WIP: Add ShowMore.importable component)
	return `More ${containerTitle}`;
}

type Props = {
	containerTitle: string;
	path: string;
	containerId: string;
<<<<<<< HEAD
	showAge: boolean;
	baseUrl: string;
	containerPalette?: DCRContainerPalette;
};

export const ShowMore = ({
	containerTitle,
	path,
	containerId,
	showAge,
	baseUrl,
	containerPalette,
}: Props) => {
	const [existingCardLinks, setExistingCardLinks] = useState<string[]>([]);
	const [isOpen, setIsOpen] = useState(false);

	/**
		@todo: Fix focus behaviour on expand/collapse: @see https://github.com/guardian/dotcom-rendering/issues/6343
	*/

	useOnce(() => {
		const container = document.getElementById(containerId);
		const containerLinks = Array.from(
			container?.querySelectorAll('a') ?? [],
		)
			.map((element) => element.attributes.getNamedItem('href')?.value)
			// Remove values that are not strings and coerce the type to a string[]
			.filter((item): item is string => !!item);

		setExistingCardLinks(containerLinks);
	}, []);
=======
};

export const ShowMore = ({ containerTitle, path, containerId }: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	function toggleOpen() {
		setIsOpen(!isOpen);
	}
>>>>>>> ccfeaf550 (WIP: Add ShowMore.importable component)

	/** We only pass an actual URL to SWR when 'showMore' is true.
	 * Toggling 'showMore' will trigger a re-render
	 *   @see https://swr.vercel.app/docs/conditional-fetching#conditional
	 */
	const url = isOpen
		? `${baseUrl}/${path}/show-more/${containerId}.json?dcr=true`
		: undefined;
<<<<<<< HEAD
	const { data, error, loading } = useApi<FEFrontCard[]>(url);

	const filteredData =
		data &&
		enhanceCards(data).filter(
			(card) => !existingCardLinks.includes(card.url),
		);

	const showMoreContainerId = `show-more-${containerId}`;

	return (
		<>
			<div id={showMoreContainerId} aria-live="polite">
				{filteredData && (
					<>
						<div
							css={css`
								height: ${space[3]}px;
							`}
						/>
						<h4
							css={css`
								${visuallyHidden}
							`}
						>
							More {containerTitle}
						</h4>
						<UL direction="row" wrapCards={true}>
							{filteredData.map((card, cardIndex) => {
								const columns = 3;
								return (
									<LI
										key={card.url}
										percentage="33.333%"
										stretch={
											filteredData.length % columns !== 1
										}
										padSides={true}
										showDivider={cardIndex % columns !== 0}
										offsetBottomPaddingOnDivider={shouldPadWrappableRows(
											cardIndex,
											filteredData.length -
												(filteredData.length % columns),
											columns,
										)}
									>
										<FrontCard
											trail={card}
											imageUrl={undefined}
											avatarUrl={undefined}
											containerPalette={containerPalette}
											showAge={showAge}
											headlineSize="small"
										/>
									</LI>
								);
							})}
						</UL>
					</>
				)}
			</div>
			<div
				css={css`
					display: flex;
				`}
			>
				<Button
					priority="tertiary"
					size="small"
					icon={isOpen ? <SvgCross /> : <SvgPlus />}
					isLoading={loading}
					iconSide="left"
					onClick={() => setIsOpen(!isOpen)}
					cssOverrides={css`
						margin-top: ${space[4]}px;
						margin-right: 10px;
						color: ${neutral[100]};
						background-color: ${neutral[7]};
						&:hover {
							color: ${neutral[7]};
						}
						${from.tablet} {
							margin-left: 10px;
						}
					`}
					aria-controls={showMoreContainerId}
					aria-expanded={isOpen && !loading}
					data-cy={`show-more-button-${containerId}`}
				>
					{decideButtonText({
						isOpen,
						loading,
						containerTitle,
					})}
				</Button>
				{error && (
					<InlineError
						cssOverrides={css`
							font-size: 14px;
							padding-top: 18px;
						`}
					>
						Sorry, failed to load more stories. Retrying in a few
						seconds.
					</InlineError>
				)}
			</div>
=======
	const { data, loading } = useApi<FEFrontCard[]>(url);

	/**
		@todo: Semantics for the button and the new container (sub-container?)
		@todo: Desired focus behaviour on expand/collapse?
		@todo: Appropriate semantics for indicating state (aria-live, aria-expanded etc.)?
		@todo: can we avoid hard-coding the API URL?
		@todo: handle errors
		@todo: deduping
			@todo: get visibleCardIds from DOM instead of as a prop
		@todo: rename props to match Front type?
		@todo: make sure that the new content doesn't shift the top of the viewport when it loads
	*/

	return (
		<>
			{data && (
				<>
					<div
						css={css`
							height: ${space[3]}px;
						`}
					/>
					<UL>
						{enhanceCards(data).map((trail) => (
							<LI key={trail.url} padSides={true}>
								<FrontCard trail={trail} imageUrl={undefined} />
							</LI>
						))}
					</UL>
				</>
			)}
			<Button
				priority="tertiary"
				size="xsmall"
				icon={isOpen && !loading ? <SvgMinus /> : <SvgPlus />}
				iconSide="left"
				onClick={toggleOpen}
				cssOverrides={css`
					margin-top: ${space[3]}px;
					${from.tablet} {
						margin-left: 10px;
					}
				`}
				disabled={loading}
				data-cy={`show-more-button-${containerId}`}
			>
				{decideButtonText({ isOpen, loading, containerTitle })}
			</Button>
>>>>>>> ccfeaf550 (WIP: Add ShowMore.importable component)
		</>
	);
};
