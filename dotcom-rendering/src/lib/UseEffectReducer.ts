import type { Dispatch } from 'react';
import { useEffect, useReducer, useRef } from 'react';

type StateAndEffect<State, Effect> = {
	state: State;
	effect?: Effect;
};

/**
 * @param reducer Very similar to the reducer normally passed to
 * {@linkcode React.useReducer}, but also returns a description of effects
 * alongside the state.
 *
 * @param effectReducer A handler for effects. It takes a description of an
 * effect and decides how to run that effect, returning an `Action` that will
 * be fed back into the next loop of the `reducer`.
 *
 * Depending on how an application is written, different `effectReducer`s can
 * be passed in different environments. So in production this might run actual
 * effects, whereas in tests it might run mocked versions.
 *
 * *Note:* The value used will be the one passed on the initial render; the
 * argument is ignored after this point.
 *
 * @param initialState The state at the start of the application; the same
 * as the `initialState` argument usually passed to
 * {@linkcode React.useReducer}.
 *
 * @param initialEffect Optionally, an effect to run at the start of the
 * application.
 *
 * @returns State and a `dispatch` function, the same as
 * {@linkcode React.useReducer}.
 */
const useEffectReducer = <State, Effect, Action>(
	reducer: (
		state: State,
		action: Action,
	) => { state: State; effect?: Effect },
	effectReducer: (effect: Effect) => Action | Promise<Action>,
	initialState: State,
	initialEffect: Effect | undefined,
): [State, Dispatch<Action>] => {
	/**
	 * Guards against effect reducers being changed over time. If this were to
	 * be allowed, the `effectReducer` would have to be a dependency of the
	 * `useEffect` below. Were this the case, every time it changed the
	 * `useEffect` callback would run, potentially duplicating effects.
	 */
	const cachedEffectReducer = useRef(effectReducer);

	const reducerWrapper = (
		stateAndEffect: StateAndEffect<State, Effect>,
		action: Action,
	): StateAndEffect<State, Effect> => reducer(stateAndEffect.state, action);

	const [{ state, effect }, dispatch] = useReducer(reducerWrapper, {
		state: initialState,
		effect: initialEffect,
	});

	useEffect(() => {
		if (effect !== undefined) {
			const result = cachedEffectReducer.current(effect);

			if (result instanceof Promise) {
				result.then(dispatch).catch(() => {
					console.error('Failed to run effect!');
				});
			} else {
				dispatch(result);
			}
		}
	}, [effect]);

	return [state, dispatch];
};

export { useEffectReducer };
