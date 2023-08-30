import { createContext } from 'react';
import type { RenderingTarget } from '../types/renderingTarget';

export const RenderingTargetContext = createContext<RenderingTarget>('Web');
