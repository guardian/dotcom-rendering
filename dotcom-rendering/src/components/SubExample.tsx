import { useContext } from 'react';
import { CountContext, CountDispatchContext } from './ExampleContext';

export const SubExample = () => {
	const count = useContext(CountContext);
	const dispatch = useContext(CountDispatchContext);

	return (
		<div>
			<button onClick={() => dispatch({ kind: 'increase' })}>
				Increase
			</button>
			<button onClick={() => dispatch({ kind: 'decrease' })}>
				Decrease
			</button>
			<div>{count}</div>
		</div>
	);
};
