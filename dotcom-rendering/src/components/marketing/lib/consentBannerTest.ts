import { getCookie } from '@guardian/libs';

const AB_TEST_GEO_REGION_COOKIE = 'GU_geo_country_region';
const AB_TEST_US_STATES = [
	'WA', // Washington
	'NC', // North Carolina
	'OH', // Ohio
	'SC', // South Carolina
	'MI', // Michigan
	'AZ', // Arizona
	'MO', // Missouri
	'WI', // Wisconsin
	'DC', // District of Columbia
	'KS', // Kansas
	'NM', // New Mexico
	'ME', // Maine
];

export const isInUsStateForAbTest = (): boolean => {
	const usStateCookie = getCookie({
		name: AB_TEST_GEO_REGION_COOKIE,
	});

	if (usStateCookie?.split('-')[0] !== 'US') {
		return false;
	}

	const usState = usStateCookie.split('-')[1] ?? '';
	return AB_TEST_US_STATES.includes(usState);
};
