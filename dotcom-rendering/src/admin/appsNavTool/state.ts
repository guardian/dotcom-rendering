/**
 * State management for the `AppsNavTool`. Relevant React docs:
 * https://react.dev/learn/scaling-up-with-reducer-and-context
 */

import { createContext, type Dispatch, useContext } from 'react';
import { error, ok, type Result } from '../../lib/result';
import {
	deleteSection,
	insertSection,
	type MobileOverride,
	moveSection,
	type Section,
	updateSection,
} from './appsNav';
import type { AppsNavError, PublishError } from './error';

export type State = {
	sections: Section[];
	history: HistoryEvent[];
	statusMessage?: Result<AppsNavError, string>;
	insertingAt?: number[];
	prepublish: boolean;
	editing?: {
		title: string;
		path: string;
		mobileOverride: MobileOverride | undefined;
		location: number[];
	};
};

export type HistoryEvent =
	| {
			kind: 'delete';
			location: number[];
			section: Section;
	  }
	| {
			kind: 'insert';
			section: Section;
			location: number[];
	  }
	| {
			kind: 'move';
			section: Section;
			distance: number;
			from: number[];
	  }
	| {
			kind: 'update';
			location: number[];
			from: Section;
			to: Section;
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
			kind: 'update';
			location: number[];
			title: string;
			path: string;
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
			kind: 'edit';
			location: number[];
			title: string;
			path: string;
			mobileOverride: MobileOverride | undefined;
	  }
	| {
			kind: 'cancelEdit';
	  }
	| {
			kind: 'moveDown';
			location: number[];
	  }
	| {
			kind: 'moveUp';
			location: number[];
	  }
	| {
			kind: 'prePublish';
	  }
	| {
			kind: 'cancelPrePublish';
	  }
	| {
			kind: 'publishSuccess';
	  }
	| {
			kind: 'publishError';
			error: PublishError;
	  };

export const DispatchContext = createContext<Dispatch<Action>>(() => {
	console.error('No dispatch function was provided to the DispatchContext');
});

export const useDispatch = (): Dispatch<Action> => useContext(DispatchContext);

const insertAction = (
	state: State,
	location: number[],
	section: Section,
	history: HistoryEvent[] | undefined,
): State => {
	const result = insertSection(state.sections, location, section);

	if (result.kind === 'error') {
		return errorState(
			{ kind: 'InsertError', details: result.error, location },
			state,
		);
	}

	return {
		...state,
		sections: result.value,
		insertingAt: undefined,
		statusMessage: undefined,
		history: history ?? [
			{ kind: 'insert', location, section },
			...state.history,
		],
	};
};

const deleteAction = (
	state: State,
	location: number[],
	history: HistoryEvent[] | undefined,
): State => {
	const result = deleteSection(state.sections, location);

	if (result.kind === 'error') {
		return errorState(
			{ kind: 'DeleteError', details: result.error, location },
			state,
		);
	}

	return {
		...state,
		sections: result.value.sections,
		statusMessage: undefined,
		history: history ?? [
			{
				kind: 'delete',
				location,
				section: result.value.deleted,
			},
			...state.history,
		],
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
		return errorState(
			{ kind: 'MoveError', details: result.error, location, distance },
			state,
		);
	}

	return {
		...state,
		sections: result.value.sections,
		statusMessage: undefined,
		history: history ?? [
			{
				kind: 'move',
				distance,
				from: location,
				section: result.value.moved,
			},
			...state.history,
		],
	};
};

const updateAction = (
	state: State,
	location: number[],
	title: string,
	path: string,
	history: HistoryEvent[] | undefined,
): State => {
	const result = updateSection(state.sections, location, title, path);

	if (result.kind === 'error') {
		return errorState(
			{ kind: 'UpdateError', details: result.error, location },
			state,
		);
	}

	return {
		...state,
		sections: result.value.sections,
		statusMessage: undefined,
		editing: undefined,
		history: history ?? [
			{
				kind: 'update',
				location,
				from: result.value.from,
				to: result.value.to,
			},
			...state.history,
		],
	};
};

const undo = (state: State): State => {
	const [lastEvent, ...rest] = state.history;

	switch (lastEvent?.kind) {
		case undefined:
			return errorState({ kind: 'NoHistoryError' }, state);
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
		case 'update':
			return updateAction(
				state,
				lastEvent.location,
				lastEvent.from.title,
				lastEvent.from.path,
				rest,
			);
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
				return errorState({ kind: 'NoHistoryError' }, state);
			}

			return {
				...state,
				sections: action.initial,
				history: [],
				statusMessage: undefined,
			};
		}
		case 'insertInto':
			return {
				...state,
				insertingAt: [...action.location, 0],
				statusMessage: undefined,
			};
		case 'cancelInsert':
			return {
				...state,
				insertingAt: undefined,
				statusMessage: undefined,
			};
		case 'moveDown':
			return moveAction(state, action.location, 1, undefined);
		case 'moveUp':
			return moveAction(state, action.location, -1, undefined);
		case 'prePublish':
			return { ...state, prepublish: true };
		case 'cancelPrePublish':
			return { ...state, prepublish: false };
		case 'publishSuccess':
			return {
				...state,
				statusMessage: ok('Publication successful.'),
				prepublish: false,
				history: [],
			};
		case 'publishError':
			return {
				...errorState(
					{ kind: 'PublishError', details: action.error },
					state,
				),
				prepublish: false,
			};
		case 'edit':
			return {
				...state,
				editing: {
					title: action.title,
					path: action.path,
					mobileOverride: action.mobileOverride,
					location: action.location,
				},
			};
		case 'cancelEdit':
			return { ...state, editing: undefined };
		case 'update':
			return updateAction(
				state,
				action.location,
				action.title,
				action.path,
				undefined,
			);
	}
};

const errorState = (message: AppsNavError, state: State): State => ({
	...state,
	statusMessage: error(message),
});
