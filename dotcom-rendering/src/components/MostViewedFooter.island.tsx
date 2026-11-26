import { css } from '@emotion/react';
import type { TrailTabType } from '../types/trails';
import { MostViewedFooterGrid } from './MostViewedFooterGrid';

type Props = {
	tabs: TrailTabType[];
	selectedColour?: string;
	sectionId?: string;
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
	sectionId,
	selectedColour,
}: Props) => {
	return (
		<div
			css={css`
				width: 100%;
			`}
			data-testid="mostviewed-footer"
			data-link-name="most popular"
		>
			<MostViewedFooterGrid
				data={tabs}
				sectionId={sectionId}
				selectedColour={selectedColour}
			/>
		</div>
	);
};
