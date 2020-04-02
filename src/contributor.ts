// ------ Types ----- //

type Contributor = {
    id: string;
    apiUrl: string;
    webTitle: string;
    bylineLargeImageUrl?: string;
}


// ----- Functions ----- //

const isSingleContributor = (cs: Contributor[]): boolean =>
    cs.length === 1


// ----- Exports ----- //

export {
    Contributor,
    isSingleContributor,
}
