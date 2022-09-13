import type { PermutivePayload } from '../lib/permutive';

export interface PermutiveModel {
	apiKey: string;
	projectId: string;
	payload: PermutivePayload;
}

export const Permutive = ({ apiKey, projectId, payload }: PermutiveModel) => {
	return null;
};
