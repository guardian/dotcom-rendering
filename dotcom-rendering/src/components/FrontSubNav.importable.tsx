import { css } from '@emotion/react';
import { StraightLines } from '@guardian/source-development-kitchen/react-components';
import useSWR from 'swr';
import type { EditionId } from '../lib/edition';
import { useEditionSwitcherBanner } from '../lib/useUserPreferredEdition';
import type { SubNavType } from '../model/extract-nav';
import { Section } from './Section';
import { SubNav } from './SubNav.importable';

const key = 'edition-switcher-banner';
const apiPromise = new Promise<{ hidden: boolean }>(() => {
	/* this never resolves */
});

type Props = {
	subNavSections: SubNavType;
	currentNavLink: string;
	hasPageSkin: boolean;
	pageId: string;
	userEdition: EditionId;
	currentPillarTitle?: string;
};

export const FrontSubNav = ({
	subNavSections,
	currentNavLink,
	hasPageSkin,
	pageId,
	userEdition,
	currentPillarTitle,
}: Props) => {
	const [showBanner] = useEditionSwitcherBanner(pageId, userEdition);
	const { data } = useSWR(key, () => apiPromise);
	const isBannerClosed = !!data?.hidden;

	if (showBanner && !isBannerClosed) {
		return null;
	}

	return (
		<>
			<Section
				fullWidth={true}
				padSides={false}
				element="aside"
				hasPageSkin={hasPageSkin}
			>
				<SubNav
					subNavSections={subNavSections}
					currentNavLink={currentNavLink}
					position="header"
					currentPillarTitle={currentPillarTitle}
				/>
			</Section>
			<Section
				fullWidth={true}
				padSides={false}
				showTopBorder={false}
				hasPageSkin={hasPageSkin}
			>
				<StraightLines
					cssOverrides={css`
						display: block;
					`}
					count={4}
				/>
			</Section>
		</>
	);
};
