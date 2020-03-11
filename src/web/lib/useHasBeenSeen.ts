import { useEffect, useState, useRef } from 'react';

const useHasBeenSeen = (options: IntersectionObserverInit) => {
    const [hasBeenSeen, setHasBeenSeen] = useState<boolean>(false);
    const [node, setNode] = useState<HTMLElement | null>(null);

    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new window.IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setHasBeenSeen(true);
            }
        }, options);

        const { current: currentObserver } = observer;

        if (node) {
            currentObserver.observe(node);
        }

        return () => currentObserver.disconnect();
    }, [node, options]);

    return [hasBeenSeen, setNode];
};

export { useHasBeenSeen };
