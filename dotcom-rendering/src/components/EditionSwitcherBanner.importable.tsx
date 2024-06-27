import { css } from '@emotion/react';
import { from, palette, space } from '@guardian/source/foundations';
// import { LinkButton } from '@guardian/source/react-components';
import useSWR from 'swr';
import { center } from '../lib/center';
import type { EditionId as Edition } from '../lib/edition';
import { getZIndex } from '../lib/getZIndex';
import {
	hideEditionSwitcherBanner,
	useEditionSwitcherBanner,
} from '../lib/useUserPreferredEdition';
import XIcon from '../static/icons/x.svg';

const container = css`
	position: sticky;
	top: 0;
	${getZIndex('banner')};
	background-color: ${palette.brand[800]};
`;

const content = css`
	display: flex;
	justify-content: space-between;
	padding: ${space[2]}px 10px;

	${from.phablet} {
		align-items: center;
		padding: ${space[2]}px 20px;
	}

	${center}
`;

const text = css`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: ${space[2]}px;
	font-family:
		'GuardianTextSans',
		'Guardian Text Sans Web',
		Helvetica Neue,
		Helvetica,
		Arial,
		Lucida Grande,
		sans-serif;
	font-size: 0.875rem;

	${from.phablet} {
		flex-direction: row;
		align-items: center;
		gap: ${space[5]}px;
	}
`;

const button = css`
	cursor: pointer;
	text-decoration: none;
	font-weight: 600;
	border-radius: 18px;
	background-color: ${palette.brand[400]};
	color: ${palette.neutral[100]};
	padding: 4px 10px 6px 12px;

	${from.phablet} {
		padding: 10px 18px 10px 16px;
	}
`;

const icon = css`
	cursor: pointer;
	background-color: unset;
	border: none;
`;

const EditionToUrlMap = {
	UK: 'uk',
	US: 'us',
	AU: 'au',
	INT: 'international',
	EUR: 'europe',
};

const key = 'edition-switcher-banner';
const apiPromise = new Promise<{ hidden: boolean }>(() => {
	/* this never resolves */
});

type Props = {
	pageEdition: Edition;
};

export const EditionSwitcherBanner = ({ pageEdition }: Props) => {
	const [shouldShowBanner, userEdition] =
		useEditionSwitcherBanner(pageEdition);
	const { data } = useSWR(key, () => apiPromise);

	if (data?.hidden ?? (userEdition === null || !shouldShowBanner)) {
		return null;
	}

	const suggestedUrl = `https://www.theguardian.com/${EditionToUrlMap[userEdition]}`;

	return (
		<aside data-component="edition-switcher-banner" css={container}>
			<div css={content}>
				<div css={text}>
					<p>You are viewing the {pageEdition} homepage</p>
					<a
						data-link-name="edition-switcher-banner switch-edition"
						css={button}
						href={suggestedUrl}
					>
						View the {userEdition} homepage
					</a>
				</div>
				<button
					type="button"
					css={icon}
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
