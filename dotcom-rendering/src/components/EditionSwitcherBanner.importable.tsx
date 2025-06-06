import { css } from '@emotion/react';
import { from, palette, space, textSans14 } from '@guardian/source/foundations';
import { Link, SvgInfoRound } from '@guardian/source/react-components';
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
} from '../lib/useEditionSwitcherBanner';
import XIcon from '../static/icons/x.svg';

const container = css`
	position: relative;
	top: 0;
	background-color: ${palette.brand[800]};
	z-index: ${getZIndex('editionSwitcherBanner')};
`;

const content = css`
	display: flex;
	justify-content: space-between;
	padding: 10px;
	align-items: center;
	${center};

	${from.mobileLandscape} {
		padding: 10px ${space[5]}px;
	}
`;

const textAndLink = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: ${space[3]}px;
	${textSans14};

	/* Override Source Link font styles */
	a {
		${textSans14};
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
		<aside data-component="edition-switcher-banner" css={container}>
			<div css={content}>
				<div css={textAndLink}>
					<SvgInfoRound
						size="medium"
						theme={{ fill: palette.brand[400] }}
					/>
					<p>
						You are viewing the {defaultEditionName} homepage&nbsp;
						<Link
							href={`/${suggestedPageId}`}
							priority="secondary"
							data-link-name="edition-switcher-banner switch-edition"
						>
							View the {suggestedEdition} homepage
						</Link>
					</p>
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
