import { ReactComponent as Number0 } from './0.svg';
import { ReactComponent as Number1 } from './1.svg';
import { ReactComponent as Number10 } from './10.svg';
import { ReactComponent as Number2 } from './2.svg';
import { ReactComponent as Number3 } from './3.svg';
import { ReactComponent as Number4 } from './4.svg';
import { ReactComponent as Number5 } from './5.svg';
import { ReactComponent as Number6 } from './6.svg';
import { ReactComponent as Number7 } from './7.svg';
import { ReactComponent as Number8 } from './8.svg';
import { ReactComponent as Number9 } from './9.svg';

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
