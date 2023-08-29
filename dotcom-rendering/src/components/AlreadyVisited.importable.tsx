import { useEffect } from 'react';
import { incrementAlreadyVisited } from '../lib/alreadyVisited';

/**
 * Increment the already visited count.
 *
 * ## Why does this need to be an Island?
 *
 * This modifies local storage values.
 *
 * ---
 *
 * Does not render **anything**.
 */
export const AlreadyVisited = () => {
	useEffect(() => {
		incrementAlreadyVisited();
	}, []);
	// Nothing is rendered by this component
	return null;
};
