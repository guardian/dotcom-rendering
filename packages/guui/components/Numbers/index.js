// @flow

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

export default ({ index }: { index: number }) => {
    const numbers = {
        '1': <Number1 />,
        '2': <Number2 />,
        '3': <Number3 />,
        '4': <Number4 />,
        '5': <Number5 />,
        '6': <Number6 />,
        '7': <Number7 />,
        '8': <Number8 />,
        '9': <Number9 />,
        '10': <Number10 />,
    };

    return numbers[index];
};
