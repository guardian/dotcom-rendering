import { createContext } from 'react';
import { Dispatch } from 'react';

export type State = number;
export type Action = { kind: 'increase' } | { kind: 'decrease' };

export const CountContext = createContext<State | undefined>(undefined);
export const CountDispatchContext = createContext<Dispatch<Action> | undefined>(
	undefined,
);
