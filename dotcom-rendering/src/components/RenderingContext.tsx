import { createContext } from 'react';
import type { RenderingContextType } from '../types/renderingContext';

/** Represents the initial or default value for the app context */
const defaultContext: RenderingContextType = {
	target: 'Web',
};

/**
 * Context for global, static values (generic)
 *
 * This should not contain anything which will change between re-renders
 */
export const RenderingContext =
	createContext<RenderingContextType>(defaultContext);
