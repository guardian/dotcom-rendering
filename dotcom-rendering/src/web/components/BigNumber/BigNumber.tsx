import Number0 from './0.svg';
import Number1 from './1.svg';
import Number10 from './10.svg';
import Number2 from './2.svg';
import Number3 from './3.svg';
import Number4 from './4.svg';
import Number5 from './5.svg';
import Number6 from './6.svg';
import Number7 from './7.svg';
import Number8 from './8.svg';
import Number9 from './9.svg';

// This file contains an array of elements, but only exposes one.

export const BigNumber = ({ index }: { index: number }) => {
	const numbers = [
		<Number0 key={0} />,
		<Number1 key={1} />,
		<Number2 key={2} />,
		<Number3 key={3} />,
		<Number4 key={4} />,
		<Number5 key={5} />,
		<Number6 key={6} />,
		<Number7 key={7} />,
		<Number8 key={8} />,
		<Number9 key={9} />,
		<Number10 key={10} />,
	];

	return numbers[index] ?? null;
};
