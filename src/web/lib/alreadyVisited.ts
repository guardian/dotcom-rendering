const AlreadyVisitedKey = 'gu.alreadyVisited';

export const getAlreadyVisitedCount = (): number => {
    const alreadyVisited = parseInt(localStorage.getItem(AlreadyVisitedKey) || "", 10);
    return !Number.isNaN(alreadyVisited) ? alreadyVisited : 0;
};

export const incrementAlreadyVisited = () => {
    const alreadyVisited = getAlreadyVisitedCount();
    localStorage.setItem(AlreadyVisitedKey, `${alreadyVisited + 1}`);
};
