import { useEffect, useState } from 'react';

// If a user is hitting the tab key repeatedly, they're probably navigating via keyboard
// This enables showing a hint message about the dismissal shortcut to keyboard users
export function useTabDetection(tabThreshold = 5): boolean {
    const [tabPressCount, setTabPressCount] = useState<number>(0);
    const [isUserTabbing, setIsUserTabbing] = useState<boolean>(false);

    function handleTabPress(event: KeyboardEvent): void {
        if (event.key === 'Tab') {
            setTabPressCount(count => {
                if (count < tabThreshold) {
                    return count + 1;
                }
                return count;
            });
        }
    }

    useEffect(() => {
        if (tabPressCount >= tabThreshold) {
            setIsUserTabbing(true);
            window.removeEventListener('keydown', handleTabPress);
        }
    }, [tabPressCount]);

    useEffect(() => {
        window.addEventListener('keydown', handleTabPress);

        return () => window.removeEventListener('keydown', handleTabPress);
    }, []);

    return isUserTabbing;
}
