export type { Option } from './option';
export {
	OptionKind,
	some,
	none,
	fromNullable,
	withDefault,
	map,
	map2,
	andThen,
} from './option';
export type { Result } from './result';
export {
	ResultKind,
	ok,
	err,
	fromUnsafe,
	partition,
	either,
	mapError,
	toOption,
	map as resultMap,
	andThen as resultAndThen,
} from './result';
