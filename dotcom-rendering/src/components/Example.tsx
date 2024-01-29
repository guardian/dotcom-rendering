import { useReducer } from 'react';
import { SubExample } from './SubExample';
import {
	CountContext,
	CountDispatchContext,
	type State,
	type Action,
} from './ExampleContext';

const counterReducer = (state: State, action: Action) => {
	switch (action.kind) {
		case 'increase':
			return state + 1;
		case 'decrease':
			return state - 1;
	}
};

export const Example = () => {
	const [count, dispatch] = useReducer(counterReducer, 0);

	return (
		<CountContext.Provider value={count}>
			<CountDispatchContext.Provider value={dispatch}>
				<SubExample />
			</CountDispatchContext.Provider>
		</CountContext.Provider>
	);
};
