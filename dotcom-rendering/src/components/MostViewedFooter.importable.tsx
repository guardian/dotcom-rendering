import { css } from '@emotion/react';
import type { TrailTabType } from '../types/trails';
import { MostViewedFooterGrid } from './MostViewedFooterGrid';

type Props = {
	tabs: TrailTabType[];
	selectedColour?: string;
	abTestCypressDataAttr?: string;
	variantFromRunnable?: string;
	sectionId?: string;
	hasPageSkin?: boolean;
};

/**
 * List of 10 most viewed articles to show at the bottom of pages.
 *
 * ## Why does this need to be an Island?
 *
 * Most viewed data if fetched client-side.
 *
 * ---
 *
 * (No visual story exists)
 */
export const MostViewedFooter = ({
	tabs,
	abTestCypressDataAttr,
	variantFromRunnable,
	sectionId,
	selectedColour,
	hasPageSkin = false,
}: Props) => {
	return (
		<div
			css={css`
				width: 100%;
			`}
			data-testid="mostviewed-footer"
			data-testid-ab-user-in-variant={abTestCypressDataAttr}
			data-testid-ab-runnable-test={variantFromRunnable}
			data-link-name="most popular"
		>
			<MostViewedFooterGrid
				data={tabs}
				sectionId={sectionId}
				selectedColour={selectedColour}
				hasPageSkin={hasPageSkin}
			/>
		</div>
	);
};
