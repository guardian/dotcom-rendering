/**
 * State management for the `AppsNavTool`. Relevant React docs:
 * https://react.dev/learn/scaling-up-with-reducer-and-context
 */

import { createContext, useContext, type Dispatch } from 'react';
import {
	deleteSection,
	insertSection,
	moveSection,
	type Section,
} from './appsNav';

type State = {
	sections: Section[];
	history: HistoryEvent[];
	error?: string;
	insertingAt?: number[];
};

export type HistoryEvent =
	| {
			kind: 'delete';
			location: number[];
			section: Section;
	  }
	| {
			kind: 'insert';
			location: number[];
	  }
	| {
			kind: 'move';
			distance: number;
			from: number[];
	  };

type Action =
	| {
			kind: 'delete';
			location: number[];
	  }
	| {
			kind: 'insert';
			location: number[];
			section: Section;
	  }
	| {
			kind: 'undo';
	  }
	| {
			kind: 'reset';
			initial: Section[];
	  }
	| {
			kind: 'insertInto';
			location: number[];
	  }
	| {
			kind: 'cancelInsert';
	  }
	| {
			kind: 'moveDown';
			location: number[];
	  }
	| {
			kind: 'moveUp';
			location: number[];
	  };

export const DispatchContext = createContext<Dispatch<Action>>((_a: Action) => {
	console.error('No dispatch function was provided to the DispatchContext');
});

export const useDispatch = () => useContext(DispatchContext);

const insertAction = (
	state: State,
	location: number[],
	section: Section,
	history: HistoryEvent[] | undefined,
): State => {
	const result = insertSection(state.sections, location, section);

	if (result.kind === 'error') {
		return {
			...state,
			error: `Failed to insert at location ${location}, ${result.error}`,
		};
	}

	return {
		...state,
		sections: result.value,
		insertingAt: undefined,
		history:
			history === undefined
				? [{ kind: 'insert', location }, ...state.history]
				: history,
	};
};

const deleteAction = (
	state: State,
	location: number[],
	history: HistoryEvent[] | undefined,
): State => {
	const result = deleteSection(state.sections, location);

	if (result.kind === 'error') {
		return {
			...state,
			error: `Failed to delete at location ${location}, ${result.error}`,
		};
	}

	return {
		...state,
		sections: result.value.sections,
		history:
			history === undefined
				? [
						{
							kind: 'delete',
							location,
							section: result.value.deleted,
						},
						...state.history,
				  ]
				: history,
	};
};

const moveAction = (
	state: State,
	location: number[],
	distance: number,
	history: HistoryEvent[] | undefined,
): State => {
	const result = moveSection(state.sections, location, distance);

	if (result.kind === 'error') {
		return {
			...state,
			error: `Failed to move ${distance} at location ${location}, ${result.error}`,
		};
	}

	return {
		...state,
		sections: result.value,
		history:
			history === undefined
				? [
						{
							kind: 'move',
							distance,
							from: location,
						},
						...state.history,
				  ]
				: history,
	};
};

const undo = (state: State): State => {
	const [lastEvent, ...rest] = state.history;

	switch (lastEvent?.kind) {
		case undefined:
			return { ...state, error: 'Cannot undo, no more history' };
		case 'delete':
			return insertAction(
				state,
				lastEvent.location,
				lastEvent.section,
				rest,
			);
		case 'insert':
			return deleteAction(state, lastEvent.location, rest);
		case 'move':
			return moveAction(state, lastEvent.from, lastEvent.distance, rest);
	}
};

export const reducer = (state: State, action: Action): State => {
	switch (action.kind) {
		case 'delete':
			return deleteAction(state, action.location, undefined);
		case 'insert':
			return insertAction(
				state,
				action.location,
				action.section,
				undefined,
			);
		case 'undo':
			return undo(state);
		case 'reset': {
			if (state.history.length === 0) {
				return { ...state, error: 'Cannot reset, nothing has changed' };
			}

			return { ...state, sections: action.initial, history: [] };
		}
		case 'insertInto':
			return { ...state, insertingAt: [...action.location, 0] };
		case 'cancelInsert':
			return { ...state, insertingAt: undefined };
		case 'moveDown':
			return moveAction(state, action.location, 1, undefined);
		case 'moveUp':
			return moveAction(state, action.location, -1, undefined);
	}
};
