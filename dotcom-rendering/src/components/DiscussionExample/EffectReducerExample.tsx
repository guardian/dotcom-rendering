import { useEffectReducer } from '../../useEffectReducer';

type State = {
	counter: number;
	random: number;
};

type Action =
	| {
			kind: 'increment';
	  }
	| {
			kind: 'decrement';
	  }
	| {
			kind: 'getRandomNumber';
	  }
	| {
			kind: 'randomNumber';
			num: number;
	  }
	| {
			kind: 'sleptResult';
			num: number;
	  };

type Effect =
	| {
			kind: 'RandomNumber';
	  }
	| {
			kind: 'SleepNumber';
			value: number;
	  };

/**
 * Generates a random number, and returns an action with that number.
 */
const getRandomNumber = (): Action => ({
	kind: 'randomNumber',
	num: Math.random(),
});

/**
 * Takes a number, waits 2 seconds, then returns an action with that number.
 */
const sleepNumber = (num: number): Promise<Action> =>
	new Promise((res) =>
		setTimeout(() => res({ kind: 'sleptResult', num }), 2000),
	);

const effectReducer = (effect: Effect): Action | Promise<Action> => {
	switch (effect.kind) {
		case 'RandomNumber':
			return getRandomNumber();
		case 'SleepNumber':
			return sleepNumber(effect.value);
	}
};

const reducer = (
	state: State,
	action: Action,
): { state: State; effect?: Effect } => {
	switch (action.kind) {
		case 'increment':
			return { state: { ...state, counter: state.counter + 1 } };
		case 'decrement':
			return { state: { ...state, counter: state.counter - 1 } };
		case 'getRandomNumber':
			return { state, effect: { kind: 'RandomNumber' } };
		case 'randomNumber':
			return { state: { ...state, random: action.num } };
		case 'sleptResult':
			return { state: { ...state, counter: action.num } };
	}
};

/**
 * A counter application with three features:
 *
 * 1. '+' and '-' buttons to increment and decrement the counter.
 * 2. A timer that waits 2 seconds and then sets the counter value.
 * 3. A button to get and display random numbers.
 *
 * See the corresponding story for a demonstration.
 */
const EffectReducerExample = () => {
	const [state, dispatch] = useEffectReducer(
		reducer,
		effectReducer,
		{ counter: 0, random: 0 },
		{ kind: 'SleepNumber', value: 3 },
	);

	return (
		<>
			<button onClick={() => dispatch({ kind: 'decrement' })}>-</button>
			Counter: {state.counter}
			<button onClick={() => dispatch({ kind: 'increment' })}>+</button>
			Random: {state.random}
			<button onClick={() => dispatch({ kind: 'getRandomNumber' })}>
				Get Random
			</button>
		</>
	);
};

export { EffectReducerExample };
