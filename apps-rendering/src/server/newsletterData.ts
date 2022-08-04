import { Newsletter } from 'item';

//TO DO - fetch the data from the newsletters API
const data: Record<string, Newsletter | undefined> = {
	'pushing-buttons': {
		id: 'pushing-buttons',
		displayName: 'Pushing Buttons',
		frequency: 'weekly',
	},
};

export const getNewsletterData = async (
	id: string,
): Promise<Newsletter | undefined> => {
	return data[id];
};
