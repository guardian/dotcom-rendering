import { useEffect, useState, useRef } from 'react';
import libDebounce from 'lodash.debounce';

export type HasBeenSeen = [boolean, (el: HTMLDivElement) => void];

const useHasBeenSeen = (options: IntersectionObserverInit, debounce?: boolean): HasBeenSeen => {
    const [hasBeenSeen, setHasBeenSeen] = useState<boolean>(false);
    const [node, setNode] = useState<HTMLElement | null>(null);

    const observer = useRef<IntersectionObserver | null>(null);

    // Enabling debouncing ensures the target element intersects for at least
    // 200ms before the callback is executed
    const intersectionFn: IntersectionObserverCallback = ([entry]) => {
        if (entry?.isIntersecting) {
            setHasBeenSeen(true);
        }
    };
    const intersectionCallback = debounce ? libDebounce(intersectionFn, 200) : intersectionFn;

    useEffect(() => {
        if (observer.current) {
            observer.current.disconnect();
        }

        if (window.IntersectionObserver) {
            observer.current = new window.IntersectionObserver(intersectionCallback, options);

            const { current: currentObserver } = observer;

            if (node) {
                currentObserver.observe(node);
            }

            return (): void => currentObserver.disconnect();
        } else {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            return (): void => {};
        }
    }, [node, options, intersectionCallback]);

    return [hasBeenSeen, setNode];
};

export { useHasBeenSeen };
