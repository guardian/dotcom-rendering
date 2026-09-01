type FastlyTestParams = { name: string; type: string; exp: number };
type AudienceSpace = Map<string, FastlyTestParams>;

type AllSpaces = Map<string, FastlyTestParams[]>;

export type { FastlyTestParams, AudienceSpace, AllSpaces as AllSpace };
