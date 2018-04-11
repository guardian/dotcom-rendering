// @flow

import Number1 from 'pasteup/big-numbers/1.svg';
import Number2 from 'pasteup/big-numbers/2.svg';
import Number3 from 'pasteup/big-numbers/3.svg';
import Number4 from 'pasteup/big-numbers/4.svg';
import Number5 from 'pasteup/big-numbers/5.svg';
import Number6 from 'pasteup/big-numbers/6.svg';
import Number7 from 'pasteup/big-numbers/7.svg';
import Number8 from 'pasteup/big-numbers/8.svg';
import Number9 from 'pasteup/big-numbers/9.svg';
import Number10 from 'pasteup/big-numbers/10.svg';

export default ({ index }) => {
    const numbers = {
        1: <Number1 />,
        2: <Number2 />,
        3: <Number3 />,
        4: <Number4 />,
        5: <Number5 />,
        6: <Number6 />,
        7: <Number7 />,
        8: <Number8 />,
        9: <Number9 />,
        10: <Number10 />,
    };

    return numbers[index];
};
