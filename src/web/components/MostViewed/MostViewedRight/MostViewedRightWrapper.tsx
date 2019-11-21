import React, { useRef, useState, useEffect } from 'react';
import { css } from 'emotion';
import { MostViewedRight } from './MostViewedRight';

const flexGrow = css`
    flex-grow: 1;
`;

interface Props {
    limitItems?: number;
}

// Wrapping MostViewedRight so we can determine whether or not there's enough vertical space in the container to render it.
export const MostViewedRightWrapper = (props: Props) => {
    const bodyRef = useRef<any>(null);
    const [myHeight, setMyHeight] = useState(0);

    useEffect(() => {
        const { clientHeight } = bodyRef.current;
        setMyHeight(clientHeight);
    }, [myHeight]);

    // Minimum height needed to render MostViewedRight is its own outer height.
    const minWrapperHeight = 550;
    return (
        <div ref={bodyRef} className={flexGrow}>
            {myHeight > minWrapperHeight ? (
                <MostViewedRight {...props} />
            ) : null}
        </div>
    );
};
