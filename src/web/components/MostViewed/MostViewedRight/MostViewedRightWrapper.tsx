import React, { useRef, useState, useEffect } from 'react';
import { css } from 'emotion';
import { MostViewedRight } from './MostViewedRight';

const flexGrow = css`
    flex-grow: 1;
`;

interface Props {
    pillar: Pillar;
    limitItems?: number;
}

// Wrapping MostViewedRight so we can determine whether or not there's enough vertical space in the container to render it.
export const MostViewedRightWrapper = ({ pillar, limitItems }: Props) => {
    const bodyRef = useRef<HTMLDivElement>(null);
    const [availableHeight, setAvailableHeight] = useState(0);

    useEffect(() => {
        if (bodyRef.current) {
            const { offsetHeight } = bodyRef.current;
            setAvailableHeight(offsetHeight);
        }
    }, [availableHeight]);

    // Minimum height needed to render MostViewedRight is its own outer height.
    const heightRequired = 482 + 24 + 24;
    return (
        <div ref={bodyRef} className={flexGrow}>
            {availableHeight > heightRequired ? (
                <MostViewedRight pillar={pillar} limitItems={limitItems} />
            ) : null}
        </div>
    );
};
