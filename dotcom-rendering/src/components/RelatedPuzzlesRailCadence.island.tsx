import { useEffect, useState } from 'react';
import { withValidatedCadence } from '../lib/puzzleCadence';
import type { PuzzleItem } from '../types/puzzlesPage';
import { RelatedPuzzlesRail } from './RelatedPuzzlesRail';

/**
 * The "More from Puzzles & games" rail, with each card's "Today"/date label
 * confirmed in the browser against the card's own date (see
 * `withValidatedCadence`). It first renders exactly what the server sent, so
 * it hydrates without a mismatch, and only then corrects a label that is
 * wrong (e.g. a cached page served after midnight).
 */
export const RelatedPuzzlesRailCadence = ({
	items,
}: {
	items: PuzzleItem[];
}) => {
	const [validated, setValidated] = useState(items);

	useEffect(() => {
		setValidated(withValidatedCadence(items));
	}, [items]);

	return <RelatedPuzzlesRail items={validated} />;
};
