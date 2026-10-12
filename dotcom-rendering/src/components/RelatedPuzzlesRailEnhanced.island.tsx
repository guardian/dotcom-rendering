import { useEffect, useMemo, useState } from 'react';
import { withValidatedCadence } from '../lib/puzzleCadence';
import { withProgress } from '../lib/puzzleCardProgress';
import { usePuzzleProgress } from '../lib/usePuzzleProgress';
import type { PuzzleItem } from '../types/puzzlesPage';
import { RelatedPuzzlesRail } from './RelatedPuzzlesRail';

/**
 * The "More from Puzzles & games" rail, enhanced in the browser:
 * - each card's "Today"/date label is confirmed against the card's own date
 *   (see `withValidatedCadence`), so a cached page served after midnight is
 *   corrected;
 * - cards show "In progress" / "Played" from the reader's progress, when the
 *   Puzzles API reports any.
 *
 * It first renders exactly what the server sent, so it hydrates without a
 * mismatch, and only then applies the above.
 */
export const RelatedPuzzlesRailEnhanced = ({
	items,
}: {
	items: PuzzleItem[];
}) => {
	const [validated, setValidated] = useState(items);
	const progress = usePuzzleProgress();

	useEffect(() => {
		setValidated(withValidatedCadence(items));
	}, [items]);

	const withState = useMemo(
		() => (progress ? withProgress(validated, progress) : validated),
		[validated, progress],
	);

	return <RelatedPuzzlesRail items={withState} />;
};
