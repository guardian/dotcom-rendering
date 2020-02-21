import flow from 'lodash.flow';

export const formatAttrString = (input: string) => {
    // Remove all non alphaNumeric
    // Lowercase all
    // Replace Spaces with Hyphens

    type strInOutFunc = (str: string) => string;

    const removeAlphaNumeric: strInOutFunc = str =>
        str.replace(new RegExp('[^0-9a-z ]', 'gi'), ';'); // We set it to semicolon so we can remove it at the end
    const lowercase: strInOutFunc = str => str.toLowerCase();
    const replaceSpacesWithHyphens: strInOutFunc = str =>
        str.replace(new RegExp(' ', 'g'), '-'); // Replace the space
    const removeTempChars: strInOutFunc = str =>
        str.replace(new RegExp('[;]', 'g'), ''); // Strip out those semicolons

    // https://lodash.com/docs/4.17.15#flow
    // Function composite
    const output = flow([
        removeAlphaNumeric,
        lowercase,
        replaceSpacesWithHyphens,
        removeTempChars,
    ]);

    return output(input);
};
