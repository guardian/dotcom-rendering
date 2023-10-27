import { refresh } from './user-features';

export const userFeatures = async (): Promise<void> => {
	await refresh(); // come to Promise structure
};
