import { useState, useEffect } from 'react';

const useTicker = (total: number, readyToAnimate: boolean): number => {
    const [runningTotal, setRunningTotal] = useState<number>(0);

    useEffect(() => {
        if (readyToAnimate && runningTotal < total) {
            window.requestAnimationFrame(() => {
                setRunningTotal(prevRunningTotal => {
                    const newRunningTotal = prevRunningTotal + Math.floor(total / 100);

                    if (newRunningTotal > total) {
                        return total;
                    }

                    return newRunningTotal;
                });
            });
        }
    }, [readyToAnimate, runningTotal, total]);

    return runningTotal;
};

export default useTicker;
