// ----- Types ----- //

type Person = {
    firstName: string;
    lastName: string;
}

// ----- Functions ----- //

const fullName = ({ firstName, lastName }: Person): string =>
    `${firstName} ${lastName}`

// ----- Exports ----- //

export type {
    Person,
};

export {
    fullName,
};
