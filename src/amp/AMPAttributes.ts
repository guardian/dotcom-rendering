// eslint-disable-next-line @typescript-eslint/no-unused-vars
import _ from 'react';

// Provides type definition for AMP attributes on React/JSX elements.

// Note, we cannot declare this in the global type definitions because it is not
// possible to merge modules this way (only override them).
declare module 'react' {
	interface HTMLAttributes<T> extends DOMAttributes<T> {
		on?: string;
		overflow?: string;
		fallback?: '';
		update?: '';
		items?: '';
	}
}
