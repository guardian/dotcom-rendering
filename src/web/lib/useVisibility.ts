import { useEffect, useState } from 'react';

export const useVisibility = (options: IntersectionObserverInit) => {
    const [hasBeenSeen, setHasBeenSeen] = useState<boolean>(false);
    const [ref, setRef] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setHasBeenSeen(true);
        }, options);

        if (ref) observer.observe(ref);

        return () => {
            if (ref) {
                observer.disconnect();
            }
        };
    }, [ref, options]);

    return [hasBeenSeen, setRef];
};
