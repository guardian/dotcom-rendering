import { useEffect, useState, useRef } from 'react';
import debounce from 'lodash.debounce';

const useHasBeenSeen = (options: IntersectionObserverInit) => {
    const [hasBeenSeen, setHasBeenSeen] = useState<boolean>(false);
    const [node, setNode] = useState<HTMLElement | null>(null);

    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (observer.current) {
            observer.current.disconnect();
        }

        // Debounce to ensure the node is seen for at least 200ms before the
        // boolean is set to true
        observer.current = new window.IntersectionObserver(
            debounce(([entry]) => {
                if (entry.isIntersecting) {
                    setHasBeenSeen(true);
                }
            }, 200),
            options,
        );

        const { current: currentObserver } = observer;

        if (node) {
            currentObserver.observe(node);
        }

        return () => currentObserver.disconnect();
    }, [node, options]);

    return [hasBeenSeen, setNode];
};

export { useHasBeenSeen };
