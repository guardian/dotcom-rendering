import { useEffect } from 'react';
import { incrementAlreadyVisited } from '../lib/alreadyVisited';

export const AlreadyVisited = () => {
	useEffect(() => {
		incrementAlreadyVisited();
	}, []);
	// Nothing is rendered by this component
	return null;
};
