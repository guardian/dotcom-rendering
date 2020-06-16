const buildMatchUrl = (data: CAPIType): string | null => {
    const pad = (n: number): string => {
        if (n.toString().length === 1) return `0${n}`;
        return `${n}`;
    };

    const teams =
        data.config.references &&
        data.config.references.filter(
            reference => reference['pa-football-team'],
        );
    const { webPublicationDate, pageId } = data;
    const jsDate = new Date(webPublicationDate);

    const year = jsDate.getFullYear();
    const month = pad(jsDate.getMonth() + 1);
    const date = pad(jsDate.getDate());

    const firstTeam = teams && teams[0]['pa-football-team'];
    const secondTeam = teams && teams[1]['pa-football-team'];

    const page = encodeURIComponent(pageId);

    if (year && month && date && firstTeam && secondTeam && page) {
        return `https://api.nextgen.guardianapps.co.uk/football/api/match-nav/${year}/${month}/${date}/${firstTeam}/${secondTeam}.json?page=${page}&dcr`;
    }

    return null;
};

export const addMatchUrl = (data: CAPIType): CAPIType => {
    // Exit immediately if not a match report
    if (data.designType !== 'MatchReport') return data;

    return {
        ...data,
        matchUrl: buildMatchUrl(data),
    } as CAPIType;
};
