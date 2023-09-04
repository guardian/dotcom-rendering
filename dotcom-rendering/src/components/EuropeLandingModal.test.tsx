import { getCookie } from '@guardian/libs';
import { getModalType } from './EuropeLandingModal.importable';

// Mocking the getCookie function
jest.mock('@guardian/libs', () => ({
	// Replace with the actual path to getCookie file
	getCookie: jest.fn(),
}));

const mockGetCookie = getCookie as jest.MockedFunction<typeof getCookie>;

describe('getModalType', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	it('should return "NoModal" if geoCountryCookie is not set', () => {
		mockGetCookie.mockReturnValue(null);
		expect(getModalType()).toEqual('NoModal');
	});

	it('should return "NoModal" if modalDismissedCookie is set', () => {
		mockGetCookie.mockReturnValueOnce('US').mockReturnValueOnce('true');
		expect(getModalType()).toEqual('NoModal');
	});

	it('should return "ModalSwitched" if editionCookie is INT and country is in COE', () => {
		mockGetCookie.mockReturnValueOnce('INT').mockReturnValueOnce('DE'); // Assuming 'DE' (Germany) is in COE
		expect(getModalType()).toEqual('ModalSwitched');
	});

	it('should return "ModalDoYouWantToSwitch" if editionCookie is INT, country is not in COE or UK/US/AUS', () => {
		mockGetCookie.mockReturnValueOnce('INT').mockReturnValueOnce('JP'); // Assuming 'JP' (Japan) is not in COE, UK, US, or AUS
		expect(getModalType()).toEqual('ModalDoYouWantToSwitch');
	});

	it('should return "ModalDoYouWantToSwitch" if editionCookie is UK/US/AUS and country is in COE', () => {
		mockGetCookie.mockReturnValueOnce('UK').mockReturnValueOnce('DE'); // Assuming 'DE' (Germany) is in COE
		expect(getModalType()).toEqual('ModalDoYouWantToSwitch');
	});

	it('should return "ModalNowSeeing" if editionCookie is not set and country is in COE', () => {
		mockGetCookie.mockReturnValueOnce(null).mockReturnValueOnce('DE'); // Assuming 'DE' (Germany) is in COE
		expect(getModalType()).toEqual('ModalNowSeeing');
	});

	it('should return "NoModal" for all other cases', () => {
		mockGetCookie.mockReturnValueOnce('UK').mockReturnValueOnce('US'); // Assuming 'US' is not in COE
		expect(getModalType()).toEqual('NoModal');
	});
});
