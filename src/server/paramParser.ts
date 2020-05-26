// ----- Imports ----- //

import { isValidDate } from 'date';


// ----- Types ----- //

enum Param {
    None,
    Valid,
    Invalid,
}

type QueryParam<A> = {
    kind: Param.None;
} | {
    kind: Param.Invalid;
} | {
    kind: Param.Valid;
    value: A;
}


// ----- Functions ----- //

// Disabled because the point of this function is to convert the `any`
// provided by Express to a stricter type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseDate(param: any): QueryParam<Date> {
    if (param === undefined) {
        return { kind: Param.None };
    }
    const date = new Date(param);
    return isValidDate(date) ? { kind: Param.Valid, value: date } : { kind: Param.Invalid };
}


// ----- Exports ----- //

export {
    Param,
    parseDate,
};
