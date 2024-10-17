import { css } from '@emotion/react';
import { from, palette, space, textSans14 } from '@guardian/source/foundations';
import { LinkButton } from '@guardian/source/react-components';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { center } from '../lib/center';
import {
	type Edition,
	type EditionId,
	getEditionFromId,
	getEditionFromPageId,
} from '../lib/edition';
import { getZIndex } from '../lib/getZIndex';
import {
	hideEditionSwitcherBanner,
	useEditionSwitcherBanner,
} from '../lib/useUserPreferredEdition';
import XIcon from '../static/icons/x.svg';

// The length of the swipe up on the y-axis in pixels necesary to close the banner
const THRESHOLD = 6;

const hideBannerStyles = css`
	top: -200px;
	transition: all 3s;
`;

const container = css`
	position: sticky;
	top: 0;
	background-color: ${palette.brand[800]};
	${getZIndex('editionSwitcherBanner')};
`;

const content = css`
	display: flex;
	justify-content: space-between;
	padding: 10px;
	align-items: flex-start;
	${center}

	${from.mobileLandscape} {
		padding: 10px ${space[5]}px;
	}

	${from.phablet} {
		align-items: center;
	}
`;

const textAndLink = css`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 10px;
	${textSans14};

	${from.phablet} {
		flex-direction: row;
		align-items: center;
		gap: ${space[5]}px;
	}
`;

const linkButton = css`
	${from.phablet} {
		padding: 18px ${space[4]}px;
	}
`;

const closeButton = css`
	cursor: pointer;
	display: flex;
	justify-content: center;
	padding: 0;
	background-color: unset;
	border: none;
`;

const onPointerDown = (
	event: React.PointerEvent,
	setIsDown: Dispatch<SetStateAction<boolean>>,
	setLastDownYCoord: Dispatch<SetStateAction<number | null>>,
) => {
	event.preventDefault();

	setIsDown(true);
	setLastDownYCoord(event.clientY);
};

const onPointerUp = (
	event: React.PointerEvent,
	lastDownYCoord: number | null,
	setIsDown: Dispatch<SetStateAction<boolean>>,
	setIsSwipeUp: Dispatch<SetStateAction<boolean>>,
) => {
	event.preventDefault();
	setIsDown(false);

	if (lastDownYCoord !== null && event.clientY + THRESHOLD < lastDownYCoord) {
		setIsSwipeUp(true);
	}
};

type Props = {
	pageId: Edition['pageId'];
	edition: EditionId;
};

const getEditionNameFromEdition = (edition: Edition) => {
	return edition.title.replace(' edition', '');
};

/**
 * Displays a banner between the header and main content on network fronts.
 * Provides a link to switch to the homepage of the user's preferred edition.
 *
 * See PR for details: https://github.com/guardian/dotcom-rendering/pull/11763
 */
export const EditionSwitcherBanner = ({ pageId, edition }: Props) => {
	const { showBanner, isBannerClosed } = useEditionSwitcherBanner(
		pageId,
		edition,
	);

	const [lastDownYCoord, setLastDownYCoord] = useState<number | null>(null);
	const [isDown, setIsDown] = useState(false);
	const [isSwipeUp, setIsSwipeUp] = useState(false);

	// The y-axis distance from the pointer down and current pointer, whilst the pointer is still down.
	const [pointerUpDistance, setPointerUpDistance] = useState(0);

	const suggestedEdition = getEditionFromId(edition);
	const suggestedPageId = suggestedEdition.pageId;
	const suggestedEditionName = getEditionNameFromEdition(suggestedEdition);

	const defaultEdition = getEditionFromPageId(pageId);

	if (isBannerClosed || !showBanner || !defaultEdition) {
		return null;
	}

	const defaultEditionName = getEditionNameFromEdition(defaultEdition);

	return (
		<aside
			id="edition-switcher-banner"
			data-component="edition-switcher-banner"
			css={[
				container,
				isSwipeUp && hideBannerStyles,
				isDown &&
					css`
						top: ${pointerUpDistance}px;
					`,
			]}
			onPointerDown={(e) =>
				onPointerDown(e, setIsDown, setLastDownYCoord)
			}
			onPointerUp={(e) =>
				onPointerUp(e, lastDownYCoord, setIsDown, setIsSwipeUp)
			}
			onTouchStart={(e) => {
				e.preventDefault();
			}}
			onPointerMove={(e) => {
				if (isDown) {
					setPointerUpDistance(
						Math.min(0, e.clientY - (lastDownYCoord ?? 0)),
					);
				}
			}}
		>
			<div css={content}>
				<div css={textAndLink}>
					<p>You are viewing the {defaultEditionName} homepage</p>
					<LinkButton
						href={`/${suggestedPageId}`}
						priority="primary"
						size="xsmall"
						cssOverrides={linkButton}
						data-link-name="edition-switcher-banner switch-edition"
					>
						View the {suggestedEditionName} homepage
					</LinkButton>
				</div>
				<button
					type="button"
					css={closeButton}
					data-link-name="edition-switcher-banner close-banner"
					onClick={() => {
						hideEditionSwitcherBanner();
					}}
				>
					<XIcon />
				</button>
			</div>
		</aside>
	);
};
