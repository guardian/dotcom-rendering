// ----- Imports ----- //

import { isValidDate } from 'date';

// ----- Types ----- //

enum Param {
	None,
	Valid,
	Invalid,
}

type QueryParam<A> =
	| {
			kind: Param.None;
	  }
	| {
			kind: Param.Invalid;
	  }
	| {
			kind: Param.Valid;
			value: A;
	  };

// ----- Functions ----- //

function parseDate<A>(param: A): QueryParam<Date> {
	if (typeof param !== 'string') {
		return { kind: Param.None };
	}
	const date = new Date(param);
	return isValidDate(date)
		? { kind: Param.Valid, value: date }
		: { kind: Param.Invalid };
}

// ----- Exports ----- //

export { Param, parseDate };
