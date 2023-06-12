/** Remap a value from one range to another */
export const remap = (mvtId: string, modulo: number, max: number): number =>
	Math.ceil(((Number(mvtId) % modulo) / modulo) * max);
