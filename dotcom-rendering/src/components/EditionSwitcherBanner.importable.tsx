import { css } from '@emotion/react';
import { from, palette, space, textSans14 } from '@guardian/source/foundations';
import { LinkButton } from '@guardian/source/react-components';
import useSWR from 'swr';
import { center } from '../lib/center';
import {
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
import type { NetworkFrontPageId } from '../types/front';

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

const key = 'edition-switcher-banner';
const apiPromise = new Promise<{ hidden: boolean }>(() => {
	/* this never resolves */
});

type Props = {
	pageId: NetworkFrontPageId;
	edition: EditionId;
};

/**
 * Displays a banner between the header and main content on network fronts.
 * Provides a link to switch to the homepage of the user's preferred edition.
 *
 * See PR for details: https://github.com/guardian/dotcom-rendering/pull/11763
 */
export const EditionSwitcherBanner = ({ pageId, edition }: Props) => {
	const [showBanner] = useEditionSwitcherBanner(pageId, edition);

	const { data } = useSWR(key, () => apiPromise);
	const isBannerClosed = !!data?.hidden;
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
					<p>You are viewing the {defaultEditionName} homepage</p>
					<LinkButton
						href={`https://www.theguardian.com/${suggestedPageId}`}
						priority="primary"
						size="xsmall"
						// larger screen sizes should have size="small", which is why we need a css override
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
