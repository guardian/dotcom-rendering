import { setCookie } from '@guardian/libs';
import { jest } from '@jest/globals';

const mockGetCookie = jest.fn<typeof import('@guardian/libs').getCookie>();
jest.unstable_mockModule('@guardian/libs', () => ({
	setCookie,
	getCookie: mockGetCookie,
}));

const { getModalType } = await import('./EuropeLandingModal.importable');

describe('getModalType', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	it('should return "NoModal" if geoCountryCookie is not set', () => {
		mockGetCookie.mockReturnValue(null);
		expect(getModalType()).toEqual('NoModal');
	});

	it('should return "ModalSwitched" if editionCookie is INT and country is in COE', () => {
		mockGetCookie.mockImplementation((arg) => {
			if (arg.name === 'GU_EDITION') return 'INT';
			if (arg.name === 'GU_geo_country') return 'DE'; // Assuming 'DE' (Germany) is in COE
			return null;
		});
		expect(getModalType()).toEqual('ModalSwitched');
	});

	it('should return "ModalDoYouWantToSwitch" if editionCookie is INT, country is not in COE or UK/US/AUS', () => {
		mockGetCookie.mockImplementation((arg) => {
			if (arg.name === 'GU_EDITION') return 'INT';
			if (arg.name === 'GU_geo_country') return 'JP'; // Assuming 'JP' (Japan) is not in COE, UK, US, or AUS
			return null;
		});
		expect(getModalType()).toEqual('ModalDoYouWantToSwitch');
	});

	it('should return "ModalDoYouWantToSwitch" if editionCookie is UK/US/AUS and country is in COE', () => {
		mockGetCookie.mockImplementation((arg) => {
			if (arg.name === 'GU_EDITION') return 'UK';
			if (arg.name === 'GU_geo_country') return 'DE'; // Assuming 'DE' (Germany) is in COE
			return null;
		});
		expect(getModalType()).toEqual('ModalDoYouWantToSwitch');
	});

	it('should return "ModalSwitched" if editionCookie is not set and country is in COE', () => {
		mockGetCookie.mockImplementation((arg) => {
			if (arg.name === 'GU_EDITION') return null;
			if (arg.name === 'GU_geo_country') return 'DE'; // Assuming 'DE' (Germany) is in COE
			return null;
		});
		expect(getModalType()).toEqual('ModalSwitched');
	});

	it('should return "NoModal" for all other cases', () => {
		mockGetCookie.mockImplementation((arg) => {
			if (arg.name === 'GU_EDITION') return 'UK';
			if (arg.name === 'GU_geo_country') return 'US'; // Assuming 'US' is not in COE
			return null;
		});
		expect(getModalType()).toEqual('NoModal');
	});
});
