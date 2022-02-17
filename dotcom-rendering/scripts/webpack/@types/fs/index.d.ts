declare module 'fs' {
	export interface StatSyncOptions extends StatOptions {
		throwIfNoEntry?: boolean | undefined;
	}

	// from https://github.com/DefinitelyTyped/DefinitelyTyped/blob/369ecc516615fb782639bd4d707be43a01c90df4/types/node/fs.d.ts#L935-L971
	export interface StatSyncFn extends Function {
		(path: PathLike, options?: undefined): Stats;
		(
			path: PathLike,
			options?: StatSyncOptions & {
				bigint?: false | undefined;
				throwIfNoEntry: false;
			},
		): Stats | undefined;
		(
			path: PathLike,
			options: StatSyncOptions & {
				bigint: true;
				throwIfNoEntry: false;
			},
		): BigIntStats | undefined;
		(
			path: PathLike,
			options?: StatSyncOptions & {
				bigint?: false | undefined;
			},
		): Stats;
		(
			path: PathLike,
			options: StatSyncOptions & {
				bigint: true;
			},
		): BigIntStats;
		(
			path: PathLike,
			options: StatSyncOptions & {
				bigint: boolean;
				throwIfNoEntry?: false | undefined;
			},
		): Stats | BigIntStats;
		(path: PathLike, options?: StatSyncOptions):
			| Stats
			| BigIntStats
			| undefined;
	}
}
