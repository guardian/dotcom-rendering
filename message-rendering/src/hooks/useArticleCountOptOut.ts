import { useState } from 'react';
import {
    addArticleCountOptOutCookie,
    hasArticleCountOptOutCookie,
    removeArticleCountFromLocalStorage,
    removeArticleCountOptOutCookie,
} from '../modules/shared/helpers/articleCountOptOut';

interface ArticleCountOptOut {
    hasOptedOut: boolean;
    onArticleCountOptOut: () => void;
    onArticleCountOptIn: () => void;
}

export function useArticleCountOptOut(): ArticleCountOptOut {
    const [hasOptedOut, setHasOptedOut] = useState(hasArticleCountOptOutCookie());

    function onArticleCountOptOut() {
        setHasOptedOut(true);
        addArticleCountOptOutCookie();
        removeArticleCountFromLocalStorage();
    }

    function onArticleCountOptIn() {
        setHasOptedOut(false);
        removeArticleCountOptOutCookie();
    }

    return { hasOptedOut, onArticleCountOptOut, onArticleCountOptIn };
}
