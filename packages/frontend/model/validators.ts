import get from 'lodash.get';

export const getString = (
    obj: object,
    selector: string,
    fallbackValue?: string,
): string => {
    const found = get(obj, selector);
    if (typeof found === 'string') {
        return found;
    }
    if (fallbackValue !== undefined) {
        return fallbackValue;
    }

    throw new Error(
        `expected string at '${selector}', got '${found}', in '${JSON.stringify(
            obj,
        )}'`,
    );
};

export const getNumber = (
    obj: object,
    selector: string,
    fallbackValue?: number,
): number => {
    const found = get(obj, selector);
    if (typeof found === 'number') {
        return found;
    }

    if (fallbackValue !== undefined) {
        return fallbackValue;
    }

    throw new Error(
        `expected number at '${selector}', got '${found}', in '${JSON.stringify(
            obj,
        )}'`,
    );
};

export const getNonEmptyString = (obj: object, selector: string): string => {
    const found = get(obj, selector);
    if (typeof found === 'string' && found.length > 0) {
        return found;
    }

    throw new Error(
        `expected non-empty string at '${selector}', got '${found}', in '${JSON.stringify(
            obj,
        )}'`,
    );
};

export const getBoolean = (
    obj: object,
    selector: string,
    fallbackValue?: boolean,
): boolean => {
    const found = get(obj, selector);

    if (typeof found === 'boolean') {
        return found;
    }

    if (fallbackValue !== undefined) {
        return fallbackValue;
    }

    throw new Error(
        `expected boolean  at '${selector}', got '${found}', in '${JSON.stringify(
            obj,
        )}'`,
    );
};

export const getArray = <T>(
    obj: object,
    selector: string,
    fallbackValue?: T[],
): T[] => {
    const found = get(obj, selector);

    if (Array.isArray(found)) {
        return found;
    }
    if (fallbackValue !== undefined) {
        return fallbackValue;
    }

    throw new Error(
        `expected array at '${selector}', got '${found}', in '${JSON.stringify(
            obj,
        )}'`,
    );
};

export const getObject = (
    obj: object,
    selector: string,
    fallbackValue?: {},
): any => {
    const found = get(obj, selector);

    if (typeof found === 'object' && found !== null) {
        return found;
    }
    if (fallbackValue !== undefined) {
        return fallbackValue;
    }

    throw new Error(
        `expected object at '${selector}', got '${found}', in '${JSON.stringify(
            obj,
        )}'`,
    );
};
