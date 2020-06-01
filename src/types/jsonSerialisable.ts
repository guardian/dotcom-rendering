// ----- Type ----- //

type JsonSerialisable
    = string
    | boolean
    | number
    | null
    | undefined
    | Date
    | JsonSerialisable[]
    | { [k: string]: JsonSerialisable }
    ;


// ----- Exports ----- //

export default JsonSerialisable;
