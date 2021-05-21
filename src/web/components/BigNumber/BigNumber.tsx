import Number0 from './0.svg';
import Number1 from './1.svg';
import Number2 from './2.svg';
import Number3 from './3.svg';
import Number4 from './4.svg';
import Number5 from './5.svg';
import Number6 from './6.svg';
import Number7 from './7.svg';
import Number8 from './8.svg';
import Number9 from './9.svg';
import Number10 from './10.svg';

// This file contains an array of elements, but only exposes one.

export const BigNumber = ({ index }: { index: number }) => {
	const numbers = [
		<Number0 />,
		<Number1 />,
		<Number2 />,
		<Number3 />,
		<Number4 />,
		<Number5 />,
		<Number6 />,
		<Number7 />,
		<Number8 />,
		<Number9 />,
		<Number10 />,
	];

	return numbers[index];
};
