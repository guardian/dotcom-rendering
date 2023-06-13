import { useEffect } from 'react';
import { incrementAlreadyVisited } from '../lib/alreadyVisited';

/**
 * # AlreadyVisited
 *
 * Increment the already visited count.
 *
 * @returns {} _No visual or DOM output_
 */
export const AlreadyVisited = () => {
	useEffect(() => {
		incrementAlreadyVisited();
	}, []);
	// Nothing is rendered by this component
	return null;
};
