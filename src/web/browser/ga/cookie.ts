const ERR_INVALID_COOKIE_NAME = `Cookie must not contain invalid characters (space, tab and the following characters: '()<>@,;"/[]?={}')`;

// subset of https://github.com/guzzle/guzzle/pull/1131
const isValidCookieValue = (name: string): boolean =>
	!/[()<>@,;"\\/[\]?={} \t]/g.test(name);

const getShortDomain = (isCrossSubdomain = false): string => {
	const domain = document.domain || '';
	// Trim any possible subdomain (will be shared with supporter, identity, etc)
	if (isCrossSubdomain) {
		return ['', ...domain.split('.').slice(-2)].join('.');
	}
	// Trim subdomains for prod (www.theguardian), code (m.code.dev-theguardian) and dev (dev.theguardian, m.thegulocal)
	return domain.replace(/^(www|m\.code|dev|m)\./, '.');
};

const getDomainAttribute = (isCrossSubdomain = false): string => {
	const shortDomain = getShortDomain(isCrossSubdomain);
	return shortDomain === 'localhost' ? '' : ` domain=${shortDomain};`;
};

export const removeCookie = (
	name: string,
	currentDomainOnly: boolean = false,
): void => {
	const expires = 'expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	const path = 'path=/;';

	// Remove cookie, implicitly using the document's domain.
	document.cookie = `${name}=;${path}${expires}`;
	if (!currentDomainOnly) {
		// also remove from the short domain
		document.cookie = `${name}=;${path}${expires} domain=${getShortDomain()};`;
	}
};

export const addCookie = (
	name: string,
	value: string,
	daysToLive?: number,
	isCrossSubdomain: boolean = false,
): void => {
	const expires = new Date();

	if (!isValidCookieValue(name) || !isValidCookieValue(value)) {
		throw new Error(`${ERR_INVALID_COOKIE_NAME} .${name}=${value}`);
	}

	if (daysToLive) {
		expires.setDate(expires.getDate() + daysToLive);
	} else {
		expires.setMonth(expires.getMonth() + 5);
		expires.setDate(1);
	}

	document.cookie = `${name}=${value}; path=/; expires=${expires.toUTCString()};${getDomainAttribute(
		isCrossSubdomain,
	)}`;
};

export const cleanUp = (names: string[]): void => {
	names.forEach((name) => {
		removeCookie(name);
	});
};

export const addForMinutes = (
	name: string,
	value: string,
	minutesToLive: number,
): void => {
	const expires = new Date();

	if (!isValidCookieValue(name) || !isValidCookieValue(value)) {
		throw new Error(`${ERR_INVALID_COOKIE_NAME} .${name}=${value}`);
	}

	expires.setMinutes(expires.getMinutes() + minutesToLive);
	document.cookie = `${name}=${value}; path=/; expires=${expires.toUTCString()};${getDomainAttribute()}`;
};

export const addSessionCookie = (name: string, value: string): void => {
	if (!isValidCookieValue(name) || !isValidCookieValue(value)) {
		throw new Error(`${ERR_INVALID_COOKIE_NAME} .${name}=${value}`);
	}
	document.cookie = `${name}=${value}; path=/;${getDomainAttribute()}`;
};

const getCookieValues = (name: string): string[] => {
	const nameEq = `${name}=`;
	const cookies = document.cookie.split(';');

	return cookies.reduce<string[]>((acc, cookie) => {
		const cookieTrimmed = cookie.trim();

		if (cookieTrimmed.startsWith(nameEq)) {
			acc.push(
				cookieTrimmed.substring(nameEq.length, cookieTrimmed.length),
			);
		}

		return acc;
	}, []);
};

export const getCookie = (name: string): string | null => {
	const cookieVal = getCookieValues(name);

	if (cookieVal.length > 0) {
		return cookieVal[0];
	}
	return null;
};
