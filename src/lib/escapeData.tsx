/**
 * Create an escapedData string that can be safely placed inside script tags on the page
 *
 * The level of sanitisation here is limited to escaping script tags to prevent
 * errors when embedded html string contgain their own script tags.
 *
 * See: https://www.w3.org/TR/html52/semantics-scripting.html#restrictions-for-contents-of-script-elements
 *
 *  > The easiest and safest way to avoid the rather strange restrictions described in this section is to
 *  > always escape "&lt;!--" as "&lt;\!--", "&lt;script" as "&lt;\script", and "&lt;/script" as "&lt;\/script"
 *
 * TODO: This could be extended
 */

// See: https://stackoverflow.com/a/1144788
function escapeRegExp(str: string): string {
	return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
}

function replaceAll(str: string, find: string, replace: string): string {
	return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

export const escapeData = (data: string): string => {
	let escaped = data;
	escaped = replaceAll(escaped, '<!--', '<\\!--');
	escaped = replaceAll(escaped, '<script', '<\\script');
	escaped = replaceAll(escaped, '</script', '<\\/script');
	return escaped;
};

export const unescapeData = (data: string): string => {
	let unescaped = data;
	unescaped = replaceAll(unescaped, '<\\!--', '<!--');
	unescaped = replaceAll(unescaped, '<\\script', '<script');
	unescaped = replaceAll(unescaped, '<\\/script', '</script');
	return unescaped;
};
