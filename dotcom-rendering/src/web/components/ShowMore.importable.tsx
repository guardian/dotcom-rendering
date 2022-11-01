import { css } from '@emotion/react';
import { from, space } from '@guardian/source-foundations';
import { Button, SvgMinus, SvgPlus } from '@guardian/source-react-components';
import { useState } from 'react';
import type { DCRContainerPalette, FEFrontCard } from 'src/types/front';
import { enhanceCards } from '../../model/enhanceCards';
import { shouldPadWrappableRows } from '../lib/dynamicSlices';
import { useApi } from '../lib/useApi';
import { useOnce } from '../lib/useOnce';
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
	if (isOpen) return 'Less';
	return `More ${containerTitle}`;
}

type Props = {
	containerTitle: string;
	path: string;
	containerId: string;
	showAge: boolean;
	containerPalette?: DCRContainerPalette;
};

export const ShowMore = ({
	containerTitle,
	path,
	containerId,
	showAge,
	containerPalette,
}: Props) => {
	function findCardLinks() {
		const containerNode = document.getElementById(containerId);
		const containerLinksArray = Array.from(
			containerNode?.querySelectorAll('a') ?? [],
		);
		return containerLinksArray.map(
			(Element) => Element.attributes.getNamedItem('href')?.value,
		);
	}

	const [cardLinks, setCardLinks] = useState<string[]>([]);

	useOnce(() => {
		const linksArray: string[] = findCardLinks().filter(
			(item): item is string => !!item,
		);
		setCardLinks(linksArray);
	}, [containerId]);

	const [isOpen, setIsOpen] = useState(false);

	function toggleOpen() {
		setIsOpen(!isOpen);
	}

	/** We only pass an actual URL to SWR when 'showMore' is true.
	 * Toggling 'showMore' will trigger a re-render
	 *   @see https://swr.vercel.app/docs/conditional-fetching#conditional
	 */
	const url = isOpen
		? `https://api.nextgen.guardianapps.co.uk/${path}/show-more/${containerId}.json?dcr=true`
		: undefined;
	const { data, loading } = useApi<FEFrontCard[]>(url);

	const filteredData =
		data &&
		enhanceCards(data).filter((card) => !cardLinks.includes(card.url));

	/**
		@todo: Semantics for the button and the new container (sub-container?)
		@todo: Desired focus behaviour on expand/collapse?
		@todo: Appropriate semantics for indicating state (aria-live, aria-expanded etc.)?
		@todo: can we avoid hard-coding the API URL?
		@todo: handle errors
		@todo: rename props to match Front type?
		@todo: make sure that the new content doesn't shift the top of the viewport when it loads
	*/

	const showMoreContainerId = `show-more-${containerId}`;

	return (
		<>
			<div id={showMoreContainerId}>
				{filteredData && (
					<>
						<div
							css={css`
								height: ${space[3]}px;
							`}
						/>
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
			<Button
				priority="tertiary"
				size="xsmall"
				icon={isOpen ? <SvgMinus /> : <SvgPlus />}
				isLoading={loading}
				iconSide="left"
				onClick={toggleOpen}
				cssOverrides={css`
					margin-top: ${space[3]}px;
					${from.tablet} {
						margin-left: 10px;
					}
				`}
				// disabled={loading}
				aria-controls={showMoreContainerId}
				aria-expanded={isOpen && !loading}
				data-cy={`show-more-button-${containerId}`}
			>
				{decideButtonText({ isOpen, loading, containerTitle })}
			</Button>
		</>
	);
};
