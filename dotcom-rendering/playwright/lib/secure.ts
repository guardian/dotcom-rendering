import { ORIGIN_SECURE } from '../../playwright.config';

const isSecureServerAvailable = async (): Promise<boolean> => {
	try {
		const response = await fetch(ORIGIN_SECURE, {
			method: 'HEAD',
		});
		return response.status === 200;
	} catch (error) {
		// eslint-disable-next-line no-console -- test code
		console.error('Error in isSecureServerAvailable:', error);
		return false;
	}
};

export { isSecureServerAvailable };
