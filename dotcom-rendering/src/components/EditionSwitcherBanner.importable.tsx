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
`;

const container = css`
	position: sticky;
	top: 0;
	background-color: ${palette.brand[800]};
	${getZIndex('editionSwitcherBanner')};
	transition: all 3s;
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
	setLastDownYCoord: Dispatch<SetStateAction<number | null>>,
) => {
	event.preventDefault();

	setLastDownYCoord(event.clientY);
};

const onPointerUp = (
	event: React.PointerEvent,
	lastDownYCoord: number | null,
	setIsSwipeUp: Dispatch<SetStateAction<boolean>>,
) => {
	event.preventDefault();

	if (lastDownYCoord !== null && event.clientY + THRESHOLD < lastDownYCoord) {
		setIsSwipeUp(true);
	}
};

type Props = {
	pageId: Edition['pageId'];
	edition: EditionId;
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
	const [isSwipeUp, setIsSwipeUp] = useState(false);

	const suggestedPageId = getEditionFromId(edition).pageId;
	const suggestedEdition = getEditionFromId(edition).title.replace(
		' edition',
		'',
	);
	const defaultEdition = getEditionFromPageId(pageId);
	const defaultEditionName = defaultEdition?.title.replace(' edition', '');

	if (isBannerClosed || !showBanner || !defaultEditionName) {
		return null;
	}

	return (
		<aside
			id="edition-switcher-banner"
			data-component="edition-switcher-banner"
			css={[container, isSwipeUp && hideBannerStyles]}
			onPointerDown={(e) => onPointerDown(e, setLastDownYCoord)}
			onPointerUp={(e) => onPointerUp(e, lastDownYCoord, setIsSwipeUp)}
			onTouchStart={(e) => {
				e.preventDefault();
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
						View the {suggestedEdition} homepage
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
