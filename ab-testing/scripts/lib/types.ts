type FastlyTestParams = { name: string; type: string; exp: number };
type AudienceSpace = Map<string, FastlyTestParams>;

type AllSpace = Map<string, FastlyTestParams[]>;

export type { FastlyTestParams, AudienceSpace, AllSpace };
